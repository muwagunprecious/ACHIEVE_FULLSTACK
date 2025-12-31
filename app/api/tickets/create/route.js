import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const { fullName, email, phone, ticketType, reference } = await req.json();

        if (!reference || !email || !ticketType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Idempotency Check: Check if ticket with this reference already exists
        const existingTicket = await prisma.eventTicket.findFirst({
            where: { reference }
        });

        if (existingTicket) {
            console.log(`Return existing ticket for reference: ${reference}`);
            return NextResponse.json(existingTicket);
        }

        // 2. Verify Payment with Paystack
        const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
        const paystackResponse = await fetch(verifyUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!paystackResponse.ok) {
            console.error('Paystack verification failed:', await paystackResponse.text());
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
            );
        }

        const paystackData = await paystackResponse.json();

        if (paystackData.data.status !== 'success') {
            return NextResponse.json(
                { error: `Payment status is ${paystackData.data.status}` },
                { status: 400 }
            );
        }

        // 3. Get Ticket Category to confirm price/validity
        const category = await prisma.ticketCategory.findFirst({
            where: { name: ticketType }
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Invalid ticket category' },
                { status: 400 }
            );
        }

        // 4. Generate Ticket ID
        const generateTicketId = () => {
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `AS2026-${randomPart}`;
        };

        let ticketId = generateTicketId();
        let isUnique = false;
        let retries = 0;

        // Simple uniqueness check retry loop
        while (!isUnique && retries < 5) {
            const check = await prisma.eventTicket.findUnique({ where: { ticketId } });
            if (!check) isUnique = true;
            else {
                ticketId = generateTicketId();
                retries++;
            }
        }

        if (!isUnique) {
            return NextResponse.json(
                { error: 'Failed to generate unique ticket ID' },
                { status: 500 }
            );
        }

        // 5. Create Ticket
        const newTicket = await prisma.eventTicket.create({
            data: {
                fullName,
                email,
                phone: phone || '',
                ticketType: category.name,
                ticketPrice: String(category.price),
                ticketId,
                reference,
                status: 'VALID',
                purchaseDate: new Date(paystackData.data.paid_at || new Date()),
            },
        });

        return NextResponse.json(newTicket, { status: 201 });

    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

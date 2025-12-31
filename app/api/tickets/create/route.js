import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateTicketPDF } from '@/lib/pdf-service';
import { sendTicketEmail } from '@/lib/email-service';

export async function POST(req) {
    try {
        const { fullName, email, phone, ticketType } = await req.json();

        if (!fullName || !email || !ticketType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Get Ticket Category to confirm price/validity
        const category = await prisma.ticketCategory.findFirst({
            where: { name: ticketType }
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Invalid ticket category' },
                { status: 400 }
            );
        }

        // 2. Generate Unique Ticket ID
        const generateTicketId = () => {
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `AS2026-${randomPart}`;
        };

        let ticketId = generateTicketId();
        let isUnique = false;
        let retries = 0;

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

        // 3. Create Ticket Record in DB
        const newTicket = await prisma.eventTicket.create({
            data: {
                fullName,
                email,
                phone: phone || '',
                ticketType: category.name,
                ticketPrice: String(category.price),
                ticketId,
                reference: `INSTANT-${ticketId}`, // Marking as instant for clarity
                status: 'VALID',
                purchaseDate: new Date(),
            },
        });

        // 4. Generate PDF
        console.log('Generating PDF for:', ticketId);
        const pdfBuffer = await generateTicketPDF({
            fullName,
            ticketType: category.name,
            ticketId
        });

        // 5. Send Email
        console.log('Sending email to:', email);
        try {
            await sendTicketEmail({
                email,
                fullName,
                ticketType: category.name,
                ticketId,
                pdfBuffer
            });
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Email delivery failed:', emailError);
            // We return success for ticket generation but mention email failure if needed, 
            // or just follow user instruction for "Email Delivery Failure" popup handling.
            // For the API, we'll return a specific flag if email failed.
            return NextResponse.json({
                ...newTicket,
                emailSent: false,
                error: 'Email delivery failed'
            }, { status: 201 });
        }

        return NextResponse.json({
            ...newTicket,
            emailSent: true,
            pdfBase64: pdfBuffer.toString('base64')
        }, { status: 201 });

    } catch (error) {
        console.error('Error in instant ticket issuance:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

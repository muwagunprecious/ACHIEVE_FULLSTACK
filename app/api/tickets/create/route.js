import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { crypto } from "crypto";

export async function POST(req) {
    try {
        const body = await req.json();
        const { fullName, email, phone, ticketType, ticketPrice, ticketId, reference } = body;

        // 1. Find the TicketCategory
        const category = await prisma.ticketCategory.findFirst({
            where: { name: ticketType }
        });

        if (!category) {
            return NextResponse.json({ error: "Invalid ticket category" }, { status: 400 });
        }

        if (!category.isEnabled || category.status !== 'ACTIVE') {
            return NextResponse.json({ error: "This ticket category is currently closed" }, { status: 400 });
        }

        if (category.sold >= category.capacity) {
            return NextResponse.json({ error: "This ticket category is sold out" }, { status: 400 });
        }

        // 2. Create or find User
        const user = await prisma.user.upsert({
            where: { email },
            update: { name: fullName, phone, updatedAt: new Date() },
            create: {
                id: `USR-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                name: fullName,
                email,
                phone,
                updatedAt: new Date()
            }
        });

        // 3. Create Ticket and Increment Sold Count (Transaction)
        const [newTicket, updatedCategory, eventTicket] = await prisma.$transaction([
            // Create main Ticket record
            prisma.ticket.create({
                data: {
                    id: `TKT-${ticketId}`,
                    ticketNumber: ticketId,
                    userId: user.id,
                    ticketCategoryId: category.id,
                    status: "VALID",
                    updatedAt: new Date()
                }
            }),
            // Increment sold count
            prisma.ticketCategory.update({
                where: { id: category.id },
                data: { sold: { increment: 1 } }
            }),
            // Keep EventTicket for backward compatibility if UI components depend on it
            prisma.eventTicket.create({
                data: {
                    id: `EVT-${ticketId}`,
                    ticketId,
                    fullName,
                    email,
                    phone,
                    ticketType,
                    ticketPrice: ticketPrice.toString(),
                    reference: typeof reference === 'object' ? JSON.stringify(reference) : reference,
                    status: "VALID",
                    updatedAt: new Date()
                }
            })
        ]);

        return NextResponse.json(newTicket, { status: 201 });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return NextResponse.json(
            { error: "Failed to create ticket: " + error.message },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        // Safety check for Next.js 15+ params handling
        // However, the user is on Next 16.1.1, so params is a Promise.
        // But let's check standard usage. Usually it is safe to await params or access directly if not using async params config.
        // Given the error logs earlier didn't show param issues, we'll assume standard access or await if needed.
        // Wait, let's look at standard next.js 14/15 route handlers. 
        // `export async function GET(request, { params })`

        // 1. Try finding in EventTicket (legacy/flat structure)
        let ticket = await prisma.eventTicket.findUnique({
            where: { ticketId: id },
        });

        // 2. Fallback: Try finding in Ticket (normalized structure)
        if (!ticket) {
            console.log(`Searching Ticket table for ${id}...`);
            const normalizedTicket = await prisma.ticket.findUnique({
                where: { ticketNumber: id },
                include: {
                    user: true,
                    category: true
                }
            });

            if (normalizedTicket) {
                // Flatten to match EventTicket shape expected by frontend
                ticket = {
                    ticketId: normalizedTicket.ticketNumber,
                    fullName: normalizedTicket.user.name,
                    email: normalizedTicket.user.email,
                    phone: normalizedTicket.user.phone || '',
                    ticketType: normalizedTicket.category.name,
                    ticketPrice: normalizedTicket.category.price.toString(),
                    reference: "INTERNAL",
                    status: normalizedTicket.status,
                    createdAt: normalizedTicket.createdAt
                };
            }
        }

        if (!ticket) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
        }

        return NextResponse.json(ticket);
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return NextResponse.json(
            { error: "Failed to fetch ticket" },
            { status: 500 }
        );
    }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { ticketId } = await req.json();

        const ticket = await prisma.eventTicket.findUnique({
            where: { ticketId },
        });

        if (!ticket) {
            return NextResponse.json({ status: "INVALID", message: "Ticket not found" }, { status: 404 });
        }

        if (ticket.status === "USED") {
            return NextResponse.json({
                status: "USED",
                ticket,
                message: "Ticket already used"
            });
        }

        // Update status to USED
        const updatedTicket = await prisma.eventTicket.update({
            where: { ticketId },
            data: { status: "USED" },
        });

        return NextResponse.json({
            status: "VALID",
            ticket: updatedTicket,
            message: "Ticket valid and checked in"
        });

    } catch (error) {
        console.error("Error validating ticket:", error);
        return NextResponse.json(
            { error: "Validation failed" },
            { status: 500 }
        );
    }
}

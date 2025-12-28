import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { bookingId, orgName, contactName, email, phone, standType, notes } = body;

        const booking = await prisma.standBooking.create({
            data: {
                bookingId,
                orgName,
                contactName,
                email,
                phone,
                standType,
                notes,
                status: "Pending"
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}

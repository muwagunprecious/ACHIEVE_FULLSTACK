import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Workaround for Prisma Client generate failure: use Raw SQL
        const speakers = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Speaker" ORDER BY "createdAt" DESC`
        );
        return NextResponse.json(speakers);
    } catch (error) {
        console.error("Failed to fetch speakers (Raw SQL):", error);
        return NextResponse.json({ error: "Failed to fetch speakers" }, { status: 500 });
    }
}

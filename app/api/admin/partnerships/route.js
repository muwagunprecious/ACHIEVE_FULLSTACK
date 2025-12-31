import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
    try {
        const partnerships = await prisma.partnership.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ partnerships });

    } catch (error) {
        console.error('Error fetching partnerships:', error);
        return NextResponse.json(
            { error: 'Failed to fetch partnerships' },
            { status: 500 }
        );
    }
}

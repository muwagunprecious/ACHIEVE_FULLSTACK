import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.ticketCategory.findMany({
            orderBy: {
                price: 'asc'
            },
            include: {
                _count: {
                    select: { tickets: true }
                }
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Failed to fetch ticket categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req, { params }) {
    try {
        const { id } = params;
        const { status } = await req.json();

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const partnership = await prisma.partnership.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json({ success: true, partnership });

    } catch (error) {
        console.error('Error updating partnership status:', error);
        return NextResponse.json(
            { error: 'Failed to update partnership' },
            { status: 500 }
        );
    }
}

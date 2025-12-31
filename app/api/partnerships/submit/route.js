import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const { companyName, contactPerson, email, phone, partnershipType, message } = await req.json();

        // Validation
        if (!companyName || !contactPerson || !email || !phone || !partnershipType || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create partnership submission
        const partnership = await prisma.partnership.create({
            data: {
                companyName,
                contactPerson,
                email,
                phone,
                partnershipType,
                message,
                status: 'Pending'
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Partnership request submitted successfully',
                id: partnership.id
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('PARTNERSHIP_SUBMISSION_ERROR:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to submit partnership request' },
            { status: 500 }
        );
    }
}

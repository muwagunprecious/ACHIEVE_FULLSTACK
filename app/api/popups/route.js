import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch active popups/announcements
export async function GET() {
    try {
        const activePopups = await prisma.popup.findMany({
            where: {
                isEnabled: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ popups: activePopups });
    } catch (error) {
        console.error('Error fetching popups:', error);
        return NextResponse.json(
            { error: 'Failed to fetch announcements' },
            { status: 500 }
        );
    }
}

// POST - Create new announcement/popup (Admin only)
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, body: content, ctaText, ctaLink, targetPage, duration } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        const popup = await prisma.popup.create({
            data: {
                title,
                body: content,
                ctaText: ctaText || null,
                ctaLink: ctaLink || null,
                targetPage: targetPage || 'all',
                duration: duration || 5000,
                isEnabled: true
            }
        });

        return NextResponse.json({ success: true, popup });
    } catch (error) {
        console.error('Error creating popup:', error);
        return NextResponse.json(
            { error: 'Failed to create announcement' },
            { status: 500 }
        );
    }
}

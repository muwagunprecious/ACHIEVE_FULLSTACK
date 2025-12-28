import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VotingInterface from '@/components/VotingInterface';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getApprovedNominees() {
    try {
        const nominees = await prisma.nominee.findMany({
            where: { isVisible: true },
            orderBy: { name: 'asc' }
        });
        return nominees;
    } catch (error) {
        console.error("Failed to fetch nominees:", error);
        return [];
    }
}

export default async function VotingPage() {
    const nominees = await getApprovedNominees();

    const categories = [
        "Tech Innovator",
        "Business Leader",
        "Creative Arts",
        "Social Impact",
        "Young Achiever (Under 30)",
        "Lifetime Achievement Award"
    ];

    return (
        <main className="min-h-screen bg-bg-deep relative">
            <Navbar />

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
                <div className="motif-bg opacity-5 absolute inset-0"></div>
            </div>

            <VotingInterface categories={categories} initialNominees={nominees} />

            <Footer />
        </main>
    );
}

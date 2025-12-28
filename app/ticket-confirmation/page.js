"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TicketResult from '@/components/TicketResult';

function TicketConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const ticketId = searchParams.get('id');

    useEffect(() => {
        if (!ticketId) {
            router.push('/');
            return;
        }

        const fetchTicket = async () => {
            try {
                const { default: api } = await import('@/lib/api');
                const data = await api.getTicket(ticketId);
                setTicket(data);
            } catch (error) {
                console.error("Error fetching ticket:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId, router]);

    const handleBack = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-copper border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white gap-4">
                <p>Ticket not found.</p>
                <button onClick={handleBack} className="text-primary-copper underline">Return Home</button>
            </div>
        );
    }

    return <TicketResult ticketData={ticket} onBack={handleBack} />;
}

export default function TicketConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]"></div>}>
            <TicketConfirmationContent />
        </Suspense>
    );
}

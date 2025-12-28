import React from 'react';
import Link from 'next/link';
import { Search, Filter, Ticket, User, Mail, Smartphone, QrCode, Power, Eye, EyeOff } from 'lucide-react';
import prisma from '@/lib/prisma';
import TicketCategoryList from '@/components/TicketCategoryList';

export const dynamic = 'force-dynamic';

async function getTicketData() {
    try {
        const [categories, tickets] = await Promise.all([
            prisma.ticketCategory.findMany({
                orderBy: { price: 'asc' },
                include: { _count: { select: { tickets: true } } }
            }),
            prisma.ticket.findMany({
                take: 50,
                orderBy: { purchaseDate: 'desc' },
                include: { user: true, category: true }
            })
        ]);
        return { categories, tickets };
    } catch (error) {
        console.error("Failed to fetch ticket data:", error);
        return { categories: [], tickets: [] };
    }
}

export default async function TicketManagementPage() {
    const { categories, tickets } = await getTicketData();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">TICKET <span className="text-gradient NOT-italic">MANAGEMENT</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Control visibility and monitor sales.</p>
                </div>
                <Link href="/admin/scan" className="btn btn-primary flex items-center gap-2 group">
                    <QrCode size={18} className="group-hover:scale-110 transition-transform" />
                    <span>SCAN QR CODES</span>
                </Link>
            </div>

            {/* Category Management */}
            <TicketCategoryList categories={categories} />

            {/* Sold Tickets List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    {/* Simplified for brevity - Search/Filter would utilize URL search params in a real server component */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search attendees..."
                            className="w-full h-10 bg-white/5 rounded-lg pl-4 pr-4 outline-none text-white text-sm focus:border-primary-copper/30 border border-transparent transition-all"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Ticket #</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Attendee</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? tickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-primary-copper font-bold text-xs">{ticket.ticketNumber}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-white text-sm">{ticket.user?.name || 'Unknown User'}</div>
                                        <div className="text-[10px] text-text-muted">{ticket.user?.email || 'N/A'}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-white">
                                            {ticket.category?.name || 'Standard'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs text-text-muted">
                                        {new Date(ticket.purchaseDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${ticket.status === 'VALID' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-text-muted text-sm">No tickets found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

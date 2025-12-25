"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Ticket, User, Mail, Smartphone, QrCode } from 'lucide-react';

export default function TicketManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');

    // Mock Data
    const tickets = [
        { id: "TK-8892", name: "Alice Freeman", email: "alice@example.com", phone: "+1234567890", type: "VIP", status: "VALID", purchaseDate: "2025-10-12" },
        { id: "TK-7721", name: "Bob Smith", email: "bob@example.com", phone: "+1987654321", type: "REGULAR", status: "USED", purchaseDate: "2025-10-14" },
        { id: "TK-9932", name: "Charlie Davis", email: "charlie@example.com", phone: "+1122334455", type: "ECONOMY", status: "VALID", purchaseDate: "2025-10-15" },
        { id: "TK-1123", name: "Diana Prince", email: "diana@example.com", phone: "+1555666777", type: "VIP", status: "REFUNDED", purchaseDate: "2025-10-10" },
    ];

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || ticket.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">TICKET <span className="text-gradient NOT-italic">MANAGEMENT</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Monitor ticket sales and attendee status.</p>
                </div>
                <Link href="/admin/scan" className="btn btn-primary flex items-center gap-2 group">
                    <QrCode size={18} className="group-hover:scale-110 transition-transform" />
                    <span>SCAN QR CODES</span>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="w-full h-12 bg-white/5 rounded-xl pl-12 pr-4 outline-none text-white focus:bg-white/10 transition-colors border border-transparent focus:border-primary-copper/30"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-text-muted" />
                    <select
                        className="h-12 bg-white/5 rounded-xl px-4 outline-none text-white focus:bg-white/10 transition-colors border border-transparent focus:border-primary-copper/30 cursor-pointer"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="ALL">All Types</option>
                        <option value="VIP">VIP</option>
                        <option value="REGULAR">Regular</option>
                        <option value="ECONOMY">Economy</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Ticket ID</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Attendee</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Purchase Date</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-primary-copper font-bold">{ticket.id}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-white">{ticket.name}</div>
                                        <div className="text-[10px] text-text-muted flex items-center gap-2 mt-1">
                                            <Mail size={10} /> {ticket.email}
                                        </div>
                                        <div className="text-[10px] text-text-muted flex items-center gap-2 mt-0.5">
                                            <Smartphone size={10} /> {ticket.phone}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-white/5 text-white border border-white/10`}>
                                            {ticket.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-text-muted">{ticket.purchaseDate}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${ticket.status === 'VALID' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                ticket.status === 'USED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[10px] font-bold text-primary-copper hover:underline uppercase tracking-wider">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

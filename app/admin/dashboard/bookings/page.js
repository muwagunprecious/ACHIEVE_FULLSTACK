"use client";
import React, { useState, useEffect } from 'react';
import { Search, Building2, User, Calendar, MessageSquare, CheckCircle2, Clock, MoreHorizontal } from 'lucide-react';

export default function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('achievers_bookings');
        if (stored) {
            setBookings(JSON.parse(stored));
        }
    }, []);

    const updateStatus = (id, newStatus) => {
        const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
        setBookings(updated);
        localStorage.setItem('achievers_bookings', JSON.stringify(updated));
    };

    const filteredBookings = bookings.filter(b =>
        b.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default: return 'bg-white/5 text-text-muted border-white/5';
        }
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div>
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">EXHIBITOR <span className="text-gradient NOT-italic">RELATIONS</span></h1>
                <p className="text-text-muted text-sm font-bold uppercase tracking-[0.3em]">Manage B2B stand bookings and organizational visibility.</p>
            </div>

            {/* Controls */}
            <div className="relative group max-w-2xl">
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors" />
                <input
                    type="text"
                    placeholder="SEARCH ORGANIZATIONS..."
                    className="w-full h-16 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white font-bold tracking-widest transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                    <div key={booking.id} className="glass-panel p-8 rounded-[40px] border border-white/5 hover:border-primary-copper/30 transition-all duration-500 flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex items-center gap-6 flex-grow min-w-0 w-full lg:w-auto">
                            <div className="w-16 h-16 rounded-[20px] bg-primary-copper flex items-center justify-center text-white shadow-lg shadow-primary-copper/20 flex-shrink-0">
                                <Building2 size={28} />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter truncate">{booking.orgName}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">
                                    <User size={12} className="text-primary-copper" />
                                    <span>{booking.contactName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-shrink-0 w-full lg:w-auto">
                            <div>
                                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1.5">Stand Type</p>
                                <span className="text-[11px] font-black text-white uppercase tracking-tighter">{booking.standType}</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1.5">Submitted</p>
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Clock size={12} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{booking.submissionDate}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1.5">Current Phase</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusStyle(booking.status)}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'Approved' ? 'bg-green-500' : booking.status === 'Contacted' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{booking.status}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="relative group/menu">
                                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:text-white transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-midnight-obsidian border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all z-50 p-2 space-y-1">
                                        <button onClick={() => updateStatus(booking.id, 'Pending')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-yellow-500">Mark Pending</button>
                                        <button onClick={() => updateStatus(booking.id, 'Contacted')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-blue-400">Mark Contacted</button>
                                        <button onClick={() => updateStatus(booking.id, 'Approved')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-green-400">Mark Approved</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="glass-panel p-20 rounded-[40px] border border-white/5 text-center opacity-50">
                        <Building2 size={48} className="mx-auto mb-6 text-text-muted" />
                        <p className="text-sm font-bold text-text-muted uppercase tracking-[0.4em]">NO EXHIBITION REQUESTS IN PROTOCOL.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                }
            `}</style>
        </div>
    );
}

"use client";
import React, { useState, useEffect } from 'react';
import { Search, Building2, User, Calendar, MessageSquare, CheckCircle2, Clock, MoreHorizontal, XCircle } from 'lucide-react';

export default function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data || []);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while updating status');
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default: return 'bg-white/5 text-text-muted border-white/5';
        }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-copper"></div>
            </div>
        );
    }

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
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                        <User size={12} className="text-primary-copper" />
                                        <span>{booking.contactName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted/60 lowercase tracking-widest">
                                        <span>{booking.email}</span>
                                    </div>
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
                                    <span className="text-[11px] font-black uppercase tracking-widest">
                                        {new Date(booking.submissionDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1.5">Current Phase</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusStyle(booking.status)}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'Approved' ? 'bg-green-500' :
                                            booking.status === 'Contacted' ? 'bg-blue-500' :
                                                booking.status === 'Rejected' ? 'bg-red-500' :
                                                    'bg-yellow-500'
                                        }`}></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{booking.status}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="relative group/menu">
                                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:text-white transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-midnight-black border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all z-50 p-2 space-y-1">
                                        <button onClick={() => updateStatus(booking.id, 'Pending')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-yellow-500">Mark Pending</button>
                                        <button onClick={() => updateStatus(booking.id, 'Contacted')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-blue-400">Mark Contacted</button>
                                        <button onClick={() => updateStatus(booking.id, 'Approved')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-green-400">Mark Approved</button>
                                        <button onClick={() => updateStatus(booking.id, 'Rejected')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-red-400">Mark Rejected</button>
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
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
    );
}

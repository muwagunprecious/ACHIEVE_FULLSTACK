"use client";
import React, { useState } from 'react';
import { X, ShieldCheck, User, Mail, Phone, Lock, Asterisk } from 'lucide-react';

export default function CheckoutModal({ ticket, onClose, onComplete }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API processing
        setTimeout(() => {
            const ticketId = 'AS2026-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            const ticketData = {
                ...formData,
                ticketType: ticket.name,
                ticketPrice: ticket.price,
                ticketId: ticketId,
                purchaseDate: new Date().toLocaleDateString(),
            };

            const existingTickets = JSON.parse(localStorage.getItem('achievers_tickets') || '[]');
            existingTickets.push(ticketData);
            localStorage.setItem('achievers_tickets', JSON.stringify(existingTickets));

            onComplete(ticketData);
        }, 2000);
    };

    if (!ticket) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Ultra-Blur Backdrop */}
            <div className="absolute inset-0 bg-midnight-black/95 backdrop-blur-[120px]" onClick={onClose}></div>

            {/* Modal Surface */}
            <div
                className="relative bg-midnight-obsidian w-full max-w-md mx-auto rounded-[32px] shadow-[0_0_120px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col animate-fade-in overflow-hidden"
                style={{ maxHeight: '85vh' }}
            >
                {/* Scrollable container for the entire content */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">

                    {/* Compact Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-primary-copper uppercase tracking-[0.4em] mb-1">Passage Verification</p>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">SECURE AUTH</h3>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-primary-copper/10 rounded-xl border border-primary-copper/20 mb-6">
                        <ShieldCheck className="text-primary-copper" size={16} />
                        <span className="text-[8px] font-black text-primary-copper uppercase tracking-[0.4em]">ENCRYPTED SECURITY PROTOCOL ACTIVE</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Input Section - Bigger and more designed */}
                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex justify-between items-end mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">DELEGATE FULL NAME</span>
                                    <User size={12} className="text-text-muted group-focus-within:text-primary-copper transition-all" />
                                </div>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-12 px-6 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-bold text-white placeholder:text-text-muted/10 text-[11px] uppercase tracking-widest shadow-inner"
                                    placeholder="ENTER FULL NAME"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-end mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">EXECUTIVE EMAIL</span>
                                    <Mail size={12} className="text-text-muted group-focus-within:text-primary-copper transition-all" />
                                </div>
                                <input
                                    required
                                    type="email"
                                    className="w-full h-12 px-6 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-bold text-white placeholder:text-text-muted/10 text-[11px] uppercase tracking-widest shadow-inner"
                                    placeholder="CEO@ORGANIZATION.COM"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-end mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">GLOBAL CONTACT</span>
                                    <Phone size={12} className="text-text-muted group-focus-within:text-primary-copper transition-all" />
                                </div>
                                <input
                                    required
                                    type="tel"
                                    className="w-full h-12 px-6 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-bold text-white placeholder:text-text-muted/10 text-[11px] uppercase tracking-widest shadow-inner"
                                    placeholder="+234 ..."
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Button Section - Smaller and refined */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full h-14 text-[11px] uppercase tracking-[0.6em] disabled:opacity-50 !p-0 shadow-lg shadow-primary-copper/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {isSubmitting ? 'AUTHENTICATING...' : 'CONFIRM ACCESS'}
                            </button>

                            <div className="mt-4 flex flex-col items-center gap-2 opacity-30">
                                <div className="flex items-center gap-2">
                                    <Lock size={10} />
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">SECURE GATEWAY</span>
                                </div>
                                <p className="text-[8px] text-center text-text-muted font-black uppercase tracking-[0.3em]">
                                    INVESTMENT: {ticket.price} • {ticket.name}
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                .text-primary-copper { color: var(--primary-copper); }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

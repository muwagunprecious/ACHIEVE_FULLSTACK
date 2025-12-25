"use client";
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Home, Share2, ShieldCheck, MapPin, Calendar, Fingerprint } from 'lucide-react';

export default function TicketResult({ ticketData, onBack }) {
    if (!ticketData) return null;

    const handleDownload = () => {
        alert('Digital Pass Encrypted & Downloaded successfully!');
    };

    return (
        <div className="section bg-midnight-black min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-copper/5 rounded-full blur-[180px]"></div>
                <div className="absolute inset-0 motif-bg opacity-5"></div>
            </div>

            <div className="text-center mb-20 animate-fade-in relative z-10">
                <div className="w-20 h-20 glass-panel flex items-center justify-center text-primary-copper mx-auto mb-8 shadow-2xl border border-white/10 animate-float">
                    <ShieldCheck size={40} strokeWidth={2} />
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 italic tracking-tighter">Pass <span className="text-gradient NOT-italic">Authenticated.</span></h2>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/5">
                    <Fingerprint size={14} className="text-primary-copper" />
                    <span className="text-primary-copper font-black uppercase tracking-[0.4em] text-[10px]">Official Digital Asset</span>
                </div>
            </div>

            <div className="ticket-card relative z-10 w-full max-w-2xl animate-fade-in">
                {/* Main Ticket Surface */}
                <div className="relative bg-midnight-obsidian rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col border border-white/5">

                    {/* Top Panel */}
                    <div className="bg-midnight-purple p-12 text-white relative overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 motif-bg opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-primary-copper rounded-2xl flex items-center justify-center font-black italic text-lg shadow-lg shadow-primary-copper/30">A</div>
                                    <span className="text-2xl font-black tracking-tighter uppercase">ACHIEVERS <span className="text-primary-copper">.</span></span>
                                </div>
                                <h3 className="text-4xl font-black text-white italic tracking-widest">{ticketData.ticketType}</h3>
                            </div>
                            <div className="text-right">
                                <div className="glass-panel px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 text-text-muted">
                                    Africa Edition 2026
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Panel */}
                    <div className="p-12 flex flex-col md:flex-row gap-16 items-center bg-midnight-obsidian">
                        <div className="flex-grow w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Delegate Name</p>
                                    <p className="text-3xl font-black text-white uppercase italic tracking-tighter">{ticketData.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Verification ID</p>
                                    <p className="text-2xl font-mono font-black text-primary-copper">{ticketData.ticketId}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 mb-12 border-t border-white/5 pt-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary-copper rounded-xl">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-text-muted tracking-[0.3em]">Timeline</p>
                                        <p className="text-sm font-bold text-white uppercase tracking-widest">Mar 31 — Apr 01</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary-copper rounded-xl">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-text-muted tracking-[0.3em]">Location</p>
                                        <p className="text-sm font-bold text-white uppercase tracking-widest">Lagos, NI</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                                <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-widest">
                                    Pass grants full access to {ticketData.ticketType} protocols. Present encrypted QR at terminal ALPHA-1 for entry.
                                </p>
                            </div>
                        </div>

                        {/* QR Segment */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div className="p-8 bg-white rounded-[40px] shadow-2xl transition-all hover:scale-105">
                                <QRCodeSVG
                                    value={`auth_token:${ticketData.ticketId}`}
                                    size={150}
                                    level={"H"}
                                    includeMargin={false}
                                    fgColor="#05000A"
                                />
                            </div>
                            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.5em] text-text-muted opacity-50">Secure Auth Protocol</p>
                        </div>
                    </div>

                    <div className="bg-midnight-purple py-5 text-center text-[10px] font-black uppercase tracking-[0.6em] text-white/20 border-t border-white/5">
                        Verified Institutional Asset © 2026 Achievers
                    </div>
                </div>

                {/* Decorative Side Notches */}
                <div className="absolute top-[180px] -left-6 w-12 h-12 bg-midnight-black rounded-full border-r border-white/5"></div>
                <div className="absolute top-[180px] -right-6 w-12 h-12 bg-midnight-black rounded-full border-l border-white/5"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-20 relative z-10">
                <button onClick={handleDownload} className="btn btn-outline !border-white/10 hover:!border-white/30 !px-10 flex items-center gap-3">
                    <Download size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Store Pass</span>
                </button>
                <button className="btn btn-outline !border-white/10 hover:!border-white/30 !px-10 flex items-center gap-3">
                    <Share2 size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Broadcast Access</span>
                </button>
                <button onClick={onBack} className="btn btn-primary !px-12 flex items-center gap-3">
                    <Home size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">Main Portal</span>
                </button>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 40px;
                }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </div>
    );
}

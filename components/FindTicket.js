"use client";
import React, { useState } from 'react';
import { Search, AlertCircle, Fingerprint } from 'lucide-react';
import TicketResult from './TicketResult';

export default function FindTicket() {
    const [searchName, setSearchName] = useState('');
    const [foundTicket, setFoundTicket] = useState(null);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setIsSearching(true);

        try {
            const response = await fetch(`/api/tickets/search?name=${encodeURIComponent(searchName)}`);
            const data = await response.json();

            if (response.ok) {
                setFoundTicket(data);
            } else {
                setError(data.error || "No registration record matches this name.");
            }
        } catch (err) {
            console.error("Search Error:", err);
            setError("Authentication protocol failure. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    if (foundTicket) {
        return <TicketResult ticketData={foundTicket} onBack={() => setFoundTicket(null)} />;
    }

    return (
        <section id="find-ticket" className="section bg-midnight-black relative overflow-hidden">
            {/* Soft Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[200px] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex w-24 h-24 glass-panel items-center justify-center mb-12 shadow-2xl border border-white/10 text-primary-copper">
                        <Search size={40} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-5xl md:text-7xl text-white mb-8 font-black uppercase italic tracking-tighter">
                        Recover Your <span className="text-gradient font-black NOT-italic">Credentials.</span>
                    </h2>
                    <p className="text-text-secondary text-xl mb-16 font-light max-w-2xl mx-auto">
                        Verify your registration to retrieve your high-security digital delegate pass or print-ready high-resolution documentation.
                    </p>

                    <div className="max-w-2xl mx-auto glass-panel p-3 rounded-[40px] border border-white/5 mb-14">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                            <div className="flex-grow relative">
                                <input
                                    type="text"
                                    placeholder="Enter Registered Full Name"
                                    className="w-full h-16 pl-8 pr-4 rounded-[32px] bg-white/5 border border-transparent focus:border-primary-copper/30 outline-none transition-all text-lg font-bold text-white placeholder:font-medium placeholder:text-text-muted/40 uppercase tracking-widest"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="btn btn-primary h-16 px-12 text-[11px] font-black tracking-[0.3em] disabled:opacity-50"
                            >
                                {isSearching ? 'Verifying...' : 'Retrieve Pass'}
                            </button>
                        </form>
                    </div>

                    {error && (
                        <div className="flex items-center justify-center gap-3 text-red-400 mb-14 animate-fade-in bg-red-500/5 p-5 rounded-3xl border border-red-500/20 max-w-xl mx-auto backdrop-blur-xl">
                            <AlertCircle size={22} />
                            <span className="text-sm font-black uppercase tracking-widest">{error}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-6 py-10 border-t border-white/5 max-w-xl mx-auto">
                        <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-primary-copper border border-white/10">
                            <Fingerprint size={24} />
                        </div>
                        <div className="text-left">
                            <strong className="text-primary-copper uppercase tracking-[0.3em] text-[10px] block mb-2 font-black">Secure Authentication</strong>
                            <p className="text-[11px] text-text-muted font-medium leading-relaxed max-w-md">
                                Session data is encrypted and processed locally. Your registration integrity is maintained through our zero-knowledge retrieval protocol.
                            </p>
                        </div>
                    </div>
                </div>
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
        </section>
    );
}

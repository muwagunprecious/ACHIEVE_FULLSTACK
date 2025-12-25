"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-bg-deep text-white pt-32 pb-16 relative overflow-hidden">
            {/* Background Motif Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-copper to-transparent opacity-30"></div>
            <div className="motif-bg opacity-[0.03]"></div>

            <div className="container relative z-10 flex flex-col items-center">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-16 group cursor-pointer">
                    <div className="w-14 h-14 bg-primary-copper rounded-2xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-primary-copper/20 mb-6">
                        <span className="text-white font-black text-3xl italic">A</span>
                    </div>
                    <div className="text-3xl font-black tracking-tighter mb-6">
                        <span className="text-white">ACHIEVERS</span>
                        <span className="text-primary-copper">.</span>
                    </div>
                    <p className="text-text-secondary text-lg font-light leading-relaxed max-w-xl mx-auto">
                        Catalyzing the next era of African excellence through visionary leadership and institutional transformation.
                    </p>
                </div>

                {/* Navigation Section */}
                <nav className="mb-12">
                    <ul className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-black tracking-[0.3em] uppercase">
                        <li><a href="#home" className="text-text-secondary hover:text-white transition-all duration-300">Home</a></li>
                        <li><a href="#speakers" className="text-text-secondary hover:text-white transition-all duration-300">Speakers</a></li>
                        <li><a href="#schedule" className="text-text-secondary hover:text-white transition-all duration-300">Schedule</a></li>
                        <li><a href="#tickets" className="text-text-secondary hover:text-white transition-all duration-300">Tickets</a></li>
                        <li><a href="#find-ticket" className="text-text-secondary hover:text-white transition-all duration-300">Find Pass</a></li>
                    </ul>
                </nav>

                {/* Social Section */}
                <div className="flex justify-center gap-6 mb-20">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 glass-panel flex items-center justify-center text-text-muted hover:text-primary-copper hover:border-primary-copper/30 transition-all duration-300 rounded-2xl border border-white/5">
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="w-full pt-12 border-t border-white/5 flex flex-col items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">
                        © 2026 Achievers Summit Africa • All Rights Reserved
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted/60">
                        <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
                        <a href="#" className="hover:text-white transition-colors">Digital Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Verified Portal</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-primary-copper { color: var(--primary-copper); }
                .bg-primary-copper { background-color: var(--primary-copper); }
            `}</style>
        </footer>
    );
}

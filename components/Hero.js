"use client";
import React from 'react';
import { MapPin, Calendar, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-bg-deep overflow-hidden">
            {/* Premium Atmospheric Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary-copper/10 rounded-full blur-[160px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-primary-copper/5 rounded-full blur-[140px]"></div>

                {/* Subtle Motif Overlay */}
                <div className="motif-bg opacity-[0.05]"></div>

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep"></div>
            </div>

            <div className="container relative z-10 pt-52 pb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center animate-fade-in">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full text-white text-[9px] font-black tracking-[0.3em] uppercase mb-10">
                            <Sparkles size={12} className="text-primary-copper" />
                            <span>Africa's Most Influential summit</span>
                        </div>

                        <h1 className="text-white mb-8 w-full flex flex-col md:flex-row justify-between items-center tracking-[-0.06em] uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                            <span>CONNECT.</span>
                            <span className="text-gradient">LEAD.</span>
                            <span>ACHIEVE.</span>
                        </h1>

                        <p className="text-text-secondary text-base md:text-lg mb-12 max-w-2xl font-light leading-relaxed">
                            A convergence of visionaries, industry titans, and policy makers shaping the future of African excellence.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            <a href="#tickets" className="btn btn-primary !py-4 !px-10 group">
                                <span className="text-xs">Complete Registration</span>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </a>
                            <a href="#schedule" className="btn btn-outline !py-4 !px-10 text-xs">
                                View Full Agenda
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-xl border-t border-white/5 pt-10">
                            <div className="flex items-center justify-center md:justify-start gap-5 group">
                                <div className="w-16 h-16 rounded-[24px] glass-panel flex items-center justify-center text-primary-copper group-hover:bg-primary-copper group-hover:text-white transition-all duration-500">
                                    <MapPin size={28} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase text-text-muted font-black tracking-widest mb-1.5">Primary Venue</p>
                                    <p className="text-white font-bold text-xl uppercase italic">Eko Atlantic, Lagos</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-5 group">
                                <div className="w-16 h-16 rounded-[24px] glass-panel flex items-center justify-center text-primary-copper group-hover:bg-primary-copper group-hover:text-white transition-all duration-500">
                                    <Calendar size={28} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase text-text-muted font-black tracking-widest mb-1.5">Official Dates</p>
                                    <p className="text-white font-bold text-xl uppercase italic">MAR 31 – APR 01</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Mouse Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-text-muted">
                <div className="w-[30px] h-[50px] border-2 border-white/10 rounded-full relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-copper rounded-full animate-bounce"></div>
                </div>
            </div>

            <style jsx>{`
                .text-primary-copper { color: var(--primary-copper); }
                .bg-primary-copper\/10 { background-color: rgba(255, 95, 31, 0.1); }
                .bg-primary-copper\/5 { background-color: rgba(255, 95, 31, 0.05); }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
            `}</style>
        </section>
    );
}

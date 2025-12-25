"use client";
import React from 'react';
import { Target, Users } from 'lucide-react';

export default function ExhibitionStand({ onBook }) {
    return (
        <section id="exhibit" className="py-32 bg-midnight-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="motif-bg opacity-[0.02]"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container relative z-10">
                {/* Horizontal Flex Container: Image Left, Text Right */}
                <div className="flex flex-row items-start gap-6 md:gap-10 px-4 md:px-0 max-w-5xl">

                    {/* 1. Ultra-Small Iconic Visual (35px) */}
                    <div className="flex-shrink-0 mt-2">
                        <div className="relative group">
                            <div className="relative w-[35px] h-[35px] rounded-[10px] overflow-hidden shadow-2xl border border-white/10 bg-midnight-obsidian">
                                <img
                                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop"
                                    alt="Professional Exhibition"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-black/40 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Text & Content (Pushed to the Right) */}
                    <div className="flex-1 text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[9px] tracking-[0.3em] uppercase mb-6">
                            Premium Partnership
                        </div>

                        <h2 className="text-3xl md:text-5xl text-white mb-6 italic leading-tight">
                            Command the <span className="text-gradient font-black NOT-italic">Spotlight.</span>
                        </h2>

                        <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed mb-8 max-w-xl">
                            The Achievers Summit is the definitive staging ground for African excellence. An exhibition stand places your brand directly in the path of continental visionaries and industrial titans.
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            {[
                                {
                                    icon: <Users size={14} />,
                                    title: "Elite Networking",
                                    desc: "Direct path to C-suite leaders."
                                },
                                {
                                    icon: <Target size={14} />,
                                    title: "Brand Authority",
                                    desc: "Prime institutional visibility."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="flex-shrink-0 w-8 h-8 glass-panel rounded-lg flex items-center justify-center text-primary-copper border border-white/5">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest text-[9px] mb-0.5">{item.title}</h4>
                                        <p className="text-[9px] text-text-muted font-medium italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={onBook}
                            className="btn btn-primary group !py-3 !px-10 !text-[9px] tracking-[0.4em] shadow-xl shadow-primary-copper/10 hover:shadow-primary-copper/20 transition-all flex items-center gap-3"
                        >
                            <span>Initialize Booking</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white animate-pulse"></div>
                        </button>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .bg-midnight-black { background-color: var(--midnight-black); }
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
            `}</style>
        </section>
    );
}

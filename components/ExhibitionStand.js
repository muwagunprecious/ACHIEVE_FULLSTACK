"use client";
import React from 'react';
import { Target, Users } from 'lucide-react';

export default function ExhibitionStand({ onBook }) {
    return (
        <section id="partner" className="py-32 bg-midnight-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="motif-bg opacity-[0.02]"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-10 md:gap-20 lg:gap-32">
                    {/* Left Column: Fixed Portrait Handshake Visual */}
                    <div className="flex justify-center md:justify-start order-1 md:order-1">
                        <div className="relative group">
                            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-midnight-obsidian" style={{ width: '450px', height: '700px', maxWidth: '100%' }}>
                                <img
                                    src="/images/handshake.jpg"
                                    alt="Partnership Handshake"
                                    style={{ width: '450px', height: '700px', objectFit: 'cover' }}
                                    className="transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-black via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="text-left order-2 md:order-2">
                        <div className="inline-block px-8 py-3 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-xs tracking-[0.4em] uppercase mb-10">
                            Strategic Alliance
                        </div>

                        <h2 className="text-4xl md:text-6xl text-white mb-10 italic leading-tight">
                            BECOME A <br />
                            <span className="text-gradient font-black NOT-italic block">STRATEGIC PARTNER.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed mb-16">
                            Join forces with Africa's premier summit for achievers and industry leaders. Strategic partnerships position your organization at the forefront of continental innovation.
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 gap-10 mb-20">
                            {[
                                {
                                    icon: <Users size={24} />,
                                    title: "Elite Access",
                                    desc: "Direct engagement with decision makers."
                                },
                                {
                                    icon: <Target size={24} />,
                                    title: "Brand Visibility",
                                    desc: "Continental exposure & recognition."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-center">
                                    <div className="flex-shrink-0 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center text-primary-copper border border-white/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                                        <p className="text-sm text-text-muted font-medium italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-start">
                            <button
                                onClick={onBook}
                                className="btn btn-primary group !py-5 !px-16 !text-xs tracking-[0.5em] shadow-2xl shadow-primary-copper/20 hover:shadow-primary-copper/40 transition-all flex items-center gap-4"
                            >
                                <span>PARTNER WITH US</span>
                                <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white animate-pulse"></div>
                            </button>
                        </div>
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
                .text-gradient {
                    background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section >
    );
}


"use client";
import React from 'react';
import { Check, Sparkle, Zap, Crown, Rocket, Star } from 'lucide-react';

const iconMap = {
    'REGULAR PASS': <Sparkle size={20} />,
    'ECONOMY PASS': <Rocket size={20} />,
    'BUSINESS CLASS PASS': <Zap size={20} />,
    'FIRST CLASS PASS': <Crown size={20} />,
    'EXCLUSIVE BIZJET PASS': <Star size={20} />,
};

const defaultIcon = <Sparkle size={20} />;

export default function Tickets({ onBuy }) {
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/tickets/categories');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <section id="tickets" className="section bg-bg-deep flex items-center justify-center min-h-[400px]">
                <div className="text-white font-black tracking-widest animate-pulse">LOADING EXPERIENCES...</div>
            </section>
        );
    }

    return (
        <section id="tickets" className="section bg-bg-deep relative overflow-hidden">
            <div className="container">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Registration Open</div>
                    <h2 className="text-5xl md:text-8xl text-white mb-8 italic">Get Your <span className="text-gradient font-black NOT-italic">Official Pass.</span></h2>
                    <p className="text-xl text-text-secondary font-light">
                        Select your preferred experience level and secure your seat instantly. Each pass is issued as a digital PDF delivered to your email.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((ticket, index) => {
                        const active = ticket.isEnabled && ticket.status === 'ACTIVE';
                        const isPopular = ticket.name.includes('BUSINESS');
                        const isLimited = ticket.name.includes('BIZJET');
                        const slotsLeft = ticket.capacity - (ticket._count?.tickets || 0);

                        return (
                            <div
                                key={ticket.id}
                                className={`group relative glass-panel p-10 flex flex-col transition-all duration-700 border border-white/5 ${active ? 'hover:border-primary-copper/30' : 'opacity-40 grayscale'} ${isPopular && active ? 'lg:scale-105 shadow-2xl shadow-primary-copper/10' : ''}`}
                                style={{ background: isPopular && active ? 'rgba(255, 95, 31, 0.03)' : 'rgba(255, 255, 255, 0.02)' }}
                            >
                                {!active && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-midnight-black/40 backdrop-blur-[2px] rounded-[40px]">
                                        <div className="px-6 py-3 bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full shadow-2xl transform -rotate-12">
                                            Category Closed
                                        </div>
                                    </div>
                                )}

                                {isPopular && active && (
                                    <div className="absolute top-8 right-8 text-primary-copper animate-pulse">
                                        <Sparkle size={20} strokeWidth={3} />
                                    </div>
                                )}

                                {isLimited && active && (
                                    <div className="absolute -top-4 left-10 bg-white text-midnight-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                                        {slotsLeft} Slots Only
                                    </div>
                                )}

                                {active && (
                                    <div className="absolute -top-4 right-10 bg-primary-copper text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl shadow-primary-copper/30">
                                        {ticket.price === 0 ? 'Complimentary' : `₦${ticket.price.toLocaleString()}`}
                                    </div>
                                )}

                                <div className="mb-12">
                                    <div className="w-14 h-14 glass-panel flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 rounded-2xl">
                                        {iconMap[ticket.name] || defaultIcon}
                                    </div>
                                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">
                                        {ticket.name.replace(' PASS', '')} <span className="text-primary-copper NOT-italic text-[10px] tracking-[0.3em] ml-2">PASS</span>
                                    </h3>
                                </div>

                                <div className="flex-grow mb-12">
                                    <ul className="space-y-5">
                                        {(ticket.features || []).map((feature, idx) => (
                                            <li key={idx} className="flex gap-4 items-start group/item">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-copper opacity-40 group-hover/item:opacity-100 transition-opacity" />
                                                <span className="text-sm font-medium text-text-secondary group-hover/item:text-white transition-colors tracking-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => active && onBuy(ticket)}
                                    disabled={!active}
                                    className={`btn w-full !py-4 transition-all duration-500 ${isPopular && active ? 'btn-primary shadow-lg shadow-primary-copper/20' : 'btn-outline border-white/10 hover:border-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
                                >
                                    <span className="tracking-[0.2em]">{active ? 'GET MY TICKET' : 'Locked'}</span>
                                </button>

                                {/* Decorative Background Accent */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-copper/5 rounded-tl-[100px] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 40px;
                }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </section>
    );
}

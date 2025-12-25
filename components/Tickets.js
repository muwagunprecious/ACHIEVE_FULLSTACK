"use client";
import React from 'react';
import { Check, Sparkle, Zap, Crown, Rocket, Star } from 'lucide-react';

const ticketCategories = [
    {
        name: 'REGULAR PASS',
        price: 'Free',
        tag: 'Community',
        features: [
            'Access to the Summit',
            'Overflow Auditorium Seating',
            'Light refreshments',
            'Designated Route Transport'
        ],
        icon: <Sparkle size={20} />
    },
    {
        name: 'ECONOMY PASS',
        price: '₦20,000',
        tag: 'Growth',
        features: [
            'Full Main Hall Access',
            'Economy Seating',
            'One-course Buffet Meal',
            'Hard copy Certificate',
            'Souvenir Pack',
            'Raffle Draw Entry'
        ],
        icon: <Rocket size={20} />
    },
    {
        name: 'BUSINESS PASS',
        price: '₦250,000',
        tag: 'Executive',
        features: [
            'VIP Two-Day Access',
            'Reserved Business Seating',
            'Two-course Buffet Lunch',
            'VIP Fast-Track Entry',
            'Exclusive Souvenir Pack',
            'VIP Deal Room Access',
            'Award Night Invitation'
        ],
        popular: true,
        icon: <Zap size={20} />
    },
    {
        name: 'FIRST CLASS PASS',
        price: '₦500,000',
        tag: 'Elite',
        features: [
            'VVIP Front-Row Seating',
            'Luxury Lounge Access',
            'Executive Hotel Stay',
            'Chauffeured Transport',
            'Gold-framed Certificate',
            'Red Carpet Photo Session',
            'Meet-and-Greet Session'
        ],
        icon: <Crown size={20} />
    },
    {
        name: 'BIZJET PASS',
        price: '₦1.5M',
        tag: 'Institutional',
        features: [
            'Unlimited VVIP Access',
            'Personal Event Assistant',
            'Luxury VVIP Gift Box',
            'Media Brand Spotlight',
            'Partner Gold Award Trophy',
            'Dedicated SUV & Protocol',
            'Investor Deal Room'
        ],
        limited: '5 Slots Only',
        icon: <Star size={20} />
    }
];

export default function Tickets({ onBuy }) {
    const [ticketStatuses, setTicketStatuses] = React.useState({});

    React.useEffect(() => {
        const stored = localStorage.getItem('achievers_ticket_status');
        if (stored) {
            setTicketStatuses(JSON.parse(stored));
        }
    }, []);

    // Helper to check if a ticket is open (default to true)
    const isOpen = (id) => ticketStatuses[id] === undefined ? true : ticketStatuses[id];

    return (
        <section id="tickets" className="section bg-bg-deep relative overflow-hidden">
            <div className="container">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Investment Levels</div>
                    <h2 className="text-5xl md:text-8xl text-white mb-8 italic">Choose Your <span className="text-gradient font-black NOT-italic">Experience.</span></h2>
                    <p className="text-xl text-text-secondary font-light">
                        Select the tier that resonates with your vision. Each pass offers a distinct pathway to excellence and institutional connection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {ticketCategories.map((ticket, index) => {
                        const ticketId = (index + 1).toString();
                        const active = isOpen(ticketId);

                        return (
                            <div
                                key={index}
                                className={`group relative glass-panel p-10 flex flex-col transition-all duration-700 border border-white/5 ${active ? 'hover:border-primary-copper/30' : 'opacity-40 grayscale'} ${ticket.popular && active ? 'lg:scale-105 shadow-2xl shadow-primary-copper/10' : ''}`}
                                style={{ background: ticket.popular && active ? 'rgba(255, 95, 31, 0.03)' : 'rgba(255, 255, 255, 0.02)' }}
                            >
                                {!active && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-midnight-black/40 backdrop-blur-[2px] rounded-[40px]">
                                        <div className="px-6 py-3 bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full shadow-2xl transform -rotate-12">
                                            Category Closed
                                        </div>
                                    </div>
                                )}

                                {ticket.popular && active && (
                                    <div className="absolute top-8 right-8 text-primary-copper animate-pulse">
                                        <Sparkle size={20} strokeWidth={3} />
                                    </div>
                                )}

                                {ticket.limited && active && (
                                    <div className="absolute -top-4 left-10 bg-white text-midnight-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                                        {ticket.limited}
                                    </div>
                                )}

                                <div className="mb-12">
                                    <div className="w-14 h-14 glass-panel flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 rounded-2xl">
                                        {ticket.icon}
                                    </div>
                                    <h3 className="text-[10px] font-black text-text-muted tracking-[0.3em] uppercase mb-4">{ticket.name}</h3>
                                    <div className="text-5xl font-black text-white italic tracking-tighter">{ticket.price}</div>
                                </div>

                                <div className="flex-grow mb-12">
                                    <ul className="space-y-5">
                                        {ticket.features.map((feature, idx) => (
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
                                    className={`btn w-full !py-4 transition-all duration-500 ${ticket.popular && active ? 'btn-primary shadow-lg shadow-primary-copper/20' : 'btn-outline border-white/10 hover:border-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
                                >
                                    <span className="tracking-[0.2em]">{active ? 'Secure Passage' : 'Locked'}</span>
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

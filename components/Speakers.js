"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Share2, Linkedin } from 'lucide-react';

const speakers = [
    {
        name: 'John Adewale',
        role: 'Leadership Strategist',
        org: 'Global Lead Africa',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'
    },
    {
        name: 'Maria Thompson',
        role: 'Global Business Coach',
        org: 'Thompson Advisory',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop'
    },
    {
        name: 'Thami Nkadi',
        role: 'Communication Architect',
        org: 'Nkadi Communications',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop'
    },
    {
        name: 'Peter Greenberg',
        role: 'Media & Strategy Expert',
        org: 'CBS News',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop'
    },
    {
        name: 'Aisha Bello',
        role: 'Innovation & Policy Advocate',
        org: 'Future Africa Lab',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop'
    }
];

export default function Speakers() {
    const [speakersList, setSpeakersList] = React.useState([]);
    const scrollRef = useRef(null);

    React.useEffect(() => {
        const stored = localStorage.getItem('achievers_speakers');
        if (stored) {
            setSpeakersList(JSON.parse(stored));
        } else {
            // Initial faculty if none in storage
            const initial = [
                { id: '1', name: 'Dr. John Adewale', role: 'Leadership Strategist', org: 'Global Lead Africa', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop' },
                { id: '2', name: 'Maria Thompson', role: 'Global Business Coach', org: 'Thompson Advisory', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop' },
                { id: '3', name: 'Aliko Dangote', role: 'President, Dangote Group', org: 'Dangote Group', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dangote' },
                { id: '4', name: 'Ngozi Okonjo-Iweala', role: 'Director-General', org: 'WTO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi' }
            ];
            setSpeakersList(initial);
            localStorage.setItem('achievers_speakers', JSON.stringify(initial));
        }
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 450;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="speakers" className="section-sm bg-midnight-obsidian overflow-hidden">
            <div className="container relative">
                <div className="flex flex-col items-center text-center mb-16 gap-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">The Faculty</div>
                        <h2 className="text-4xl md:text-6xl text-white mb-6">Architects of <span className="text-gradient font-black italic">Transformation.</span></h2>
                        <p className="text-lg text-text-secondary font-light max-w-2xl mx-auto">
                            Engage with the minds redefining industry standards and shaping the socioeconomic landscape of Africa.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} className="w-12 h-12 glass-panel text-white hover:bg-primary-copper transition-all duration-500 rounded-full flex items-center justify-center">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll('right')} className="w-12 h-12 glass-panel text-white hover:bg-primary-copper transition-all duration-500 rounded-full flex items-center justify-center">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar"
                >
                    {speakersList.map((speaker, index) => (
                        <div key={index} className="speaker-card snap-start">
                            <div className="relative group overflow-hidden rounded-[32px] aspect-[10/13] mb-6 bg-midnight-black">
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                                />

                                {/* Social Overlay */}
                                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                    <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-midnight-black hover:bg-primary-copper hover:text-white transition-all duration-300">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-midnight-black hover:bg-primary-copper hover:text-white transition-all duration-300">
                                        <Share2 size={18} />
                                    </a>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-black via-transparent to-transparent opacity-60"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tighter italic">{speaker.name}</h3>
                                <p className="text-primary-copper font-bold text-[9px] tracking-[0.2em] uppercase mb-1">{speaker.role}</p>
                                <p className="text-text-muted text-[10px] font-medium uppercase tracking-[0.1em]">{speaker.org || speaker.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .speaker-card {
                    min-width: 300px;
                    max-width: 300px;
                }
                @media (max-width: 768px) {
                    .speaker-card { min-width: 260px; }
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </section>
    );
}

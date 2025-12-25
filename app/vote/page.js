"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, CheckCircle2, Lock, ArrowRight, Star } from 'lucide-react';

export default function VotingPage() {
    const [activeCategory, setActiveCategory] = useState("Tech Innovator");
    const [selectedNominee, setSelectedNominee] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [voterEmail, setVoterEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        "Tech Innovator",
        "Business Leader",
        "Creative Arts",
        "Social Impact"
    ];

    const nominees = {
        "Tech Innovator": [
            { id: 1, name: "Dr. Sarah Jenkins", role: "AI Researcher", image: "", votes: 1200 },
            { id: 2, name: "Michael Chang", role: "Fintech CEO", image: "", votes: 980 },
            { id: 3, name: "Aisha Bello", role: "Robotics Engineer", image: "", votes: 1500 },
        ],
        "Business Leader": [
            { id: 4, name: "Robert Fox", role: "Enterprise Director", image: "", votes: 1100 },
            { id: 5, name: "Darlene Robertson", role: "Startup Founder", image: "", votes: 1350 },
        ],
        "Creative Arts": [
            { id: 6, name: "Cody Fisher", role: "Digital Artist", image: "", votes: 890 },
            { id: 7, name: "Esther Howard", role: "Filmmaker", image: "", votes: 1020 },
        ],
        "Social Impact": [
            { id: 8, name: "Ralph Edwards", role: "NGO Director", image: "", votes: 2000 },
        ]
    };

    const handleVote = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setHasVoted(true);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-bg-deep relative">
            <Navbar />

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
                <div className="motif-bg opacity-5 absolute inset-0"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/10 text-primary-copper text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <Trophy size={14} />
                        <span>Official Voting Portal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-6">CAST YOUR <span className="text-gradient NOT-italic">VOTE</span></h1>
                    <p className="max-w-xl mx-auto text-text-muted text-sm md:text-base leading-relaxed">
                        Support the visionaries shaping the future. Voting ends on December 30th. One vote per category per person.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setSelectedNominee(null); }}
                            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'bg-white/5 text-text-muted border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Nominees Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {nominees[activeCategory]?.map((nominee) => (
                        <div
                            key={nominee.id}
                            onClick={() => !hasVoted && setSelectedNominee(nominee)}
                            className={`glass-panel p-6 rounded-[32px] border transition-all duration-300 cursor-pointer group relative overflow-hidden ${selectedNominee?.id === nominee.id
                                    ? 'border-primary-copper bg-primary-copper/5 shadow-[0_0_30px_rgba(210,164,120,0.15)] scale-[1.02]'
                                    : 'border-white/5 hover:border-white/20'
                                }`}
                        >
                            {selectedNominee?.id === nominee.id && (
                                <div className="absolute top-4 right-4 text-primary-copper animate-bounce">
                                    <CheckCircle2 size={24} />
                                </div>
                            )}

                            <div className="w-24 h-24 rounded-2xl bg-white/10 mb-6 overflow-hidden relative">
                                {/* Placeholder for Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                    <Star size={32} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{nominee.name}</h3>
                            <p className="text-xs text-primary-copper font-bold uppercase tracking-wider mb-4">{nominee.role}</p>
                            <p className="text-sm text-text-muted line-clamp-3 mb-6">
                                Recognized for outstanding contributions and innovative leadership in the field of {activeCategory}.
                            </p>

                            <button className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${selectedNominee?.id === nominee.id
                                    ? 'bg-primary-copper text-white'
                                    : 'bg-white/5 text-text-muted group-hover:bg-white/10'
                                }`}>
                                {selectedNominee?.id === nominee.id ? 'Selected' : 'Vote For This Nominee'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Voting Action / Modal Overlay */}
                {selectedNominee && !hasVoted && (
                    <div className="fixed bottom-0 left-0 right-0 p-6 z-50 flex justify-center animate-fade-in-up">
                        <div className="glass-panel p-2 pl-6 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl max-w-2xl w-full flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">You are voting for:</p>
                                <p className="text-lg font-black text-white italic">{selectedNominee.name}</p>
                            </div>

                            <form onSubmit={handleVote} className="flex-1 w-full flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        required
                                        type="email"
                                        placeholder="Enter your email to verify"
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 outline-none text-white text-sm focus:border-primary-copper/50 transition-colors"
                                        value={voterEmail}
                                        onChange={(e) => setVoterEmail(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary h-12 px-6 rounded-xl flex items-center gap-2 font-bold tracking-wider disabled:opacity-50"
                                >
                                    {isSubmitting ? '...' : (
                                        <>
                                            VOTE <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {hasVoted && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
                        <div className="glass-panel p-10 rounded-[40px] border border-green-500/30 max-w-md text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-[50px] pointer-events-none"></div>

                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter mb-2">VOTE <span className="text-green-500 NOT-italic">CONFIRMED</span></h2>
                            <p className="text-text-muted text-sm mb-8">
                                Thank you! Your vote for <strong>{selectedNominee?.name}</strong> has been securely recorded.
                            </p>
                            <button
                                onClick={() => { setHasVoted(false); setSelectedNominee(null); setVoterEmail(''); }}
                                className="btn btn-primary w-full h-14 rounded-xl font-bold tracking-widest uppercase"
                            >
                                CONTINUE VOTING
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}

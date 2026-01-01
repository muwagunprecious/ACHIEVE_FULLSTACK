"use client";
import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, Handshake, Mail, Phone, User, Building2, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PartnershipPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnershipType: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/partnerships/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit partnership request');
            }

            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    if (status === 'success') {
        return (
            <main className="min-h-screen bg-midnight-black flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md w-full glass-panel p-12 rounded-[40px] border border-green-500/20 animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-black italic text-white mb-6 uppercase tracking-tighter">SUCCESS <span className="text-green-500 NOT-italic">AUTHENTICATED.</span></h2>
                    <p className="text-text-muted text-lg mb-12 font-light italic">
                        Your strategic alliance request has been logged. Our protocol officers will contact you shortly.
                    </p>
                    <button
                        onClick={() => window.close()}
                        className="btn btn-primary w-full h-16 text-xs font-black tracking-[0.4em] uppercase italic"
                    >
                        RETURN TO SUMMIT
                    </button>
                    <p className="mt-8 text-[10px] text-text-muted uppercase tracking-widest font-black italic">You may now close this tab</p>
                </div>

                <style jsx>{`
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.02);
                        backdrop-filter: blur(40px);
                    }
                `}</style>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg-deep relative">
            <Navbar />

            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 pt-40 pb-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                        {/* Left Content: Branding & Info */}
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/10 text-primary-copper text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                <Handshake size={14} />
                                <span>Strategic Partnership</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-10 leading-tight">
                                SHAPING THE <br />
                                <span className="text-gradient NOT-italic">AFRICAN FUTURE.</span>
                            </h1>

                            <p className="text-xl text-text-secondary font-light mb-16 max-w-xl leading-relaxed">
                                Join Africa's premier summit for achievers. Our strategic partners gain exclusive access to a high-net-worth network of industry titans and continental policy makers.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: 'Global Exposure', desc: 'Brand synchronization with continental leaders.' },
                                    { title: 'Premium Access', desc: 'VIP networking with top-tier delegates.' },
                                    { title: 'Strategic Impact', desc: 'Influence African innovation and growth.' }
                                ].map((benefit, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-copper flex-shrink-0">
                                            <ChevronRight size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{benefit.title}</h4>
                                            <p className="text-sm text-text-muted italic">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content: Form */}
                        <div className="glass-panel p-8 md:p-12 rounded-[40px] border border-white/5 shadow-2xl animate-fade-in-up">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Company Name</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><Building2 size={16} /></div>
                                            <input
                                                required
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl pl-14 pr-6 outline-none text-white transition-all font-bold tracking-widest placeholder:text-white/10"
                                                placeholder="ENTER ORGANIZATION"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Contact Protocol</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><User size={16} /></div>
                                            <input
                                                required
                                                type="text"
                                                name="contactPerson"
                                                value={formData.contactPerson}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl pl-14 pr-6 outline-none text-white transition-all font-bold tracking-widest placeholder:text-white/10"
                                                placeholder="ENTER FULL NAME"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Official Email</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><Mail size={16} /></div>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl pl-14 pr-6 outline-none text-white transition-all font-bold tracking-widest placeholder:text-white/10"
                                                placeholder="PARTNER@ORG.AFRICA"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Contact Line</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><Phone size={16} /></div>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl pl-14 pr-6 outline-none text-white transition-all font-bold tracking-widest placeholder:text-white/10"
                                                placeholder="+234 ..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Partnership Tier</label>
                                    <select
                                        required
                                        name="partnershipType"
                                        value={formData.partnershipType}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl px-6 outline-none text-white transition-all font-black tracking-[0.2em] appearance-none uppercase"
                                    >
                                        <option value="" className="bg-midnight-obsidian">Select Tier</option>
                                        <option value="Platinum Sponsor" className="bg-midnight-obsidian">Platinum Partner</option>
                                        <option value="Gold Sponsor" className="bg-midnight-obsidian">Gold Partner</option>
                                        <option value="Silver Sponsor" className="bg-midnight-obsidian">Silver Partner</option>
                                        <option value="Media Partner" className="bg-midnight-obsidian">Media Alliance</option>
                                        <option value="Other" className="bg-midnight-obsidian">Strategic Other</option>
                                    </select>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-1">Strategic Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 rounded-2xl p-6 outline-none text-white transition-all font-bold tracking-widest placeholder:text-white/10 resize-none"
                                        placeholder="TELL US ABOUT YOUR PARTNERSHIP GOALS..."
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4 animate-shake">
                                        <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                                        <p className="text-red-200 text-xs font-black tracking-widest uppercase">{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="btn btn-primary w-full h-16 text-xs font-black tracking-[0.5em] uppercase italic flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>INITIATE ALLIANCE</span>
                                            <Handshake size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </main>
    );
}

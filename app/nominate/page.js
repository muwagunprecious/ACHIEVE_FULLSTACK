"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, Award, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NominationPage() {
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
    const [formData, setFormData] = useState({
        nomineeName: '',
        nomineeEmail: '',
        nomineePhone: '',
        category: '',
        reason: '',
        nominatorName: '',
        nominatorEmail: ''
    });

    const categories = [
        "Tech Innovator of the Year",
        "Business Leader of the Year",
        "Creative Arts Excellence",
        "Social Impact Champion",
        "Young Achiever (Under 30)",
        "Lifetime Achievement Award"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]));

        try {
            // Dynamically import action to avoid client-side bundling issues if any
            const { submitNomination } = await import('./actions');
            const result = await submitNomination(formDataObj);

            if (result.success) {
                setStatus('SUCCESS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(result.error || 'Something went wrong');
                setStatus('IDLE');
            }
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred');
            setStatus('IDLE');
        }
    };

    if (status === 'SUCCESS') {
        return (
            <main className="min-h-screen bg-bg-deep relative overflow-hidden flex flex-col items-center justify-center p-6">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="motif-bg opacity-10"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-copper/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="glass-panel p-10 rounded-3xl border border-primary-copper/30 max-w-lg text-center relative z-10 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter mb-4">NOMINATION <span className="text-gradient NOT-italic">RECEIVED</span></h1>
                    <p className="text-text-muted mb-8 text-sm leading-relaxed">
                        Thank you for submitting your nomination. Our committee will review the details and get back to you shortly.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="btn btn-primary px-8 py-3 rounded-xl w-full"
                    >
                        RETURN HOME
                    </button>
                    <button
                        onClick={() => {
                            setStatus('IDLE');
                            setFormData({
                                nomineeName: '', nomineeEmail: '', nomineePhone: '', category: '', reason: '', nominatorName: '', nominatorEmail: ''
                            });
                        }}
                        className="mt-4 text-xs font-bold text-text-muted uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Submit Another Nomination
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg-deep relative">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="motif-bg opacity-5 absolute inset-0"></div>
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/10 text-primary-copper text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <Award size={14} />
                        <span>Call for Nominations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-6">RECOGNIZE <span className="text-gradient NOT-italic">EXCELLENCE</span></h1>
                    <p className="max-w-xl mx-auto text-text-muted text-sm md:text-base leading-relaxed">
                        Know someone who is making waves in their industry? Nominate them for the prestigious Achievers Awards 2026.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-[40px] border border-white/5 shadow-2xl space-y-10">

                    {/* Section 1: Nominee Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-white italic tracking-wider flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs not-italic text-text-muted">01</span>
                            NOMINEE DETAILS
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all"
                                    placeholder="Nominee's Name"
                                    value={formData.nomineeName}
                                    onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Proposed Category</label>
                                <div className="relative">
                                    <select
                                        required
                                        className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all appearance-none cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className="bg-black">{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">▼</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all"
                                    placeholder="nominee@example.com"
                                    value={formData.nomineeEmail}
                                    onChange={(e) => setFormData({ ...formData, nomineeEmail: e.target.value })}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all"
                                    placeholder="+123 456 789"
                                    value={formData.nomineePhone}
                                    onChange={(e) => setFormData({ ...formData, nomineePhone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Reason for Nomination</label>
                            <textarea
                                required
                                className="w-full h-32 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl p-6 outline-none text-white transition-all resize-none"
                                placeholder="Tell us why this person deserves the award (achievements, impact, etc.)"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/5"></div>

                    {/* Section 2: Your Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-white italic tracking-wider flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs not-italic text-text-muted">02</span>
                            YOUR DETAILS
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all"
                                    placeholder="Your Name"
                                    value={formData.nominatorName}
                                    onChange={(e) => setFormData({ ...formData, nominatorName: e.target.value })}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Your Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl px-6 outline-none text-white transition-all"
                                    placeholder="your@email.com"
                                    value={formData.nominatorEmail}
                                    onChange={(e) => setFormData({ ...formData, nominatorEmail: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={status === 'SUBMITTING'}
                            className="btn btn-primary w-full h-16 text-sm uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 rounded-xl disabled:opacity-50"
                        >
                            {status === 'SUBMITTING' ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>TRANSMITTING...</span>
                                </>
                            ) : (
                                <>
                                    <span>SUBMIT NOMINATION</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-text-muted uppercase tracking-widest mt-4">
                            By submitting, you agree to our terms and privacy policy.
                        </p>
                    </div>

                </form>
            </div>
            <Footer />
        </main>
    );
}

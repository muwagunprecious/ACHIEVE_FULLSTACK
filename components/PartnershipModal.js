"use client";
import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function PartnershipModal({ onClose }) {
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
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-2xl bg-midnight-obsidian rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                    <X size={20} className="text-white/60 group-hover:text-white transition-colors" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-primary-copper/20 to-transparent p-10 border-b border-white/5">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[9px] tracking-[0.3em] uppercase mb-4">
                        Strategic Alliance
                    </div>
                    <h2 className="text-4xl font-black italic text-white mb-2">
                        Partner <span className="text-gradient NOT-italic">with Us.</span>
                    </h2>
                    <p className="text-text-muted text-sm font-light">
                        Join Africa's most influential summit as a strategic partner.
                    </p>
                </div>

                {/* Form */}
                <div className="p-10">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-black text-white mb-2">Request Submitted!</h3>
                            <p className="text-text-muted">Our team will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary-copper focus:outline-none transition-all"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                        Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary-copper focus:outline-none transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary-copper focus:outline-none transition-all"
                                        placeholder="contact@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary-copper focus:outline-none transition-all"
                                        placeholder="+234 000 000 0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                    Partnership Type *
                                </label>
                                <select
                                    name="partnershipType"
                                    value={formData.partnershipType}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-copper focus:outline-none transition-all"
                                >
                                    <option value="" className="bg-midnight-obsidian">Select partnership type</option>
                                    <option value="Platinum Sponsor" className="bg-midnight-obsidian">Platinum Sponsor</option>
                                    <option value="Gold Sponsor" className="bg-midnight-obsidian">Gold Sponsor</option>
                                    <option value="Silver Sponsor" className="bg-midnight-obsidian">Silver Sponsor</option>
                                    <option value="Media Partner" className="bg-midnight-obsidian">Media Partner</option>
                                    <option value="Technology Partner" className="bg-midnight-obsidian">Technology Partner</option>
                                    <option value="Other" className="bg-midnight-obsidian">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary-copper focus:outline-none transition-all resize-none"
                                    placeholder="Tell us about your partnership goals..."
                                />
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                                    <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                                    <p className="text-red-200 text-sm">{errorMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full btn btn-primary !py-4 !text-xs tracking-[0.4em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>SUBMITTING...</span>
                                    </>
                                ) : (
                                    <span>SUBMIT REQUEST</span>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <style jsx>{`
                    .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                    .text-gradient {
                        background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                `}</style>
            </div>
        </div>
    );
}

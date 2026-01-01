"use client";
import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, BookOpen, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';

export default function StandBookingModal({ onClose }) {
    const [formData, setFormData] = useState({
        orgName: '',
        contactName: '',
        email: '',
        phone: '',
        standType: 'Premium',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const bookingId = 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const bookingData = {
            ...formData,
            bookingId
        };

        try {
            const { default: api } = await import('@/lib/api');
            await api.createBooking(bookingData);

            setIsSubmitting(false);

            // Redirect to confirmation page
            const params = new URLSearchParams({
                id: bookingId,
                org: formData.orgName,
                type: formData.standType,
                contact: formData.contactName
            });
            window.location.href = `/booking-confirmation?${params.toString()}`;
        } catch (error) {
            console.error("Booking Error:", error);
            alert("Failed to submit booking request. Please try again.");
            setIsSubmitting(false);
        }
    };



    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-midnight-black/95 backdrop-blur-[120px]" onClick={onClose}></div>

            <div
                className="relative bg-midnight-obsidian w-full max-w-md mx-auto rounded-[32px] shadow-[0_0_120px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col animate-fade-in overflow-hidden"
                style={{ maxHeight: '80vh', height: '100%' }}
            >
                <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar scroll-smooth">

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-primary-copper uppercase tracking-[0.4em] mb-1">Corporate Relations</p>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">STAND BOOKING</h3>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <InputField
                                label="ORGANIZATION NAME"
                                icon={<Building2 size={14} />}
                                placeholder="ENTER COMPANY NAME"
                                value={formData.orgName}
                                onChange={(val) => setFormData({ ...formData, orgName: val })}
                            />

                            <InputField
                                label="CONTACT PROTOCOL"
                                icon={<User size={14} />}
                                placeholder="ENTER NAME"
                                value={formData.contactName}
                                onChange={(val) => setFormData({ ...formData, contactName: val })}
                            />

                            <InputField
                                label="OFFICIAL EMAIL"
                                icon={<Mail size={14} />}
                                placeholder="OFFICIAL@ORG.AFRICA"
                                type="email"
                                value={formData.email}
                                onChange={(val) => setFormData({ ...formData, email: val })}
                            />

                            <InputField
                                label="CONTACT LINE"
                                icon={<Phone size={14} />}
                                placeholder="+234 ..."
                                type="tel"
                                value={formData.phone}
                                onChange={(val) => setFormData({ ...formData, phone: val })}
                            />

                            <div className="group">
                                <div className="flex justify-between items-end mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">STAND CLASSIFICATION</span>
                                    <BookOpen size={12} className="text-text-muted group-focus-within:text-primary-copper transition-all" />
                                </div>
                                <select
                                    required
                                    className="w-full h-12 px-6 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-black text-white text-[11px] appearance-none cursor-pointer uppercase tracking-widest"
                                    value={formData.standType}
                                    onChange={(e) => setFormData({ ...formData, standType: e.target.value })}
                                >
                                    <option value="Premium" className="bg-midnight-obsidian">PREMIUM EXHIBITION (8x8)</option>
                                    <option value="Executive" className="bg-midnight-obsidian">EXECUTIVE BOOTH (4x4)</option>
                                    <option value="Standard" className="bg-midnight-obsidian">STANDARD EXHIBITOR (2x2)</option>
                                </select>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-end mb-2 px-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">ADDITIONAL PROTOCOLS</span>
                                    <MessageSquare size={12} className="text-text-muted group-focus-within:text-primary-copper transition-all" />
                                </div>
                                <textarea
                                    className="w-full min-h-[80px] p-5 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-bold text-white placeholder:text-text-muted/10 text-[11px] uppercase tracking-widest shadow-inner resize-none"
                                    placeholder="ANY SPECIFIC REQUIREMENTS..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-full h-14 text-[11px] uppercase tracking-[0.6em] disabled:opacity-50 !p-0 shadow-lg shadow-primary-copper/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>LOGGING REQUEST...</span>
                                </>
                            ) : (
                                'CONFIRM PROTOCOL'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                .text-primary-copper { color: var(--primary-copper); }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

function InputField({ label, icon, placeholder, value, onChange, type = "text" }) {
    return (
        <div className="group">
            <div className="flex justify-between items-end mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted group-focus-within:text-primary-copper transition-all">{label}</span>
                <div className="text-text-muted group-focus-within:text-primary-copper transition-all">
                    {icon}
                </div>
            </div>
            <input
                required
                type={type}
                className="w-full h-12 px-6 rounded-xl bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 outline-none transition-all font-bold text-white placeholder:text-text-muted/10 text-[11px] uppercase tracking-widest shadow-inner"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

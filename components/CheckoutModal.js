"use client";
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, Download } from 'lucide-react';
import api from '@/lib/api';

const ModalState = {
    FORM: 'form',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    ERROR: 'error'
};

export default function RegistrationModal({ isOpen, onClose, ticket, onComplete }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const [state, setState] = useState(ModalState.FORM);
    const [errorMessage, setErrorMessage] = useState('');
    const [createdTicket, setCreatedTicket] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setState(ModalState.FORM);
            setErrorMessage('');
            setCreatedTicket(null);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.phone) {
            return;
        }

        setState(ModalState.PROCESSING);

        try {
            // Updated API call to the instant issuance endpoint
            const response = await fetch('/api/tickets/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ticketType: ticket.name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate ticket');
            }

            setCreatedTicket(data);

            if (data.emailSent === false) {
                setState(ModalState.ERROR);
                setErrorMessage('Your ticket was generated successfully, but we were unable to send it to your email.');
            } else {
                setState(ModalState.SUCCESS);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setState(ModalState.ERROR);
            if (error.message.includes('network')) {
                setErrorMessage('We couldn’t complete your request due to a network issue. Please check your internet connection and try again.');
            } else {
                setErrorMessage(error.message || 'Something went wrong while processing your request.');
            }
        }
    };

    const handleDownload = () => {
        if (!createdTicket?.pdfBase64) return;

        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${createdTicket.pdfBase64}`;
        link.download = `Achievers_Summit_2026_Ticket_${createdTicket.ticketId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-lg bg-midnight-black border border-white/10 rounded-[40px] shadow-[0_0_100px_rgba(210,164,120,0.15)] overflow-hidden">

                {/* Close Button (Only visible in FORM and SUCCESS/ERROR states) */}
                {(state === ModalState.FORM || state === ModalState.SUCCESS || state === ModalState.ERROR) && (
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all z-20"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-10">
                    {state === ModalState.FORM && (
                        <div className="animate-fade-in-up">
                            <div className="text-center mb-10">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[10px] tracking-[0.3em] uppercase mb-4">
                                    {ticket.name} • {ticket.price === 0 ? 'Free' : `₦${ticket.price.toLocaleString()}`}
                                </div>
                                <h2 className="text-3xl font-black italic text-white mb-2">Get Your <span className="text-gradient">Ticket.</span></h2>
                                <p className="text-text-muted text-sm font-light italic">
                                    {ticket.price === 0 ? 'No payment required. Ticket issued instantly.' : 'Complete registration to secure your seat.'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:border-primary-copper/50 outline-none transition-all placeholder:text-white/10"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:border-primary-copper/50 outline-none transition-all placeholder:text-white/10"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:border-primary-copper/50 outline-none transition-all placeholder:text-white/10"
                                        placeholder="+234 ..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={state === ModalState.PROCESSING}
                                    className="btn btn-primary w-full h-16 text-xs font-black tracking-[0.4em] uppercase shadow-2xl shadow-primary-copper/20 flex items-center justify-center gap-3 italic disabled:opacity-50"
                                >
                                    {state === ModalState.PROCESSING ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        'GET MY TICKET'
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {state === ModalState.PROCESSING && (
                        <div className="text-center py-20 animate-fade-in">
                            <div className="relative w-32 h-32 mx-auto mb-10">
                                <div className="absolute inset-0 rounded-full border-2 border-primary-copper/10 animate-ping"></div>
                                <div className="absolute inset-2 rounded-full border-4 border-t-primary-copper border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-primary-copper" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black italic text-white mb-4 uppercase tracking-tighter">Generating Your Ticket</h3>
                            <p className="text-text-muted text-sm font-light leading-relaxed max-w-[280px] mx-auto italic">
                                Please wait while we generate your personalized ticket and send it to your email.
                            </p>
                        </div>
                    )}

                    {state === ModalState.SUCCESS && (
                        <div className="text-center py-10 animate-fade-in">
                            <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-black italic text-white mb-4 uppercase tracking-tighter">Ticket Sent Successfully 🎉</h3>
                            <p className="text-text-muted text-sm font-light leading-relaxed mb-10 italic">
                                Your ticket has been successfully sent to <span className="text-white font-bold">{formData.email}</span>. Please check your inbox (and spam folder if necessary).
                            </p>
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleDownload}
                                    className="btn btn-primary w-full h-14 text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl shadow-primary-copper/30 flex items-center justify-center gap-3 italic"
                                >
                                    <Download size={14} /> DOWNLOAD TICKET
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors"
                                >
                                    BACK TO HOMEPAGE
                                </button>
                            </div>
                        </div>
                    )}

                    {state === ModalState.ERROR && (
                        <div className="text-center py-10 animate-fade-in">
                            <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-10">
                                <AlertCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <h3 className="text-3xl font-black italic text-white mb-4 uppercase tracking-tighter">
                                {errorMessage.includes('unable to send') ? 'Email Delivery Failed' : 'Action Failed'}
                            </h3>
                            <p className="text-text-muted text-sm font-light leading-relaxed mb-10 italic">
                                {errorMessage}
                            </p>

                            <div className="flex flex-col gap-4">
                                {errorMessage.includes('unable to send') ? (
                                    <>
                                        <button onClick={handleDownload} className="btn btn-primary w-full h-14 text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl shadow-primary-copper/30 flex items-center justify-center gap-3 italic">
                                            <Download size={14} /> DOWNLOAD TICKET
                                        </button>
                                        <button onClick={handleSubmit} className="text-primary-copper text-[10px] font-black tracking-[0.3em] uppercase hover:underline transition-colors flex items-center justify-center gap-2">
                                            <Send size={14} /> RETRY EMAIL
                                        </button>
                                        <button onClick={onClose} className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors">CLOSE</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setState(ModalState.FORM)} className="btn btn-primary w-full h-14 text-[10px] font-black tracking-[0.4em] uppercase italic">TRY AGAIN</button>
                                        <button onClick={onClose} className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors">CLOSE</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

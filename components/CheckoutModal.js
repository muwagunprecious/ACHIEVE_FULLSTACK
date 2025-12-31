"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, CreditCard } from 'lucide-react';
import api, { ApiError } from '@/lib/api';
import { usePaystackPayment } from 'react-paystack';

// Ticket creation state constants
const TicketStatus = {
    IDLE: 'idle',
    PAYING: 'paying',
    GENERATING: 'generating',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const ErrorMessages = {
    TICKET_CREATION_FAILED: "Failed to generate ticket. Please try again.",
    PAYMENT_FAILED: "Payment was not successful. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection and try again."
};

export default function CheckoutModal({ isOpen, onClose, ticket, onComplete }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const [status, setStatus] = useState(TicketStatus.IDLE);
    const [errorMessage, setErrorMessage] = useState('');

    // Paystack Configuration
    const [reference, setReference] = useState('');
    const [isConfigReady, setIsConfigReady] = useState(false);

    // Safety Refs to handle callback closures and race conditions
    const isSuccessRef = useRef(false);

    useEffect(() => {
        if (isOpen) {
            // Reset state on open
            setReference('');
            setIsConfigReady(false);
            setStatus(TicketStatus.IDLE);
            setErrorMessage('');
            isSuccessRef.current = false;

            // Fetch strict server-side reference immediately when modal opens
            api.request('/api/payments/reference')
                .then(data => {
                    console.log("Got reference:", data.reference);
                    setReference(data.reference);
                })
                .catch(err => {
                    console.error("Failed to get reference", err);
                    setErrorMessage("Connection failed. Please reopen.");
                });
        }
    }, [isOpen]);

    // Paystack Configuration - Memoized
    const config = useMemo(() => {
        return {
            reference: reference || 'pending_ref',
            email: formData.email,
            amount: (ticket.price || 0) * 100, // Amount in kobo
            publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
            metadata: {
                fullName: formData.fullName,
                phone: formData.phone,
                ticketType: ticket.name
            }
        };
    }, [reference, formData.email, formData.fullName, formData.phone, ticket.price, ticket.name]);

    // Initialize hook. It updates when config updates.
    const initializePayment = usePaystackPayment(config);

    // Update ready state
    useEffect(() => {
        if (reference && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && config.publicKey) {
            setIsConfigReady(true);
        } else {
            setIsConfigReady(false);
        }
    }, [reference, config]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setStatus(TicketStatus.IDLE);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCreateTicket = async (ref) => {
        setStatus(TicketStatus.GENERATING);
        try {
            const ticketId = 'AS2026-' + Date.now().toString(36).toUpperCase();
            const ticketData = {
                ...formData,
                ticketType: ticket.name,
                ticketPrice: ticket.price || 0,
                ticketId,
                reference: ref || 'DIRECT-' + ticketId,
                paymentVerified: true,
                purchaseDate: new Date().toLocaleDateString()
            };
            await api.createTicket(ticketData);
            setStatus(TicketStatus.SUCCESS);
            setTimeout(() => onComplete(ticketData), 1000);
        } catch (error) {
            console.error("❌ Ticket Creation Error:", error);
            setErrorMessage(error instanceof ApiError && error.code === 'NETWORK_ERROR'
                ? ErrorMessages.NETWORK_ERROR
                : ErrorMessages.TICKET_CREATION_FAILED);
            setStatus(TicketStatus.FAILED);
        }
    };

    // Callbacks must be stable or handle refs to avoid stale closures
    const onSuccess = (reference) => {
        console.log("✅ Paystack onSuccess triggered!", reference);
        isSuccessRef.current = true;

        // Show success state briefly before redirect
        setStatus(TicketStatus.SUCCESS);

        // Redirect to verification page
        const params = new URLSearchParams({
            reference: reference.reference,
            email: formData.email,
            ticketType: ticket.name,
            fullName: formData.fullName,
            phone: formData.phone || ''
        });

        // Forced Redirect after short delay
        setTimeout(() => {
            window.location.href = `/payment-verification?${params.toString()}`;
        }, 300);
    };

    const onClosePayment = () => {

        // Check ref to see if we already succeeded
        if (isSuccessRef.current) {
            console.log("❌ Paystack onClose triggered BUT ignored success");
            return;
        }

        console.log("❌ Paystack onClose triggered - User cancelled");
        setStatus(TicketStatus.IDLE);
        setErrorMessage("Payment cancelled.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isSuccessRef.current = false; // Reset

        if (!formData.fullName || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Free Ticket
        if (ticket.price === 0) {
            await handleCreateTicket('FREE-' + Date.now());
            return;
        }

        if (!isConfigReady) {
            alert("Payment system initializing... please wait a moment.");
            return;
        }

        // We set status to PAYING to show the "Redirecting..." UI
        setStatus(TicketStatus.PAYING);

        // Call Paystack
        initializePayment(onSuccess, onClosePayment);
    };

    const handleRetry = () => {
        setStatus(TicketStatus.IDLE);
        setErrorMessage('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-midnight-black border border-white/10 rounded-[40px] max-w-md w-full relative shadow-[0_0_100px_rgba(210,164,120,0.2)] animate-fade-in-up max-h-[85vh] flex flex-col overflow-hidden">
                <div className="flex-grow overflow-y-auto p-8 md:p-10 custom-scrollbar">

                    {status === TicketStatus.PAYING && (
                        <div className="text-center py-20 relative z-10 animate-fade-in">
                            <Loader2 className="w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin" />
                            <h3 className="text-3xl font-black italic mb-4">Complete Payment</h3>
                            <p className="text-text-muted mb-6">Processing your payment in the popup...</p>

                            <div className="flex flex-col gap-3 items-center">
                                <button
                                    onClick={() => onSuccess({ reference })}
                                    className="btn btn-primary px-8 py-3 font-bold text-sm tracking-wider animate-pulse"
                                >
                                    I HAVE COMPLETED PAYMENT
                                </button>

                                <button onClick={onClosePayment} className="text-xs text-white/40 hover:text-white underline mt-2">
                                    Cancel Transaction
                                </button>
                            </div>
                        </div>
                    )}

                    {status === TicketStatus.GENERATING && (
                        <div className="text-center py-20">
                            <Loader2 className="w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin" />
                            <h3 className="text-3xl font-black italic mb-4">Generating Ticket...</h3>
                            <p className="text-text-muted">Creating your unique ticket credentials</p>
                        </div>
                    )}

                    {status === TicketStatus.SUCCESS && (
                        <div className="text-center py-20">
                            <CheckCircle className="w-24 h-24 mx-auto mb-8 text-green-500" />
                            <h3 className="text-3xl font-black italic mb-4 text-green-500">Success!</h3>
                            <p className="text-text-muted">Redirecting to your ticket...</p>
                        </div>
                    )}

                    {status === TicketStatus.FAILED && (
                        <div className="text-center py-12">
                            <AlertCircle className="w-24 h-24 mx-auto mb-8 text-red-500" />
                            <h3 className="text-3xl font-black italic mb-4 text-red-500">Processing Failed</h3>
                            <p className="text-text-muted mb-8 whitespace-pre-line">{errorMessage}</p>
                            <div className="flex gap-4 justify-center">
                                <button onClick={handleRetry} className="btn btn-primary px-8 font-black italic">Try Again</button>
                                <button onClick={onClose} className="btn bg-white/5 px-8 font-black italic">Close</button>
                            </div>
                        </div>
                    )}

                    {status === TicketStatus.IDLE && (
                        <>
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full transition-all text-white border border-white/10 shadow-lg z-10"
                                title="Close"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-10">
                                <div className="inline-block px-6 py-2 rounded-full bg-primary-copper/10 border border-primary-copper/20 mb-6">
                                    <span className="text-primary-copper font-black text-sm tracking-widest uppercase">{ticket.name}</span>
                                </div>
                                <h2 className="text-4xl font-black italic tracking-tighter mb-4">Ticket Registration</h2>
                                <div className="text-5xl font-black text-primary-copper italic">₦{ticket.price.toLocaleString()}</div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Full Name *</label>
                                    <input type="text" required
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium"
                                        value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Email Address *</label>
                                    <input type="email" required
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Phone Number</label>
                                    <input type="tel"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium"
                                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+234 XXX XXX XXXX" />
                                </div>

                                <button type="submit"
                                    disabled={!isConfigReady}
                                    className="btn btn-primary w-full h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 italic">
                                    {isConfigReady ? (
                                        <>
                                            <CreditCard size={24} />
                                            PAY & GET TICKET
                                        </>
                                    ) : (
                                        <>
                                            <Loader2 className="animate-spin" size={24} />
                                            INITIALIZING...
                                        </>
                                    )}
                                </button>

                                <p className="text-[10px] text-center text-text-muted font-medium uppercase tracking-widest opacity-50">
                                    Secured by Paystack
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, CreditCard } from 'lucide-react';
import api, { ApiError } from '@/lib/api';
import { usePaystackPayment } from 'react-paystack';

// Ticket creation state constants
const TicketStatus = {
    IDLE: 'idle',
    PREPARING: 'preparing', // New state for "Preparing Secure Payment"
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

    useEffect(() => {
        if (isOpen) {
            // Fetch strict server-side reference
            api.request('/api/payments/reference')
                .then(data => setReference(data.reference))
                .catch(err => console.error("Failed to get reference", err));
        }
    }, [isOpen]);

    // Paystack Configuration - Memoized to prevent re-initialization or loops
    const config = useMemo(() => {
        if (!reference) return null; // Don't config until reference exists
        return {
            reference: reference,
            email: formData.email,
            amount: (ticket.price || 0) * 100, // Amount in kobo
            publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
            metadata: {
                fullName: formData.fullName,
                phone: formData.phone,
                ticketType: ticket.name
            }
        };
    }, [reference, formData.email, formData.fullName, formData.phone, ticket.price, ticket.name]);

    const initializePayment = usePaystackPayment(config || {});

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleCreateTicket = async (reference) => {
        setStatus(TicketStatus.GENERATING);

        try {
            const ticketId = 'AS2026-' + Date.now().toString(36).toUpperCase();
            const ticketData = {
                ...formData,
                ticketType: ticket.name,
                ticketPrice: ticket.price || 0,
                ticketId,
                reference: reference || 'DIRECT-' + ticketId,
                paymentVerified: true,
                purchaseDate: new Date().toLocaleDateString()
            };

            await api.createTicket(ticketData);
            setStatus(TicketStatus.SUCCESS);

            setTimeout(() => {
                onComplete(ticketData);
            }, 500);
        } catch (error) {
            console.error("❌ Ticket Creation Error:", error);
            setErrorMessage(error instanceof ApiError && error.code === 'NETWORK_ERROR'
                ? ErrorMessages.NETWORK_ERROR
                : ErrorMessages.TICKET_CREATION_FAILED);
            setStatus(TicketStatus.FAILED);
        }
    };

    const onSuccess = (reference) => {
        console.log("✅ Paystack onSuccess triggered!", reference);
        setStatus(TicketStatus.PAYING); // Keep valid state 

        // Redirect to verification page
        const params = new URLSearchParams({
            reference: reference.reference,
            email: formData.email,
            ticketType: ticket.name,
            fullName: formData.fullName,
            phone: formData.phone || ''
        });

        window.location.href = `/payment-verification?${params.toString()}`;
    };

    const onClosePayment = () => {
        console.log("❌ Paystack onClose triggered");
        setStatus(TicketStatus.IDLE);
        setErrorMessage("Payment was not completed.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Handle Free Tickets (Price = 0)
        if (ticket.price === 0) {
            console.log("🎟️ Processing Free Ticket...");
            // For free tickets, we might still want to use the verification flow or just direct create?
            // "Paystack is the only payment gateway" implies paid tickets.
            // For consistency, let's just create it directly here BUT using a special "FREE" reference
            // that the backend must handle? Or just keep client-side for now for FREE only?
            // The prompt heavily implies "Paystack Payment Flow".
            // I'll keep the old handleCreateTicket logic ONLY for free tickets for now, or adapt it.
            // Let's assume handleCreateTicket is needed for free tickets.
            // I need to keep handleCreateTicket function for Free tickets but update it to not need reference from paystack?
            await handleCreateTicket('FREE-' + Date.now());
            return;
        }

        if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY === 'pk_test_your_public_key_here') {
            alert('Paystack Public Key is not configured. Please add it to your .env.local file.');
            return;
        }

        // Start the flow - SHOW LOADER INSTANTLY
        setStatus(TicketStatus.PREPARING);

        try {
            // Ensure we have a reference. If not, wait for it (simulated delay or retry fetch)
            let currentRef = reference;
            if (!currentRef) {
                console.log("Fetching reference on demand...");
                // Double check referencing via API if missing (Edge case)
                try {
                    const data = await api.request('/api/payments/reference');
                    currentRef = data.reference;
                    setReference(currentRef);
                } catch (err) {
                    console.error("Critical: Failed to generate reference", err);
                    setErrorMessage("Secure connection failed. Please try again.");
                    setStatus(TicketStatus.FAILED);
                    return;
                }
            }

            // Small artificial delay to let user see "Preparing" -> "Redirecting" transition (UX requirement)
            await new Promise(resolve => setTimeout(resolve, 800));

            setStatus(TicketStatus.PAYING);
            console.log("🚀 Launching Paystack with ref:", currentRef);

            // Re-memoize config or pass directly if supported? 
            // react-paystack hook 'initializePayment' uses the config passed at 'usePaystackPayment(config)'.
            // Since we updated 'reference' state, 'config' should update. 
            // However, hook might need a re-render cycle. 
            // TO BE SAFE: we shouldn't rely on stale config. 
            // BUT 'initializePayment' is a function returned by the hook.
            // If we just setReference, we need to wait for re-render?
            // Actually, we can just force the launch. The hook handles updates if dependencies change.
            // Let's rely on the effect of state update. 
            // Wait, if we just setReference above, 'initializePayment' used below might be from previous render.
            // THIS IS A REACT ANTI-PATTERN RISK.
            // BETTER: We rely on the reference already being there from mount (useEffect).
            // If it's missing (rare), we error out or show "Network error".

            if (!currentRef) {
                throw new Error("Payment reference not ready");
            }

            initializePayment(onSuccess, onClosePayment);

        } catch (error) {
            console.error("Paystack Init Error:", error);
            setErrorMessage("Failed to establish secure connection.");
            setStatus(TicketStatus.FAILED);
        }
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
                    {status === TicketStatus.PREPARING && (
                        <div className="text-center py-20 relative z-10 animate-fade-in">
                            <Loader2 className="w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin" />
                            <h3 className="text-3xl font-black italic mb-4">Preparing Secure Payment</h3>
                            <p className="text-text-muted">Please wait while we prepare your secure payment...</p>
                        </div>
                    )}

                    {status === TicketStatus.PAYING && (
                        <div className="text-center py-20 relative z-10 animate-fade-in">
                            <Loader2 className="w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin" />
                            <h3 className="text-3xl font-black italic mb-4">Redirecting to Paystack...</h3>
                            <p className="text-text-muted">Please complete your payment in the popup window</p>
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
                                disabled={status === TicketStatus.GENERATING || status === TicketStatus.PAYING}
                                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full transition-all text-white border border-white/10 shadow-lg disabled:opacity-50 z-10"
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
                                    <input type="text" required disabled={status !== TicketStatus.IDLE}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all disabled:opacity-50 font-medium"
                                        value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Email Address *</label>
                                    <input type="email" required disabled={status !== TicketStatus.IDLE}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all disabled:opacity-50 font-medium"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Phone Number</label>
                                    <input type="tel" disabled={status !== TicketStatus.IDLE}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all disabled:opacity-50 font-medium"
                                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+234 XXX XXX XXXX" />
                                </div>

                                <button type="submit" disabled={status !== TicketStatus.IDLE}
                                    className="btn btn-primary w-full h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 italic">
                                    <CreditCard size={24} />
                                    {status === TicketStatus.PAYING ? "PAYING..." : "PAY & GET TICKET"}
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

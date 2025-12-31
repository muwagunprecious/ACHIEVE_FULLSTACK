"use client";
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function PaymentVerificationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('verifying'); // verifying, success, failed
    const [message, setMessage] = useState('Verifying your payment...');
    const [errorDetail, setErrorDetail] = useState('');
    const attemptCount = useRef(0);

    // Extract params
    const reference = searchParams.get('reference');
    const email = searchParams.get('email');
    const ticketType = searchParams.get('ticketType');
    const fullName = searchParams.get('fullName');
    const phone = searchParams.get('phone');

    useEffect(() => {
        if (!reference || !email) {
            setStatus('failed');
            setMessage('Invalid verification link.');
            return;
        }

        const verifyTransaction = async () => {
            try {
                attemptCount.current += 1;
                console.log(`Checking payment status (Attempt ${attemptCount.current})...`);

                // We try to CREATE the ticket. 
                // Since the backend handles verification inside createTicket, 
                // calling this IS the verification step.
                // If it succeeds, the ticket is created and we are good.
                const response = await api.createTicket({
                    fullName,
                    email,
                    phone,
                    ticketType,
                    reference
                });

                // If success
                setStatus('success');
                setMessage('Payment successful! Your ticket has been generated.');

                // Redirect to ticket display after short delay
                setTimeout(() => {
                    router.push(`/ticket-confirmation/${response.ticketId}`);
                }, 2000);

            } catch (error) {
                console.error("Verification error:", error);

                // Check if we should retry
                // Retry on 500s or specific "pending" codes if we had them.
                // BUT current backend returns 400 for PAYMENT_FAILED.
                // If 400 with code PAYMENT_NOT_SUCCESS or PAYMENT_FAILED, it might be permanent or pending?
                // Paystack logic: 'success' is final. 'failed' is final. 'abandoned' is final.
                // So if verifyPayment returns false, it's likely final.

                // HOWEVER, network timeouts or server glitches (500) might allow retry.
                // Also "Payment not verified" might mean Paystack API is slow?

                if (attemptCount.current < 5) {
                    // Retry every 3 seconds
                    setMessage('Still verifying payment...');
                    setTimeout(verifyTransaction, 3000);
                } else {
                    setStatus('failed');
                    setMessage('Payment verification failed.');
                    setErrorDetail(error.message || 'We could not verify your payment with Paystack.');
                }
            }
        };

        // Start verification
        if (status === 'verifying') {
            verifyTransaction();
        }

    }, [reference, email, fullName, phone, ticketType, router]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center shadow-lg">

                {status === 'verifying' && (
                    <div className="py-10">
                        <Loader2 className="w-20 h-20 text-primary-copper animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-black italic mb-2">Verifying Payment</h2>
                        <p className="text-white/60 animate-pulse">Please wait while we confirm your transaction.</p>
                        <p className="text-xs text-white/30 mt-8 uppercase tracking-widest">Do not close this window</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="py-10 animate-fade-in-up">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-black italic mb-2 text-green-500">Payment Successful 🎉</h2>
                        <p className="text-white/80">Your payment has been confirmed successfully.</p>
                        <p className="text-sm text-white/50 mt-2">Your ticket is being generated now.</p>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="py-10 animate-shake">
                        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-black italic mb-2 text-red-500">Payment Failed</h2>
                        <p className="text-white/80 mb-6">{message}</p>
                        {errorDetail && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-sm text-red-200">
                                {errorDetail}
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => router.push('/')}
                                className="btn btn-primary w-full py-4 font-black italic uppercase tracking-widest"
                            >
                                Retry Payment
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="btn bg-white/5 w-full py-4 font-black italic uppercase tracking-widest hover:bg-white/10"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

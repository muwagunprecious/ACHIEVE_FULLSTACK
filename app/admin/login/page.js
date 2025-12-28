"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError('Invalid credentials. Access denied.');
                setIsLoading(false);
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[100px]"></div>
            <div className="motif-bg opacity-[0.03] absolute inset-0"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary-copper/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-copper/20">
                        <Lock className="text-primary-copper" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter mb-2">ADMIN <span className="text-gradient NOT-italic">PORTAL</span></h1>
                    <p className="text-text-muted text-sm font-medium">Secure access for Achievers Summit administrators.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-wide">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 bg-white/5 rounded-xl pl-12 pr-4 text-white placeholder-white/20 outline-none focus:bg-white/10 focus:border-primary-copper/50 border border-white/5 transition-all"
                                        placeholder="admin@achieverssummit.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 bg-white/5 rounded-xl pl-12 pr-4 text-white placeholder-white/20 outline-none focus:bg-white/10 focus:border-primary-copper/50 border border-white/5 transition-all"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full h-14 text-xs flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>AUTHENTICATE</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">Authorized Personnel Only</p>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
                }
            `}</style>
        </div>
    );
}

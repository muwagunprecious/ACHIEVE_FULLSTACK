"use client";
import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulated highly-secure authentication
        // TODO: Replace with actual API call using axios
        setTimeout(() => {
            if (email === 'admin@achievers.africa' && password === 'protocol_achieve_2026') {
                localStorage.setItem('achievers_admin_session', 'active-' + Date.now());
                // Force a hard refresh or router push that ensures layout re-renders
                window.location.href = '/admin/dashboard';
            } else {
                setError('AUTHENTICATION PROTOCOL FAILED. INVALID CREDENTIALS.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-bg-deep flex items-center justify-center p-6">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
                <div className="motif-bg opacity-[0.03]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-20 h-20 bg-primary-copper rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-copper/30 mb-8 transform hover:rotate-[15deg] transition-all duration-700">
                        <Shield size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter mb-3">ADMIN <span className="text-gradient NOT-italic">PORTAL</span></h1>
                    <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">
                        <Sparkles size={12} className="text-primary-copper" />
                        <span>Security Protocol V4.2</span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass-panel p-10 rounded-[40px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-bold text-center uppercase tracking-widest animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="group">
                            <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 ml-1 group-focus-within:text-primary-copper transition-colors">Credential Email</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    required
                                    type="email"
                                    className="w-full h-16 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white font-bold tracking-widest transition-all"
                                    placeholder="admin@achievers.africa"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-4 ml-1 group-focus-within:text-primary-copper transition-colors">Security Key</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    required
                                    type="password"
                                    className="w-full h-16 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white font-bold tracking-widest transition-all"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full h-16 text-[11px] uppercase tracking-[0.6em] group flex items-center justify-center gap-4 !p-0 disabled:opacity-50"
                        >
                            {isLoading ? 'INITIATING...' : 'ACCESS DASHBOARD'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Authorized Access Only. All actions are logged and encrypted.</p>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </main>
    );
}

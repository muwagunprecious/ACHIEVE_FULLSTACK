"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    Bell,
    Search
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem('achievers_admin_session');
        if (!session) {
            router.push('/admin/login');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) return null;

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <header className="h-20 bg-midnight-obsidian/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 mb-8 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 motif-bg opacity-5 pointer-events-none"></div>

                <div className="flex items-center gap-6 relative z-10">
                    <div className="hidden lg:flex flex-col">
                        <h2 className="text-white font-black text-xs italic tracking-widest uppercase">ADMIN <span className="text-primary-copper NOT-italic font-bold">CONSOLE</span></h2>
                        <p className="text-[8px] text-text-muted font-bold tracking-[0.3em] uppercase">Achievers summit 2026</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 hidden lg:block"></div>
                    <div className="relative w-64 group">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors" />
                        <input
                            type="text"
                            placeholder="SECURITY LOGS..."
                            className="w-full h-10 bg-white/5 border border-white/5 focus:border-primary-copper/30 rounded-xl pl-10 pr-6 outline-none text-white text-[9px] font-bold tracking-widest transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <button className="relative text-text-muted hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-copper rounded-full border-2 border-midnight-obsidian"></span>
                    </button>
                    <div className="h-8 w-[1px] bg-white/5"></div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="text-right">
                            <p className="text-white font-black text-[10px] uppercase tracking-widest">Protocol Admin</p>
                            <p className="text-primary-copper font-black text-[8px] uppercase tracking-[0.3em]">Tier 1 Access</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary-copper/50 transition-all">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <div className="flex-grow">
                {children}
            </div>

            <style jsx>{`
                .bg-midnight-black { background-color: var(--midnight-black); }
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
            `}</style>
        </div>
    );
}

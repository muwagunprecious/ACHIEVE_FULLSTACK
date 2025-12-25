"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ isHidden }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Speakers', href: '#speakers' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Tickets', href: '#tickets' },
        { name: 'Find Ticket', href: '#find-ticket' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'} ${isHidden ? 'opacity-0 pointer-events-none translate-y-[-100%]' : 'opacity-100'}`}>
            <div
                className={`container mx-auto flex items-center justify-between transition-all duration-700 ${isScrolled
                    ? 'glass-panel py-3 px-8 shadow-2xl'
                    : 'bg-transparent py-2 px-4'
                    }`}
            >
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-primary-copper rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-primary-copper/20">
                        <span className="text-white font-black text-2xl italic">A</span>
                    </div>
                    <div className="text-xl font-black tracking-tighter">
                        <span className="text-white">ACHIEVERS</span>
                        <span className="text-primary-copper ml-1 uppercase">SUMMIT</span>
                        <span className="text-primary-copper">.</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-black text-white/60 hover:text-white transition-all duration-300 tracking-[0.2em] uppercase relative group/link"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-copper transition-all duration-300 group-hover/link:w-full"></span>
                        </a>
                    ))}
                    <a href="#tickets" className="btn btn-primary !py-3 !px-8 !text-[11px]">
                        Register Now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 z-[-1] transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-midnight-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 p-8">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-3xl font-black text-white hover:text-primary-copper transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#tickets" className="btn btn-primary w-full max-w-xs mt-4" onClick={() => setIsMenuOpen(false)}>
                        Secure Your Pass
                    </a>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .bg-primary-copper { background-color: var(--primary-copper); }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </nav>
    );
}

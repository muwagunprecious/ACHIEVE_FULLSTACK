"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash, Mic, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function SpeakersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const speakers = [
        { id: 1, name: "Dr. Alistair Cook", topic: "The Future of AI in Africa", role: "Keynote Speaker", image: "" },
        { id: 2, name: "Maya Angelou", topic: "Poetry and Leadership", role: "Panelist", image: "" },
        { id: 3, name: "Elon Musk", topic: "Space Exploration", role: "Keynote Speaker", image: "" },
    ];

    const filteredSpeakers = speakers.filter(speaker =>
        speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        speaker.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">MANAGE <span className="text-gradient NOT-italic">SPEAKERS</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Curate the lineup of speakers for the summit.</p>
                </div>
                <Link href="/admin/dashboard/speakers/add" className="btn btn-primary flex items-center gap-2 group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span>ADD SPEAKER</span>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search speakers..."
                        className="w-full h-12 bg-white/5 rounded-xl pl-12 pr-4 outline-none text-white focus:bg-white/10 transition-colors border border-transparent focus:border-primary-copper/30"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpeakers.map((speaker) => (
                    <div key={speaker.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-copper/5 rounded-bl-[100px] -mr-4 -mt-4 transition-all group-hover:bg-primary-copper/10"></div>

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-text-muted overflow-hidden">
                                {speaker.image ? <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" /> : <Mic size={24} />}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-text-muted hover:text-white transition-colors">
                                    <Edit size={14} />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 text-text-muted hover:text-red-500 transition-colors">
                                    <Trash size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                            <p className="text-xs text-primary-copper font-bold uppercase tracking-wider mb-2">{speaker.role}</p>
                            <p className="text-sm text-text-muted line-clamp-2">{speaker.topic}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-4 text-text-muted">
                            <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
                            <Linkedin size={16} className="hover:text-white cursor-pointer transition-colors" />
                            <Facebook size={16} className="hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                ))}

                {/* Add New Card (Empty State) */}
                <Link href="/admin/dashboard/speakers/add" className="border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 text-text-muted hover:border-primary-copper/50 hover:text-primary-copper transition-all cursor-pointer min-h-[250px]">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add New Speaker</span>
                </Link>
            </div>
        </div>
    );
}

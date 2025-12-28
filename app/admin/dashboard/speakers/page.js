import React from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash, Mic, Twitter, Linkedin, Facebook } from 'lucide-react';
import prisma from "@/lib/prisma";
import { deleteSpeaker } from "./actions";

export const dynamic = 'force-dynamic';

async function getSpeakers() {
    try {
        // Workaround for Prisma Client generate failure
        return await prisma.$queryRawUnsafe(
            `SELECT * FROM "Speaker" ORDER BY "createdAt" DESC`
        );
    } catch (error) {
        console.error("Failed to fetch speakers (Raw SQL):", error);
        return [];
    }
}

export default async function SpeakersPage() {
    const speakers = await getSpeakers();

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

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map((speaker) => (
                    <div key={speaker.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-copper/5 rounded-bl-[100px] -mr-4 -mt-4 transition-all group-hover:bg-primary-copper/10"></div>

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-text-muted overflow-hidden">
                                {speaker.image ? <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" /> : <Mic size={24} />}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/dashboard/speakers/edit/${speaker.id}`} className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-text-muted hover:text-white transition-colors">
                                    <Edit size={14} />
                                </Link>
                                <form action={deleteSpeaker.bind(null, speaker.id)}>
                                    <button type="submit" className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 text-text-muted hover:text-red-500 transition-colors">
                                        <Trash size={14} />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                            <p className="text-xs text-primary-copper font-bold uppercase tracking-wider mb-2">{speaker.title}</p>
                            <p className="text-sm text-text-muted line-clamp-2">{speaker.topic}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-4 text-text-muted">
                            {speaker.twitter && <Link href={speaker.twitter} target="_blank"><Twitter size={16} className="hover:text-white cursor-pointer transition-colors" /></Link>}
                            {speaker.linkedin && <Link href={speaker.linkedin} target="_blank"><Linkedin size={16} className="hover:text-white cursor-pointer transition-colors" /></Link>}
                            {speaker.facebook && <Link href={speaker.facebook} target="_blank"><Facebook size={16} className="hover:text-white cursor-pointer transition-colors" /></Link>}
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

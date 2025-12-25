"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, User, Mic, Monitor, Linkedin, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddSpeakerPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        topic: '',
        image: '',
        linkedin: '',
        twitter: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API Call
        setTimeout(() => {
            router.push('/admin/dashboard/speakers');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/speakers" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <ArrowLeft size={20} className="text-white" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter">ADD <span className="text-gradient NOT-italic">SPEAKER</span></h1>
                    <p className="text-sm text-text-muted font-medium">Add a distinguished speaker to the event.</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Speaker Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <User size={18} />
                                </div>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. Dr. Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Professional Title</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Award size={18} className="transform scale-75" /> {/* Using Award as icon mock */}
                                </div>
                                <input
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. CEO, TechCorp"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Topic / Session</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Monitor size={18} />
                                </div>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. AI in Finance"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Profile Image URL</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Upload size={18} />
                                </div>
                                <input
                                    type="url"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio & Socials */}
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Short Bio</label>
                            <div className="relative">
                                <div className="absolute left-4 top-6 text-text-muted">
                                    <Mic size={18} />
                                </div>
                                <textarea
                                    required
                                    className="w-full h-32 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 py-4 outline-none text-white transition-all resize-none"
                                    placeholder="Brief introduction..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">LinkedIn</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        <Linkedin size={18} />
                                    </div>
                                    <input
                                        type="url"
                                        className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                        placeholder="Profile URL"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Twitter/X</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        <Twitter size={18} />
                                    </div>
                                    <input
                                        type="url"
                                        className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                        placeholder="Profile URL"
                                        value={formData.twitter}
                                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary px-8 py-3 flex items-center gap-2 rounded-xl"
                    >
                        {isLoading ? 'SAVING...' : (
                            <>
                                <Save size={18} />
                                <span>SAVE SPEAKER</span>
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}

// Helper component for Award icon since it's used inside
function Award({ size, className }) {
    return <Mic size={size} className={className} />; // Fallback or import actual Award from lucide if needed
}

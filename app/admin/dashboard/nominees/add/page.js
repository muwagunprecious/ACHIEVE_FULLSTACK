"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, User, Award, List } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddNomineePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        photo: '',
        achievements: ''
    });

    const categories = [
        "Tech Innovator",
        "Business Leader",
        "Creative Arts",
        "Social Impact",
        "Young Achiever",
        "Lifetime Achievement"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API Call
        setTimeout(() => {
            alert('Nominee Added Successfully!');
            router.push('/admin/dashboard/nominees');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/nominees" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <ArrowLeft size={20} className="text-white" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter">ADD NEW <span className="text-gradient NOT-italic">NOMINEE</span></h1>
                    <p className="text-sm text-text-muted font-medium">Enter the details of the candidate below.</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <User size={18} />
                                </div>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Category</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <List size={18} />
                                </div>
                                <select
                                    required
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all appearance-none cursor-pointer"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="" disabled>Select a Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-black">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Photo URL</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Upload size={18} />
                                </div>
                                <input
                                    type="url"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="https://..."
                                    value={formData.photo}
                                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-6">
                        <div className="group h-full flex flex-col">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Achievements / Bio</label>
                            <div className="relative flex-1">
                                <div className="absolute left-4 top-6 text-text-muted">
                                    <Award size={18} />
                                </div>
                                <textarea
                                    required
                                    className="w-full h-full min-h-[200px] bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 py-4 outline-none text-white transition-all resize-none"
                                    placeholder="Describe why this person is nominated..."
                                    value={formData.achievements}
                                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                ></textarea>
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
                                <span>SAVE NOMINEE</span>
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}

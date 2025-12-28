"use client";
import React, { useState, useTransition, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, User, Mic, Monitor, Linkedin, Twitter, AlertCircle, Image as ImageIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addSpeaker } from '../actions';

export default function AddSpeakerPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.includes('image/')) {
                setError("Please select an image file.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await addSpeaker(formData);
            if (result.success) {
                router.push('/admin/dashboard/speakers');
            } else {
                setError(result.error || "Failed to add speaker");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
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

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                    <AlertCircle size={18} />
                    <p>{error}</p>
                </div>
            )}

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
                                    name="name"
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. Dr. Jane Doe"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Professional Title</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Mic size={18} className="transform scale-75" />
                                </div>
                                <input
                                    name="title"
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. CEO, TechCorp"
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
                                    name="topic"
                                    type="text"
                                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                    placeholder="e.g. AI in Finance"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 ml-1">Speaker Portrait (PNG/JPG)</label>
                            <div className="relative">
                                {!preview ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-32 bg-white/5 border-2 border-dashed border-white/10 hover:border-primary-copper/50 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group-hover:bg-white/10"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                                            <Upload size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Choose Image File</span>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removePreview}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 rounded-lg text-white transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
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
                                    name="bio"
                                    className="w-full h-32 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 py-4 outline-none text-white transition-all resize-none"
                                    placeholder="Brief introduction..."
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
                                        name="linkedin"
                                        type="url"
                                        className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                        placeholder="Profile URL"
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
                                        name="twitter"
                                        type="url"
                                        className="w-full h-12 bg-white/5 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-12 pr-4 outline-none text-white transition-all"
                                        placeholder="Profile URL"
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
                        disabled={isPending}
                        className="btn btn-primary px-8 py-3 flex items-center gap-2 rounded-xl disabled:opacity-50"
                    >
                        {isPending ? 'SAVING...' : (
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

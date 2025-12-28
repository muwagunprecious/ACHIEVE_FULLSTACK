"use client";
import React, { useState } from 'react';
import { X, Plus, AlertCircle, Trash2 } from 'lucide-react';
import { addTicketCategory } from '@/app/admin/dashboard/tickets/actions';

export default function AddTicketModal({ onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [features, setFeatures] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);
    const formRef = React.useRef(null);

    const markChanged = () => !hasChanges && setHasChanges(true);

    const addFeature = () => {
        setFeatures([...features, ""]);
        markChanged();
    };
    const removeFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
        markChanged();
    };
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
        markChanged();
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(formRef.current);
        // Add features to formData
        features.forEach(f => {
            if (f.trim()) formData.append("features", f);
        });

        try {
            const result = await addTicketCategory(formData);
            if (result.success) {
                setHasChanges(false);
                onClose();
            } else {
                setError(result.error || "Failed to add category");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Lock body scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-7xl rounded-[32px] border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[75vh] flex flex-col relative">

                {/* Unsaved Changes Popup */}
                {hasChanges && !isLoading && (
                    <div className="absolute inset-x-0 top-0 z-[110] p-4 animate-in slide-in-from-top duration-300">
                        <div className="bg-primary-copper rounded-2xl p-4 shadow-2xl flex flex-col gap-3 border border-white/20">
                            <div className="flex items-center gap-2 text-white">
                                <AlertCircle size={20} />
                                <p className="font-bold text-sm italic">You have unsaved changes!</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSubmit()}
                                    className="flex-1 h-10 bg-white text-primary-copper rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all"
                                >
                                    Save Category
                                </button>
                                <button
                                    onClick={() => setHasChanges(false)}
                                    className="flex-1 h-10 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all font-sans"
                                >
                                    Continue Editing
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 h-10 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all font-sans"
                                >
                                    Close Form
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5 shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-white italic tracking-tighter">ADD <span className="text-gradient NOT-italic">CATEGORY</span></h2>
                        <p className="text-xs text-text-muted font-medium mt-1 uppercase tracking-widest">Create a new ticket type</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full transition-all text-white border border-white/10 shadow-lg"
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    onChange={markChanged}
                    className="flex flex-col flex-grow overflow-hidden text-white"
                >
                    <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2 px-1">Category Name</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 text-white outline-none focus:border-primary-copper/30 transition-all font-medium"
                                    placeholder="e.g. VIP Access"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2 px-1">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full h-24 bg-white/5 rounded-2xl border border-white/5 p-4 text-white outline-none focus:border-primary-copper/30 transition-all font-medium resize-none shadow-inner"
                                    placeholder="What's included in this ticket?"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Price */}
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2 px-1">Price (₦)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 text-white outline-none focus:border-primary-copper/30 transition-all font-medium"
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Capacity */}
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-2 px-1">Capacity</label>
                                    <input
                                        name="capacity"
                                        type="number"
                                        required
                                        className="w-full h-14 bg-white/5 rounded-2xl border border-white/5 px-6 text-white outline-none focus:border-primary-copper/30 transition-all font-medium"
                                        placeholder="100"
                                    />
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Features / Benefits</label>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="text-[10px] font-black text-primary-copper uppercase tracking-widest hover:underline"
                                    >
                                        + Add Feature
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex gap-2 animate-in slide-in-from-left duration-200">
                                            <input
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5 px-4 text-white text-sm outline-none focus:border-primary-copper/30 transition-all"
                                                placeholder="e.g. Complimentary Lunch"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="p-3 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {features.length === 0 && (
                                        <p className="text-[10px] text-text-muted italic px-1">Click "+ Add Feature" to list ticket benefits.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="p-6 border-t border-white/5 bg-white/5 shrink-0 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-14 rounded-2xl border border-white/5 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-3 h-14 bg-primary-copper rounded-2xl text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-copper/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            <Plus size={18} className={isLoading ? "animate-pulse" : ""} />
                            <span>{isLoading ? "CREATING..." : "CREATE CATEGORY"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

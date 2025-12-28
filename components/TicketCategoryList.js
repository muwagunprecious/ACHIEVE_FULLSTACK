"use client";
import React, { useState } from 'react';
import { Power, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { toggleTicketCategoryStatus, deleteTicketCategory } from '@/app/admin/dashboard/tickets/actions';
import EditTicketModal from '@/components/EditTicketModal';
import AddTicketModal from '@/components/AddTicketModal';

export default function TicketCategoryList({ categories }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category? This cannot be undone.")) return;

        setError("");
        const result = await deleteTicketCategory(id);
        if (!result.success) {
            setError(result.error);
            // Clear error after 5 seconds
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-in slide-in-from-top duration-300">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className={`glass-panel p-6 rounded-2xl border ${cat.isEnabled ? 'border-primary-copper/30' : 'border-red-500/30'} relative overflow-hidden group transition-all`}>
                        <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] opacity-20 ${cat.isEnabled ? 'bg-primary-copper' : 'bg-red-500'}`}></div>

                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div className="max-w-[150px]">
                                <h3 className="text-xl font-bold text-white line-clamp-1">{cat.name}</h3>
                                <p className="text-primary-copper font-black text-lg">₦{cat.price.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingCategory(cat)}
                                    className="p-2 rounded-xl bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                    title="Edit Category"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-2 rounded-xl bg-white/5 text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    title="Delete Category"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <form action={toggleTicketCategoryStatus}>
                                    <input type="hidden" name="id" value={cat.id} />
                                    <input type="hidden" name="currentState" value={cat.isEnabled} />
                                    <button
                                        type="submit"
                                        className={`p-2 rounded-xl transition-colors ${cat.isEnabled ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
                                        title={cat.isEnabled ? "Close Ticket" : "Open Ticket"}
                                    >
                                        <Power size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative z-10 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-muted">Status</span>
                                <span className={`font-bold ${cat.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}>{cat.status}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-muted">Sold</span>
                                <span className="text-white font-bold">{cat._count.tickets} / {cat.capacity}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-primary-copper"
                                    style={{ width: `${Math.min((cat._count.tickets / cat.capacity) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <button
                    onClick={() => setIsAdding(true)}
                    className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-text-muted hover:border-primary-copper/50 hover:text-primary-copper transition-all cursor-pointer min-h-[160px] group bg-white/[0.02]"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add New Category</span>
                </button>
            </div>

            {editingCategory && (
                <EditTicketModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                />
            )}

            {isAdding && (
                <AddTicketModal
                    onClose={() => setIsAdding(false)}
                />
            )}
        </div>
    );
}

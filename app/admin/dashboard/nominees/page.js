"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, MoreVertical, Edit, Trash, CheckCircle, XCircle, Filter } from 'lucide-react';

export default function NomineesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');

    // Mock Data
    const nominees = [
        { id: 1, name: "Sarah Johnson", category: "Tech Innovator", status: "APPROVED", votes: 1240 },
        { id: 2, name: "Michael Chen", category: "Business Leader", status: "PENDING", votes: 0 },
        { id: 3, name: "Jessica Williams", category: "Creative Arts", status: "REJECTED", votes: 0 },
        { id: 4, name: "David Miller", category: "Tech Innovator", status: "APPROVED", votes: 856 },
        { id: 5, name: "Grace Lee", category: "Social Impact", status: "APPROVED", votes: 2103 },
    ];

    const filteredNominees = nominees.filter(nominee => {
        const matchesSearch = nominee.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'ALL' || nominee.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">MANAGE <span className="text-gradient NOT-italic">NOMINEES</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Review, approve, and manage all award nominees.</p>
                </div>
                <Link href="/admin/dashboard/nominees/add" className="btn btn-primary flex items-center gap-2 group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span>ADD NOMINEE</span>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search nominees..."
                        className="w-full h-12 bg-white/5 rounded-xl pl-12 pr-4 outline-none text-white focus:bg-white/10 transition-colors border border-transparent focus:border-primary-copper/30"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-text-muted" />
                    <select
                        className="h-12 bg-white/5 rounded-xl px-4 outline-none text-white focus:bg-white/10 transition-colors border border-transparent focus:border-primary-copper/30 cursor-pointer"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Nominee Name</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Total Votes</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNominees.map((nominee) => (
                                <tr key={nominee.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-bold text-white">{nominee.name}</div>
                                    </td>
                                    <td className="p-4 text-text-muted">{nominee.category}</td>
                                    <td className="p-4">
                                        <span className="font-mono text-primary-copper font-bold">{nominee.votes.toLocaleString()}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${nominee.status === 'APPROVED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                nominee.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {nominee.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            {nominee.status === 'PENDING' && (
                                                <button className="p-2 hover:bg-green-500/20 rounded-lg text-green-500" title="Approve">
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-500" title="Delete">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredNominees.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        <p>No nominees found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

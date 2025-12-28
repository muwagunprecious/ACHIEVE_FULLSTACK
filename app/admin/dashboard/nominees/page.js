import React from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash, CheckCircle, Ticket, User, Filter, XCircle } from 'lucide-react';
import prisma from '@/lib/prisma';
import { approveNomination, rejectNomination, deleteNomination } from './actions';

export const dynamic = 'force-dynamic';

async function getNominations() {
    try {
        const nominations = await prisma.nomination.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return nominations;
    } catch (error) {
        console.error("error fetching nominations", error);
        return [];
    }
}

export default async function NomineesPage({ searchParams }) {
    const nominations = await getNominations();
    const resolvedSearchParams = await searchParams;
    const searchTerm = resolvedSearchParams?.q || '';
    const filterStatus = resolvedSearchParams?.status || 'ALL';

    const filteredNominations = nominations.filter(nom => {
        const matchesSearch = nom.nomineeName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'ALL' || nom.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">MANAGE <span className="text-gradient NOT-italic">NOMINATIONS</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Review, approve, and manage all award nominations.</p>
                </div>
                {/* 
                <Link href="/admin/dashboard/nominees/add" className="btn btn-primary flex items-center gap-2 group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span>ADD NOMINEE</span>
                </Link>
                */}
            </div>

            {/* List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-white">All Submissions</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-muted">STATUS:</span>
                        <div className="flex gap-1">
                            <Link href="/admin/dashboard/nominees" className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${filterStatus === 'ALL' ? 'bg-white/10 text-white' : 'text-text-muted'}`}>All</Link>
                            <Link href="/admin/dashboard/nominees?status=PENDING" className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${filterStatus === 'PENDING' ? 'bg-amber-500/20 text-amber-500' : 'text-text-muted'}`}>Pending</Link>
                            <Link href="/admin/dashboard/nominees?status=APPROVED" className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${filterStatus === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 'text-text-muted'}`}>Approved</Link>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Nominee</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Nominator</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNominations.length > 0 ? filteredNominations.map((nom) => (
                                <tr key={nom.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="font-bold text-white text-sm">{nom.nomineeName}</div>
                                        <div className="text-[10px] text-text-muted">{nom.nomineeEmail}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-white">
                                            {nom.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-white text-xs">{nom.nominatorName}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${nom.status === 'APPROVED' ? 'text-green-500 bg-green-500/10' :
                                            nom.status === 'PENDING' ? 'text-amber-500 bg-amber-500/10' :
                                                'text-red-500 bg-red-500/10'
                                            }`}>
                                            {nom.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {nom.status === 'PENDING' && (
                                                <>
                                                    <form action={approveNomination.bind(null, nom.id)}>
                                                        <button type="submit" className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-500 transition-colors" title="Approve">
                                                            <CheckCircle size={16} />
                                                        </button>
                                                    </form>
                                                    <form action={rejectNomination.bind(null, nom.id)}>
                                                        <button type="submit" className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors" title="Reject">
                                                            <XCircle size={16} />
                                                        </button>
                                                    </form>
                                                </>
                                            )}
                                            <form action={deleteNomination.bind(null, nom.id)}>
                                                <button type="submit" className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors" title="Delete">
                                                    <Trash size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-text-muted text-sm">No nominations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

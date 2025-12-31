"use client";
import { useState, useEffect } from 'react';
import { Mail, Phone, Building2, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function PartnershipsPage() {
    const [partnerships, setPartnerships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

    useEffect(() => {
        fetchPartnerships();
    }, []);

    const fetchPartnerships = async () => {
        try {
            const response = await fetch('/api/admin/partnerships');
            const data = await response.json();
            setPartnerships(data.partnerships || []);
        } catch (error) {
            console.error('Error fetching partnerships:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/admin/partnerships/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Update local state
                setPartnerships(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while updating status');
        }
    };

    const filteredPartnerships = partnerships.filter(p =>
        filter === 'all' ? true : p.status === filter
    );

    const getStatusBadge = (status) => {
        const badges = {
            'Pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            'Approved': 'bg-green-500/10 text-green-400 border-green-500/20',
            'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        return badges[status] || badges['Pending'];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-copper"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-black italic text-white mb-2">
                    Partnership <span className="text-gradient">Requests</span>
                </h1>
                <p className="text-text-muted">Manage and review partnership submissions</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {['all', 'Pending', 'Approved', 'Rejected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status === 'all' ? 'all' : status)}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${filter === (status === 'all' ? 'all' : status)
                            ? 'bg-primary-copper text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        {status} {status === 'all' ? `(${partnerships.length})` : `(${partnerships.filter(p => p.status === status).length})`}
                    </button>
                ))}
            </div>

            {/* Partnerships Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredPartnerships.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-text-muted">No partnership requests found</p>
                    </div>
                ) : (
                    filteredPartnerships.map((partnership) => (
                        <div
                            key={partnership.id}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary-copper/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{partnership.companyName}</h3>
                                    <p className="text-sm text-text-muted">{partnership.contactPerson}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${getStatusBadge(partnership.status)}`}>
                                    {partnership.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail size={16} className="text-primary-copper" />
                                    <span className="text-white/80">{partnership.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone size={16} className="text-primary-copper" />
                                    <span className="text-white/80">{partnership.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Building2 size={16} className="text-primary-copper" />
                                    <span className="text-white/80">{partnership.partnershipType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={16} className="text-primary-copper" />
                                    <span className="text-white/80">{new Date(partnership.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-2 mb-2">
                                    <FileText size={16} className="text-primary-copper mt-1" />
                                    <span className="text-xs font-black uppercase tracking-wider text-white/60">Message</span>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed">{partnership.message}</p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => handleStatusUpdate(partnership.id, 'Approved')}
                                    disabled={partnership.status === 'Approved'}
                                    className={`flex-1 h-12 rounded-xl border flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all ${partnership.status === 'Approved'
                                        ? 'bg-green-500/10 border-green-500/20 text-green-500/50 cursor-not-allowed'
                                        : 'bg-green-500/5 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                                        }`}
                                >
                                    <CheckCircle size={16} /> Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(partnership.id, 'Rejected')}
                                    disabled={partnership.status === 'Rejected'}
                                    className={`flex-1 h-12 rounded-xl border flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all ${partnership.status === 'Rejected'
                                        ? 'bg-red-500/10 border-red-500/20 text-red-500/50 cursor-not-allowed'
                                        : 'bg-red-500/5 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                        }`}
                                >
                                    <XCircle size={16} /> Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </div>
    );
}

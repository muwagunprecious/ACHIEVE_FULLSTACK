"use client";
import React, { useState } from 'react';
import { Settings, Bell, ToggleLeft, ToggleRight, Send, AlertCircle, Save } from 'lucide-react';

export default function SettingsPage() {
    const [systemStatus, setSystemStatus] = useState({
        votingLive: true,
        nominationsOpen: false,
        ticketSales: true,
        maintenanceMode: false
    });

    const [announcement, setAnnouncement] = useState('');
    const [isSending, setIsSending] = useState(false);

    const toggleStatus = (key) => {
        setSystemStatus(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSendAnnouncement = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch('/api/popups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'Admin Announcement',
                    body: announcement,
                    targetPage: 'all',
                    duration: 8000
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send announcement');
            }

            alert('Announcement broadcasted to all users!');
            setAnnouncement('');
        } catch (error) {
            console.error('Error sending announcement:', error);
            alert('Failed to send announcement. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-copper/10 rounded-xl flex items-center justify-center text-primary-copper">
                    <Settings size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">SYSTEM <span className="text-gradient NOT-italic">CONTROLS</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Manage global configurations and communication.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Toggles */}
                <div className="glass-panel p-8 rounded-[32px] border border-white/5 space-y-8">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5 pb-4 mb-6">Global Switches</h3>

                    {[
                        { key: 'votingLive', label: 'Voting System', desc: 'Allow users to cast votes publicly.' },
                        { key: 'nominationsOpen', label: 'Nomination Submissions', desc: 'Accept new nomination entries.' },
                        { key: 'ticketSales', label: 'Ticket Sales', desc: 'Process new ticket purchases.' },
                        { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to all non-admins.', danger: true },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between group">
                            <div>
                                <h4 className={`text-lg font-bold ${item.danger ? 'text-red-500' : 'text-white'}`}>{item.label}</h4>
                                <p className="text-xs text-text-muted">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => toggleStatus(item.key)}
                                className={`transition-all duration-300 ${systemStatus[item.key] ? 'text-green-500' : 'text-text-muted hover:text-white'}`}
                            >
                                {systemStatus[item.key] ? <ToggleRight size={48} /> : <ToggleLeft size={48} />}
                            </button>
                        </div>
                    ))}

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-2">
                            <AlertCircle size={12} />
                            Changes take effect immediately across the platform.
                        </p>
                    </div>
                </div>

                {/* Announcements */}
                <div className="glass-panel p-8 rounded-[32px] border border-white/5 flex flex-col">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5 pb-4 mb-6 flex items-center gap-2">
                        <Bell size={14} /> Global Announcements
                    </h3>

                    <form onSubmit={handleSendAnnouncement} className="flex-1 flex flex-col gap-4">
                        <div className="bg-white/5 rounded-xl p-4 flex-1">
                            <textarea
                                required
                                className="w-full h-full bg-transparent outline-none text-white resize-none placeholder:text-text-muted/50"
                                placeholder="Type your message here... (e.g. 'Voting closes in 2 hours!')"
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Broadcast Activity</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-bold tracking-wider disabled:opacity-50"
                            >
                                {isSending ? 'SENDING...' : (
                                    <>
                                        BROADCAST <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, Edit } from 'lucide-react';

const ActivityItem = ({ title, description, time, type }) => {
    let Icon = Clock;
    let color = 'text-primary-copper';

    if (type === 'success') { Icon = CheckCircle2; color = 'text-green-500'; }
    if (type === 'error') { Icon = XCircle; color = 'text-red-500'; }
    if (type === 'warning') { Icon = AlertCircle; color = 'text-amber-500'; }
    if (type === 'edit') { Icon = Edit; color = 'text-blue-500'; }

    return (
        <div className="flex gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-xl">
            <div className={`mt-1 ${color}`}>
                <Icon size={16} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-text-muted mb-2">{description}</p>
                <div className="flex items-center gap-2 text-[10px] text-text-muted/60 uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
};

const ActivityLog = () => {
    // Mock Data
    const activities = [
        { title: 'New Nomination', description: 'Sarah Johnson nominated for "Tech Innovator of the Year"', time: '2 mins ago', type: 'success' },
        { title: 'Ticket Scanned', description: 'Ticket #TK-88392 verified at Main Entrance', time: '15 mins ago', type: 'success' },
        { title: 'Login Attempt', description: 'Failed login attempt detected from IP 192.168.1.1', time: '1 hour ago', type: 'error' },
        { title: 'System Update', description: 'Voting system toggle set to "ACTIVE"', time: '3 hours ago', type: 'warning' },
        { title: 'Nominee Detail Edited', description: 'Updated bio for "David Miller"', time: '5 hours ago', type: 'edit' },
    ];

    return (
        <div className="glass-panel rounded-3xl p-6 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">System Activity</h3>
                <button className="text-[10px] text-primary-copper font-bold uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="space-y-1">
                {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;

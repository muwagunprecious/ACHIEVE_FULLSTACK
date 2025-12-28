import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, Edit } from 'lucide-react';

function formatRelativeTime(date) {
    if (!date) return 'Some time ago';
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

const ActivityItem = ({ title, description, createdAt, type }) => {
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
                    <span>{formatRelativeTime(createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

const ActivityLog = ({ activities = [] }) => {
    return (
        <div className="glass-panel rounded-3xl p-6 border border-white/5 h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">System Activity</h3>
                <button className="text-[10px] text-primary-copper font-bold uppercase tracking-widest hover:underline whitespace-nowrap">View All</button>
            </div>
            <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <ActivityItem key={activity.id || activity.createdAt} {...activity} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-text-muted italic text-sm">
                        No activity recorded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;

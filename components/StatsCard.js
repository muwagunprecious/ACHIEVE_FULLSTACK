import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "bg-primary-copper" }) => {
    return (
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-all duration-300 border border-white/5">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity ${color}`}></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}/10 text-${color.replace('bg-', '')}`}>
                    <Icon size={24} className="text-primary-copper" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {trendValue}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
                <p className="text-3xl font-black text-white">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;

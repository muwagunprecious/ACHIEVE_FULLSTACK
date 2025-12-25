"use client";
import React from 'react';
import StatsCard from '@/components/StatsCard';
import ActivityLog from '@/components/ActivityLog';
import { Users, Ticket, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
    // Mock Data for Charts
    const data = [
        { name: "Mon", votes: 400 },
        { name: "Tue", votes: 300 },
        { name: "Wed", votes: 200 },
        { name: "Thu", votes: 278 },
        { name: "Fri", votes: 189 },
        { name: "Sat", votes: 239 },
        { name: "Sun", votes: 349 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter">DASHBOARD <span className="text-gradient NOT-italic">OVERVIEW</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-2">Welcome back to the command center.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Live</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value="$124,500"
                    icon={DollarSign}
                    trend="up"
                    trendValue="+12.5%"
                    color="bg-primary-copper"
                />
                <StatsCard
                    title="Tickets Sold"
                    value="1,240"
                    icon={Ticket}
                    trend="up"
                    trendValue="+8.2%"
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Total Votes"
                    value="45,231"
                    icon={BarChart3}
                    trend="up"
                    trendValue="+24.3%"
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Nominees"
                    value="156"
                    icon={Users}
                    trend="down"
                    trendValue="-2"
                    color="bg-orange-500"
                />
            </div>

            {/* Middle Section: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                {/* Voting Trends Chart */}
                <div className="lg:col-span-2 glass-panel rounded-3xl p-8 border border-white/5 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">Voting Trends (Last 7 Days)</h3>
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary-copper"></span>
                            <span className="text-[10px] text-text-muted">Votes Cast</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar
                                    dataKey="votes"
                                    fill="#D2A478"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="lg:col-span-1 h-full min-h-0">
                    <ActivityLog />
                </div>
            </div>
        </div>
    );
}

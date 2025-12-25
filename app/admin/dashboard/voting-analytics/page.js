"use client";
import React from 'react';
import StatsCard from '@/components/StatsCard';
import { BarChart3, PieChart as PieChartIcon, Users, Globe, Download, TrendingUp } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

export default function VotingAnalyticsPage() {

    const categoryData = [
        { name: 'Tech Innovator', votes: 4500 },
        { name: 'Business Leader', votes: 3200 },
        { name: 'Creative Arts', votes: 2100 },
        { name: 'Social Impact', votes: 1800 },
        { name: 'Young Achiever', votes: 5600 },
    ];

    const colors = ['#D2A478', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    const hourlyData = [
        { time: '08:00', votes: 120 },
        { time: '10:00', votes: 340 },
        { time: '12:00', votes: 560 },
        { time: '14:00', votes: 450 },
        { time: '16:00', votes: 780 },
        { time: '18:00', votes: 890 },
        { time: '20:00', votes: 320 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">VOTING <span className="text-gradient NOT-italic">INTEL</span></h1>
                    <p className="text-sm text-text-muted font-medium mt-1">Real-time analysis of voting patterns and nominee performance.</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2 group px-6 py-3 rounded-xl">
                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    <span className="text-xs font-bold tracking-widest uppercase">Export CSV Report</span>
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Votes Cast"
                    value="17,200"
                    icon={BarChart3}
                    trend="up"
                    trendValue="+2,300 today"
                    color="bg-primary-copper"
                />
                <StatsCard
                    title="Active Voters"
                    value="14,050"
                    icon={Users}
                    trend="up"
                    trendValue="unique IPs"
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Peak Traffic"
                    value="18:00"
                    icon={TrendingUp}
                    trend="up"
                    trendValue="890 votes/hr"
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Leading Category"
                    value="Youth"
                    icon={PieChartIcon}
                    trend="up"
                    trendValue="32% share"
                    color="bg-green-500"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <div className="glass-panel p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <PieChartIcon size={14} /> Vote Distribution by Category
                    </h3>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="votes"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                                    formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hourly Trends */}
                <div className="glass-panel p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <TrendingUp size={14} /> Today's Voting Trend
                    </h3>
                    <div className="flex-1 min-h-0 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={hourlyData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                <XAxis
                                    dataKey="time"
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
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Security/Region Snippet */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Globe size={14} /> Traffic Origins (Top 5 Countries)
                    </h3>
                    <div className="bg-white/5 px-2 py-1 rounded text-[10px] font-bold text-green-400 border border-green-500/20">
                        Low Fraud Risk
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { country: "Nigeria", pct: 65 },
                        { country: "Ghana", pct: 15 },
                        { country: "South Africa", pct: 8 },
                        { country: "Kenya", pct: 7 },
                        { country: "United Kingdom", pct: 5 },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="w-24 text-xs font-bold text-white uppercase tracking-wider">{item.country}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-copper rounded-full" style={{ width: `${item.pct}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-text-muted w-8 text-right">{item.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";
import React from 'react';
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
import { PieChart as PieChartIcon, TrendingUp, Globe } from 'lucide-react';

export default function VotingAnalyticsCharts({ categoryData, hourlyData, colors }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 h-[450px] flex flex-col">
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
                                innerRadius={80}
                                outerRadius={120}
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
                                wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }}
                                formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Hourly Trends */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 h-[450px] flex flex-col">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                    <TrendingUp size={14} /> Voting Activity (Last 24 Hours)
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
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#525252"
                                fontSize={10}
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
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Security/Region Snippet (Static for Demo) */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Globe size={14} /> Traffic Origins (Simulated)
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

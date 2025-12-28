"use client";
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function DashboardCharts({ data }) {
    return (
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 border border-white/5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">Voting Trends (Last 7 Days)</h3>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-copper"></span>
                    <span className="text-[10px] text-text-muted">Votes Cast</span>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0 h-[300px]">
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
    );
}

import React from 'react';
import StatsCard from '@/components/StatsCard';
import ActivityLog from '@/components/ActivityLog';
import DashboardCharts from '@/components/DashboardCharts';
import { Users, Ticket, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import prisma from "@/lib/prisma";

// Force dynamic rendering to ensure real-time data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDashboardData() {
    try {
        // Run queries in parallel
        // Note: We use standard prisma calls for models that were ALREADY in the client
        // We only need raw SQL for NEW models like Activity and Speaker if the client hasn't been regenerated.
        const [
            totalTickets,
            totalUsers,
            totalNominees,
            votes,
            ticketsWithPrice
        ] = await Promise.all([
            prisma.ticket.count(),
            prisma.user.count(),
            prisma.nominee.count({ where: { isVisible: true } }),
            prisma.vote.findMany({ select: { createdAt: true } }),
            prisma.ticket.findMany({
                include: { category: true }
            })
        ]);

        // Fetch activities using Raw SQL workaround
        let activities = [];
        try {
            activities = await prisma.$queryRawUnsafe(
                `SELECT * FROM "Activity" ORDER BY "createdAt" DESC LIMIT 10`
            );
        } catch (e) {
            console.error("Failed to fetch activities via Raw SQL:", e);
        }

        // Calculate Revenue
        const totalRevenue = ticketsWithPrice.reduce((sum, t) => sum + (t.category.price || 0), 0);

        // Process Vote Data for Chart (Group by Day)
        const votesByDay = votes.reduce((acc, vote) => {
            const date = new Date(vote.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const chartData = days.map(day => ({
            name: day,
            votes: votesByDay[day] || 0
        }));

        return {
            totalTickets,
            totalUsers,
            totalNominees,
            totalRevenue,
            totalVotes: votes.length,
            chartData,
            activities
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalTickets: 0,
            totalUsers: 0,
            totalNominees: 0,
            totalRevenue: 0,
            totalVotes: 0,
            chartData: [],
            activities: []
        };
    }
}

export default async function AdminDashboard() {
    const data = await getDashboardData();

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
                    value={`₦${data.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="up"
                    trendValue="+0%"
                    color="bg-primary-copper"
                />
                <StatsCard
                    title="Tickets Sold"
                    value={data.totalTickets.toLocaleString()}
                    icon={Ticket}
                    trend="up"
                    trendValue="+0"
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Total Votes"
                    value={data.totalVotes.toLocaleString()}
                    icon={BarChart3}
                    trend="up"
                    trendValue="+0"
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Nominees"
                    value={data.totalNominees.toLocaleString()}
                    icon={Users}
                    trend="up"
                    trendValue="+0"
                    color="bg-orange-500"
                />
            </div>

            {/* Middle Section: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Voting Trends Chart */}
                <div className="lg:col-span-2">
                    <DashboardCharts data={data.chartData} />
                </div>

                {/* Activity Feed */}
                <div className="lg:col-span-1 min-h-[450px]">
                    <ActivityLog activities={data.activities} />
                </div>
            </div>
        </div>
    );
}

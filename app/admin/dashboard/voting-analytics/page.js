import React from 'react';
import StatsCard from '@/components/StatsCard';
import { BarChart3, Users, TrendingUp, PieChart as PieChartIcon, Download } from 'lucide-react';
import VotingAnalyticsCharts from '@/components/VotingAnalyticsCharts';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getVotingData() {
    try {
        const votes = await prisma.vote.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // --- Aggregations ---

        // 1. Total Votes
        const totalVotes = votes.length;

        // 2. Active Voters (Unique Emails)
        const uniqueVoters = new Set(votes.map(v => v.voterEmail).filter(Boolean)).size;

        // 3. Category Breakdown
        const categoryCounts = {};
        votes.forEach(vote => {
            categoryCounts[vote.categoryId] = (categoryCounts[vote.categoryId] || 0) + 1;
        });

        const categoryData = Object.keys(categoryCounts).map(cat => ({
            name: cat,
            votes: categoryCounts[cat]
        })).sort((a, b) => b.votes - a.votes);

        const leadingCategory = categoryData.length > 0 ? categoryData[0] : { name: 'N/A', votes: 0 };
        const leadingCategoryShare = totalVotes > 0 ? Math.round((leadingCategory.votes / totalVotes) * 100) : 0;

        // 4. Hourly Trends (Simple JS aggregation for demo)
        const hours = {};
        votes.forEach(vote => {
            const hour = new Date(vote.createdAt).getHours();
            const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
            hours[timeLabel] = (hours[timeLabel] || 0) + 1;
        });

        // Fill in missing hours if needed, or just sort existing
        const hourlyData = Object.keys(hours).map(time => ({
            time,
            votes: hours[time]
        })).sort((a, b) => a.time.localeCompare(b.time));

        // Calculate peak hour
        let peakHour = "N/A";
        let maxVotesInHour = 0;
        hourlyData.forEach(d => {
            if (d.votes > maxVotesInHour) {
                maxVotesInHour = d.votes;
                peakHour = d.time;
            }
        });

        return {
            totalVotes,
            uniqueVoters,
            categoryData,
            hourlyData,
            leadingCategory,
            leadingCategoryShare,
            peakHour,
            maxVotesInHour
        };

    } catch (error) {
        console.error("Failed to fetch voting aggregation:", error);
        return {
            totalVotes: 0,
            uniqueVoters: 0,
            categoryData: [],
            hourlyData: [],
            leadingCategory: { name: 'N/A' },
            leadingCategoryShare: 0,
            peakHour: 'N/A',
            maxVotesInHour: 0
        };
    }
}

export default async function VotingAnalyticsPage() {
    const {
        totalVotes,
        uniqueVoters,
        categoryData,
        hourlyData,
        leadingCategory,
        leadingCategoryShare,
        peakHour,
        maxVotesInHour
    } = await getVotingData();

    const colors = ['#D2A478', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

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
                    value={totalVotes.toLocaleString()}
                    icon={BarChart3}
                    trend="up"
                    trendValue="Total"
                    color="bg-primary-copper"
                />
                <StatsCard
                    title="Active Voters"
                    value={uniqueVoters.toLocaleString()}
                    icon={Users}
                    trend="up"
                    trendValue="Unique Emails"
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Peak Traffic"
                    value={peakHour}
                    icon={TrendingUp}
                    trend="up"
                    trendValue={`${maxVotesInHour} votes/hr`}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Leading Category"
                    value={leadingCategory.name.split(' ')[0]} // Shorten name
                    icon={PieChartIcon}
                    trend="up"
                    trendValue={`${leadingCategoryShare}% share`}
                    color="bg-green-500"
                />
            </div>

            {/* Charts */}
            <VotingAnalyticsCharts
                categoryData={categoryData}
                hourlyData={hourlyData}
                colors={colors}
            />
        </div>
    );
}

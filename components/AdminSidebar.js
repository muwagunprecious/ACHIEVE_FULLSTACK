"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Mic,
    Ticket,
    BarChart3,
    Settings,
    LogOut,
    Shield,
    Building2,
    XCircle,
    X
} from 'lucide-react';

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Delegates', icon: Users, path: '/admin/dashboard/nominees' },
        { name: 'Ticketing', icon: Ticket, path: '/admin/dashboard/tickets' },
        { name: 'Speakers', icon: Mic, path: '/admin/dashboard/speakers' },
        { name: 'Exhibitors', icon: Building2, path: '/admin/dashboard/bookings' },
        { name: 'Voting Analytics', icon: BarChart3, path: '/admin/dashboard/voting-analytics' },
        { name: 'Settings', icon: Settings, path: '/admin/dashboard/settings' },
    ];

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('achievers_admin_session');
            router.push('/admin/login');
        }
    };

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-screen sticky top-0">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-copper rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-white font-bold text-sm tracking-wider">ADMIN PORTAL</h2>
                    <p className="text-xs text-text-muted">Achievers Summit</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${isActive
                                ? 'bg-primary-copper text-white shadow-lg shadow-primary-copper/20'
                                : 'text-text-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} className={isActive ? 'text-white' : 'text-text-muted group-hover:text-white transition-colors'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 w-full transition-all group"
                >
                    <span className="flex items-center gap-3">
                        <XCircle size={18} />
                        TERMINATE SESSION
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1 rounded">
                        <X size={12} />
                    </div>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;

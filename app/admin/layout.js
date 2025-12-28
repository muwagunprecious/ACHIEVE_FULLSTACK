"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (status === 'loading') return;

        if (isLoginPage && session) {
            router.replace('/admin/dashboard');
        }

        // Middleware handles protection for non-login pages, 
        // but this client-side check covers edge cases.
        if (!isLoginPage && !session) {
            router.replace('/admin/login');
        }
    }, [isLoginPage, session, status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-copper border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!session) {
        return null; // Don't render protected content
    }

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <AdminSidebar user={session.user} />
            <main className="flex-1 max-h-screen overflow-y-auto relative">
                <div className="absolute inset-0 pointer-events-none sticky top-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary-copper/5 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
                    <div className="motif-bg opacity-[0.03] absolute inset-0"></div>
                </div>
                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

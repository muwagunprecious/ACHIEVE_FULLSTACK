"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Search, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
// import { QrReader } from 'react-qr-reader'; // Commented out to prevent build errors until confirmed working. Using manual input simulation for now.

export default function QRScanPage() {
    const [scanResult, setScanResult] = useState(null);
    const [manualCode, setManualCode] = useState('');
    const [isScanning, setIsScanning] = useState(true);

    const handleScan = (data) => {
        if (data) {
            setScanResult({
                status: Math.random() > 0.3 ? 'VALID' : (Math.random() > 0.5 ? 'USED' : 'INVALID'),
                ticketId: data,
                name: "John Doe",
                type: "VIP",
                email: "john@example.com"
            });
            setIsScanning(false);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        handleScan(manualCode);
    };

    const resetScan = () => {
        setScanResult(null);
        setManualCode('');
        setIsScanning(true);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="p-6 flex items-center justify-between relative z-10 glass-panel border-b border-white/10">
                <Link href="/admin/dashboard/tickets" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-bold text-sm tracking-widest">EXIT SCANNER</span>
                </Link>
                <div className="flex items-center gap-2 text-primary-copper">
                    <QrCode size={20} />
                    <span className="font-bold text-sm tracking-widest">LIVE SCANNER</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">

                {!scanResult ? (
                    <div className="w-full max-w-md space-y-8">
                        {/* Scanner Area */}
                        <div className="aspect-square bg-gray-900 rounded-3xl border-2 border-primary-copper/30 relative overflow-hidden shadow-[0_0_100px_rgba(210,164,120,0.1)]">
                            {/* Mock Scanner Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 border-2 border-primary-copper/50 rounded-3xl relative">
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary-copper -mt-1 -ml-1"></div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary-copper -mt-1 -mr-1"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary-copper -mb-1 -ml-1"></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary-copper -mb-1 -mr-1"></div>

                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-copper/50 shadow-[0_0_20px_#D2A478] animate-scan-line"></div>
                                </div>
                            </div>
                            <p className="absolute bottom-6 left-0 w-full text-center text-xs font-bold text-text-muted uppercase tracking-widest">Align QR Code within frame</p>

                            {/* Simulated Camera Feed */}
                            <div className="w-full h-full bg-white/5 animate-pulse"></div>
                        </div>

                        {/* Manual Entry */}
                        <form onSubmit={handleManualSubmit} className="relative">
                            <input
                                type="text"
                                className="w-full h-14 bg-white/10 border border-white/10 focus:border-primary-copper/50 rounded-xl pl-6 pr-14 outline-none text-white font-mono tracking-wider transition-all"
                                placeholder="ENTER TICKET ID MANUALLY"
                                value={manualCode}
                                onChange={(e) => setManualCode(e.target.value)}
                            />
                            <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-primary-copper text-white rounded-lg flex items-center justify-center hover:bg-primary-copper/80 transition-colors">
                                <Search size={18} />
                            </button>
                        </form>
                    </div>
                ) : (
                    /* Result Card */
                    <div className="w-full max-w-md glass-panel p-8 rounded-[40px] border border-white/10 text-center animate-fade-in-up">
                        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-4 ${scanResult.status === 'VALID' ? 'bg-green-500/10 border-green-500 text-green-500' :
                                scanResult.status === 'USED' ? 'bg-blue-500/10 border-blue-500 text-blue-500' :
                                    'bg-red-500/10 border-red-500 text-red-500'
                            }`}>
                            {scanResult.status === 'VALID' && <CheckCircle2 size={40} />}
                            {scanResult.status === 'USED' && <AlertTriangle size={40} />}
                            {scanResult.status === 'INVALID' && <XCircle size={40} />}
                        </div>

                        <h2 className={`text-3xl font-black italic tracking-tighter mb-2 ${scanResult.status === 'VALID' ? 'text-green-500' :
                                scanResult.status === 'USED' ? 'text-blue-500' :
                                    'text-red-500'
                            }`}>
                            TICKET {scanResult.status}
                        </h2>

                        <p className="text-text-muted text-sm font-bold uppercase tracking-widest mb-8">
                            {scanResult.status === 'VALID' ? 'Access Granted' :
                                scanResult.status === 'USED' ? 'Already Scanned at 10:45 AM' :
                                    'Access Denied'}
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 text-left space-y-4 mb-8">
                            <div>
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Attendee Name</p>
                                <p className="text-lg font-bold text-white">{scanResult.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Ticket Type</p>
                                    <p className="text-sm font-bold text-primary-copper">{scanResult.type}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                                    <p className="text-sm font-bold text-white font-mono">{scanResult.ticketId}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={resetScan}
                            className="btn btn-primary w-full h-14 rounded-xl font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                        >
                            <QrCode size={18} />
                            SCAN NEXT
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes scan-line {
                    0% { top: 0%; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan-line {
                    animation: scan-line 2s linear infinite;
                }
            `}</style>
        </div>
    );
}

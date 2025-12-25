"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Speakers from '../components/Speakers';
import ExhibitionStand from '../components/ExhibitionStand';
import StandBookingModal from '../components/StandBookingModal';
import Tickets from '../components/Tickets';
import CheckoutModal from '../components/CheckoutModal';
import TicketResult from '../components/TicketResult';
import FindTicket from '../components/FindTicket';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState(null);
  const [view, setView] = useState('home'); // 'home' or 'result'

  const handleBuy = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleComplete = (ticketData) => {
    setPurchasedTicket(ticketData);
    setSelectedTicket(null);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setPurchasedTicket(null);
  };

  if (view === 'result') {
    return <TicketResult ticketData={purchasedTicket} onBack={handleBackToHome} />;
  }

  return (
    <main className="min-h-screen bg-bg-deep">
      <Navbar isHidden={!!selectedTicket || isBookingModalOpen} />

      <section id="home">
        <Hero />
      </section>

      <section id="speakers">
        <Speakers />
      </section>

      {/* Stats Section - Premium Redesign */}
      <section className="bg-midnight-black py-40 relative overflow-hidden">
        <div className="motif-bg opacity-5"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
            {[
              { label: 'Delegates', value: '500+', desc: 'Across Africa' },
              { label: 'Exhibitors', value: '100+', desc: 'Global Tech' },
              { label: 'Speakers', value: '100+', desc: 'Industry Titans' },
              { label: 'VIP Guests', value: '35%', desc: 'Global Leaders' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl md:text-8xl font-black text-white mb-6 group-hover:text-primary-copper transition-all duration-700 italic tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-copper mb-2">{stat.label}</div>
                <div className="text-[11px] text-text-muted uppercase tracking-widest font-medium">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExhibitionStand onBook={() => setIsBookingModalOpen(true)} />

      <section id="schedule" className="py-40 bg-bg-deep relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">The Agenda</div>
              <h2 className="text-5xl md:text-7xl text-white mb-8 italic">Strategic <span className="text-gradient font-black NOT-italic">Discussions.</span></h2>
              <p className="text-xl text-text-secondary font-light">Two days of intensive intellectual exchange and high-level networking.</p>
            </div>

            <div className="flex glass-panel p-2 rounded-full border border-white/5">
              <button className="bg-primary-copper text-white px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest">Day 01</button>
              <button className="text-text-muted px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:text-white transition-all">Day 02</button>
            </div>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {[
              { time: '08:00', title: 'Registration & Protocol Arrival', host: 'VVIP Reception' },
              { time: '09:30', title: 'Opening Keynote: African Resilience 2026', host: 'John Adewale' },
              { time: '11:00', title: 'Panel: Digital Sovereignty & Economic Growth', host: 'Tech Ministers' },
              { time: '13:00', title: 'High-Level Networking Luncheon', host: 'Grand Ballroom' },
              { time: '14:30', title: 'Workshop: Future-Proofing Leadership', host: 'Maria Thompson' },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden glass-panel p-8 md:p-10 rounded-[32px] flex flex-col md:flex-row gap-10 items-center border border-white/5 hover:border-primary-copper/30 transition-all duration-500">
                <div className="text-primary-copper font-black text-3xl italic min-w-[100px] tracking-tighter">{item.time}</div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-widest">
                    Moderated by <span className="text-white">{item.host}</span>
                  </p>
                </div>
                <button className="btn btn-outline !py-3 !px-8 !text-[10px] border-white/10">Reserve Seat</button>

                {/* Hover Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-copper/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tickets">
        <Tickets onBuy={handleBuy} />
      </section>

      <section id="find-ticket">
        <FindTicket />
      </section>

      <Footer />

      {selectedTicket && (
        <CheckoutModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onComplete={handleComplete}
        />
      )}

      {isBookingModalOpen && (
        <StandBookingModal
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      <style jsx>{`
        .bg-midnight-black { background-color: var(--midnight-black); }
        .text-primary-copper { color: var(--primary-copper); }
        .glass-panel {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}

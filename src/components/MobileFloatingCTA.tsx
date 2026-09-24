'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { Phone, Calendar, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const MobileFloatingCTA: React.FC = () => {
  const { siteData, setIsBookingModalOpen, isBookingModalOpen, isAdminOpen } = useSite();

  // Hide floating dock if modal is active to prevent overlap
  if (isBookingModalOpen || isAdminOpen) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-[#030712]/94 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-10px_30px_rgba(0,0,0,0.7)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center gap-2">
        
        {/* Direct Call Button */}
        <a
          href={`tel:${siteData.profile.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-100 flex items-center justify-center gap-2 text-xs font-semibold active:scale-95 transition-transform"
        >
          <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call Chamber</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="btn-shimmer flex-[1.4] py-2.5 px-3.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(20,184,166,0.5)] active:scale-95 transition-all"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <Calendar className="w-4 h-4 text-teal-100" />
          <span className="tracking-tight">Book Consultation</span>
        </button>

      </div>

      {/* Tiny Sub-bar for Visiting Hours on Mobile */}
      <div className="flex items-center justify-center gap-2 pt-1.5 text-[10px] text-slate-400">
        <Clock className="w-3 h-3 text-teal-400" />
        <span className="truncate">{siteData.profile.visitingHours.split('(')[0]}</span>
        <span className="text-slate-600">•</span>
        <span className="text-teal-400 font-semibold">ESRA 2026</span>
      </div>
    </div>
  );
};

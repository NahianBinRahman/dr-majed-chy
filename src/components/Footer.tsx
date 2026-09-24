'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Stethoscope, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Sliders, 
  Calendar,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteData, setIsAdminOpen, setIsBookingModalOpen } = useSite();
  const { profile } = siteData;

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      
      {/* Background radial glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ backgroundColor: 'var(--primary-color)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Doctor Identity & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  {profile.name}
                </h3>
                <p className="text-xs text-teal-400 font-medium">
                  {profile.honorific}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              International certified specialist in Regional Anaesthesia & Interventional Pain Medicine. Dedicated to evidence-based, fluoroscopy-guided spinal relief and ultrasound precision blocks.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                ESRA Active Member 2026
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Award className="w-3.5 h-3.5" />
                BSSP & IASP Chapter
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {siteData.menus.filter(m => m.enabled).map((menu) => (
                <li key={menu.id}>
                  <a href={menu.href} className="hover:text-teal-400 transition-colors">
                    {menu.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin Panel / Customize Site</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Chamber & Helplines */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Chamber & Appointment Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>{profile.chamberAddress}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div>{profile.visitingHours}</div>
                  <div className="text-[11px] text-teal-400">{profile.availableDays}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`tel:${profile.phone}`} className="font-bold text-white hover:text-teal-400">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-slate-400">{profile.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Instant Consultation</span>
              </button>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center space-y-3 text-xs text-slate-400">
          <p className="max-w-3xl mx-auto text-[11px] leading-relaxed">
            <strong>Medical Disclaimer:</strong> The clinical procedures, articles, and advice presented on this website are for educational and patient information purposes. Individual clinical outcomes vary. Always consult directly with Dr. Md. Mohiuddin Majed Chowdhury for formal diagnostic evaluation and procedure indication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-3">
            <span>&copy; {new Date().getFullYear()} Dr. Md. Mohiuddin Majed Chy. All Rights Reserved.</span>
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-teal-400 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-teal-400" />
                Admin Dashboard
              </button>
              <span>•</span>
              <span>ESRA European Certified Care</span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Bottom Quick Action Bar */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="p-2.5 rounded-full bg-slate-900/90 text-teal-400 shadow-xl border border-slate-700/80 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          title="Open Admin Dashboard"
          aria-label="Admin Dashboard"
        >
          <Sliders className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="relative group flex items-center gap-2 px-3.5 py-2 rounded-full text-white text-xs font-bold shadow-[0_4px_25px_rgba(20,184,166,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          {/* Subtle pulse aura */}
          <span className="absolute -inset-0.5 rounded-full bg-teal-400/30 animate-ping pointer-events-none -z-10" />
          <Calendar className="w-3.5 h-3.5 text-teal-100" />
          <span className="hidden sm:inline tracking-tight">Book Visit</span>
          <span className="sm:hidden tracking-tight">Book</span>
        </button>
      </div>

    </footer>
  );
};

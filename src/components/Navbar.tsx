'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Stethoscope, 
  Calendar, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Sliders, 
  Moon, 
  Sun,
  ChevronRight,
  Glasses
} from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { soundEngine } from '@/lib/soundEngine';

export const Navbar: React.FC = () => {
  const { siteData, setIsAdminOpen, setIsBookingModalOpen, updateTheme } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enabledMenus = [...siteData.menus]
    .filter(m => m.enabled)
    .sort((a, b) => a.order - b.order);

  const toggleThemeMode = () => {
    const nextMode = siteData.theme.mode === 'dark' ? 'light' : 'dark';
    updateTheme({ mode: nextMode });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-2 sm:pt-3 px-3 sm:px-6 lg:px-8">
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-2 border ${
        isScrolled 
          ? 'bg-[#030712]/90 backdrop-blur-2xl border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
          : 'bg-[#030712]/75 backdrop-blur-xl border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
      }`}>
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Left: Doctor Brand & Credentials Badge */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div 
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] overflow-hidden"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-6" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  {siteData.profile.shortName || siteData.profile.name}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  ESRA 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-tight truncate max-w-[170px] sm:max-w-none">
                {siteData.profile.honorific}
              </p>
            </div>
          </a>

          {/* Center: Desktop Navigation (Pill styled capsules) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.05] whitespace-nowrap flex-nowrap">
            {enabledMenus.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-all duration-200 tracking-tight"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Quick Actions */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Audio SFX Toggle with live equalizer wave */}
            <AudioToggle />

            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                soundEngine.playHapticClick();
                toggleThemeMode();
              }}
              title="Toggle Dark/Light Mode"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.08] transition-all"
              aria-label="Toggle theme"
            >
              {siteData.theme.mode === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>

            {/* Admin Dashboard Trigger */}
            <button
              onClick={() => {
                soundEngine.playHapticClick();
                setIsAdminOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
              title="Open Doctor Admin Dashboard"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden md:inline">Admin</span>
            </button>

            {/* Direct Phone / Chamber */}
            <a
              href={`tel:${siteData.profile.phone.replace(/[^0-9+]/g, '')}`}
              onClick={() => soundEngine.playHapticClick()}
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-teal-300 px-2 py-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{siteData.profile.phone}</span>
            </a>

            {/* Book Appointment CTA Button */}
            <button
              onClick={() => {
                soundEngine.playHapticClick();
                setIsBookingModalOpen(true);
              }}
              className="btn-shimmer flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-white text-xs font-bold shadow-[0_0_20px_rgba(20,184,166,0.45)] hover:shadow-[0_0_28px_rgba(20,184,166,0.65)] hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Calendar className="w-3.5 h-3.5 text-teal-100" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-xl bg-slate-900 text-teal-400 border border-slate-800"
              title="Admin"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-slate-800 px-5 py-4 mt-2 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {enabledMenus.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-teal-300 hover:bg-white/[0.05] rounded-xl transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 py-1">
              <span>Chamber Helpline:</span>
              <span className="text-white font-semibold">{siteData.profile.phone}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

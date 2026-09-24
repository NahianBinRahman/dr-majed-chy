'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Award, 
  ShieldCheck, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  MapPin,
  Clock,
  Stethoscope,
  TrendingUp,
  Users
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { siteData, setIsBookingModalOpen } = useSite();
  const { profile } = siteData;

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] lg:min-h-[94vh] pt-24 sm:pt-28 lg:pt-28 pb-10 lg:pb-14 flex items-center overflow-hidden bg-[#030712]"
    >
      {/* Subtle Radial Glow Backdrops (Controlled, Non-Aggressive) */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, var(--primary-color) 0%, rgba(6,182,212,0.1) 60%, transparent 80%)' }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Clinical Credibility & Messaging (~55% width) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col justify-center">
            
            {/* Top Verification Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/25 text-teal-300 text-xs font-semibold shadow-sm mx-auto lg:mx-0 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="tracking-tight">{profile.badgeText}</span>
            </div>

            {/* Main Hero Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-display font-extrabold tracking-tight text-white leading-[1.12]">
                Relieve Chronic Pain. <br />
                <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Without Open Surgery.
                </span>
              </h1>
            </div>

            {/* Doctor Information Credential Block */}
            <div className="pt-1 pb-1 space-y-1.5 border-y border-white/[0.06] py-3 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                  {profile.name}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  MD, FIPM
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-teal-400 tracking-normal">
                {profile.honorific}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-normal">
                {profile.titles} • European Society (ESRA) Member
              </p>
            </div>

            {/* Description / Hospital Introduction */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {profile.heroBio}
            </p>

            {/* Redesigned Luxury Feature Cards (3 Pillars) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0">
              
              <div className="group p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/[0.07] hover:border-teal-500/40 hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center flex-shrink-0 border border-teal-500/20 group-hover:scale-105 transition-transform">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">Live C-Arm</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Fluoroscopy Spine</div>
                </div>
              </div>

              <div className="group p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/[0.07] hover:border-teal-500/40 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">Ultrasound Guided</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Zero-Radiation Blocks</div>
                </div>
              </div>

              <div className="group p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/[0.07] hover:border-teal-500/40 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">Daycare Discharge</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Walk Out In 1–2 Hrs</div>
                </div>
              </div>

            </div>

            {/* Conversion CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_-5px_rgba(20,184,166,0.45)] bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 hover:shadow-[0_0_35px_rgba(20,184,166,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-teal-100" />
                <span>Book Direct Consultation</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#pain-locator"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-teal-500/40 flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
              >
                <span>Interactive Pain Map</span>
              </a>
            </div>

            {/* Chamber Visiting Timing & Address Micro-bar */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>{profile.visitingHours}</span>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{profile.chamberAddress.split(',')[0]}</span>
              </span>
            </div>

          </div>

          {/* Right Column: Premium Medical Profile Card (~45% width) */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Background Aura */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl opacity-35 -z-10 scale-95"
              style={{ backgroundColor: 'var(--primary-color)' }}
            />

            {/* Outer Profile Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-[#030712] max-w-sm sm:max-w-md w-full backdrop-blur-xl">
              
              {/* Doctor Portrait Area */}
              <div className="relative aspect-[4/4.7] w-full overflow-hidden bg-slate-950">
                <img
                  src={profile.avatarUrl || '/images/dr_majed_portrait_hd.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Subtle Gradient Fog at base of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1523] via-transparent to-transparent" />

                {/* Floating European ESRA Badge Top Right */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-teal-500/35 flex items-center gap-2 shadow-lg">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    ESRA 2026 Certified
                  </span>
                </div>

                {/* Bottom Identity Panel Over Image (Cleaned, 98% Success removed) */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/[0.08] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-sm sm:text-base leading-snug">
                          {profile.name}
                        </div>
                        <div className="text-teal-400 text-xs font-medium tracking-tight">
                          Consultant Interventional Pain Physician
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* High-End Healthcare Dashboard Statistics Bar */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.06] p-3.5 bg-slate-950/90 text-center border-t border-white/[0.06]">
                <div className="px-2">
                  <div className="text-base sm:text-lg font-extrabold text-white font-display tracking-tight">
                    {profile.experienceYears}+
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                    Years Practice
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-base sm:text-lg font-extrabold text-teal-400 font-display tracking-tight">
                    {(profile.proceduresDone / 1000).toFixed(1)}k+
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                    Procedures Done
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-base sm:text-lg font-extrabold text-white font-display tracking-tight">
                    {(profile.patientsTreated / 1000).toFixed(1)}k+
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                    Happy Patients
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

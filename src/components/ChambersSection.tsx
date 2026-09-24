'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight, 
  Stethoscope, 
  Car, 
  Hospital
} from 'lucide-react';

export const ChambersSection: React.FC = () => {
  const { siteData, setIsBookingModalOpen } = useSite();
  const { profile } = siteData;

  const chambers = [
    {
      id: 'central-hospital',
      name: 'Central Specialized Pain Hospital',
      department: 'Center for Interventional Pain Medicine & Spine Care',
      address: profile.chamberAddress,
      floor: '4th Floor, Suite 402 (Advanced Spine Intervention Suite)',
      days: profile.availableDays,
      time: profile.visitingHours,
      phone: profile.phone,
      emergencyPhone: profile.emergencyPhone,
      badge: 'Primary Clinic Suite',
      facilities: ['Live C-Arm Fluoroscopy Theater', 'Bedside Musculoskeletal Sonography', 'Post-Procedure Recovery Lounge', 'Wheelchair & Valet Parking']
    },
    {
      id: 'academic-institute',
      name: profile.hospitalAffiliation || 'Specialized Medical Research Hospital',
      department: 'Department of Anaesthesiology & Interventional Pain Management',
      address: 'Dhanmondi / Panthapath Medical Enclave, Dhaka, Bangladesh',
      floor: 'Interventional Radiology & Daycare OT Complex',
      days: 'Sunday, Tuesday, Thursday (Morning Session)',
      time: '10:00 AM – 01:30 PM (By Prior Referral)',
      phone: profile.phone,
      emergencyPhone: profile.emergencyPhone,
      badge: 'Hospital Theater Care',
      facilities: ['C-Arm Radiofrequency Ablation Suites', 'Cancer Sympathetic Block Facility', 'Multidisciplinary Spine Board', 'Critical Care Support']
    }
  ];

  return (
    <section id="chambers" className="py-20 relative overflow-hidden bg-slate-950/60">
      {/* Decorative backdrop glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ backgroundColor: 'var(--primary-color)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/25">
            <Hospital className="w-3.5 h-3.5 text-teal-400" />
            <span>Consultation Chambers & Visiting Hours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Consult Dr. Majed at <span className="text-gradient-primary">Specialized Chambers</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Equipped with state-of-the-art C-Arm fluoroscopic suites and high-definition sonography for direct outpatient diagnosis and same-day relief.
          </p>
        </div>

        {/* Chambers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chambers.map((chamber) => (
            <div
              key={chamber.id}
              className="glow-card glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                
                {/* Header with Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      {chamber.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-teal-300 transition-colors pt-1">
                      {chamber.name}
                    </h3>
                    <p className="text-xs text-teal-400 font-medium">
                      {chamber.department}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">{chamber.address}</div>
                      <div className="text-xs text-slate-400">{chamber.floor}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">{chamber.time}</div>
                      <div className="text-xs text-teal-400 font-medium">{chamber.days}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-400">Appointment Hotline:</span>
                      <a href={`tel:${chamber.phone}`} className="font-bold text-white hover:text-teal-300">
                        {chamber.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Clinical Facilities Pills */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Suite Facilities:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    {chamber.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/70 border border-white/[0.04]">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="truncate">{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="btn-shimmer w-full sm:flex-1 py-3 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(20,184,166,0.35)] active:scale-98 transition-all"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book at this Chamber</span>
                </button>

                <a
                  href={`tel:${chamber.phone}`}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Direct Call</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Award, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ExternalLink,
  Building,
  GraduationCap
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteData, setIsBookingModalOpen } = useSite();
  const { profile } = siteData;

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Profile & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Meet <span className="text-gradient-primary">Dr. Md. Mohiuddin Majed Chowdhury</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            International pain specialist certified by The European Society of Regional Anaesthesia & Pain Therapy (ESRA), pioneering precision image-guided therapies.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Credentials Collage */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* ESRA Certificate Spotlight Card */}
              <div className="glass-panel p-4 rounded-2xl border border-teal-500/30 glow-card relative overflow-hidden group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                  <img
                    src="/images/certificate_esra.jpg"
                    alt="ESRA 2026 Membership Certificate"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>ESRA European Member 2026</span>
                </div>
                <p className="text-xs text-slate-300">
                  Certified active member of The European Society of Regional Anaesthesia & Pain Therapy.
                </p>
              </div>

              {/* 27th Pain Congress Stage Photo */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 glow-card relative overflow-hidden group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                  <img
                    src="/images/speech_pain_congress.jpg"
                    alt="Dr. Majed at 27th Pain Congress Dhaka"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Faculty & Keynote Speaker</span>
                </div>
                <p className="text-xs text-slate-300">
                  27th Pain Congress, Intercontinental Dhaka (BSSP & IASP Chapter).
                </p>
              </div>

            </div>

            {/* Quote / Mission Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative">
              <div 
                className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl"
                style={{ backgroundColor: 'var(--primary-color)' }}
              />
              <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
                &ldquo;Chronic pain is not just a symptom; it steals lives, mobility, and dignity. My goal is to pinpoint the exact pain generator with microscopic accuracy under C-Arm fluoroscopy and high-frequency ultrasound, restoring painless movement with zero open surgery.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{profile.name}</div>
                  <div className="text-[11px] text-teal-400">{profile.honorific}</div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  14+ Years Clinical Mastery
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio, Qualifications, and Chamber Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-white">
                World-Class Pain Interventions Rooted in Compassion
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {profile.fullBio}
              </p>
            </div>

            {/* Core Medical Competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'C-Arm Fluoroscopy Spine Interventions',
                'Ultrasound-Guided Regional Nerve Blocks',
                'Radiofrequency Neurotomy (RFA)',
                'Cervical & Lumbar Disc Decompression',
                'Cancer Sympathetic Neurolysis',
                'Knee & Shoulder Joint Hydrodilatation',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Chamber Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 mt-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building className="w-4 h-4 text-teal-400" />
                <span>Primary Chamber & Hospital Consultation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Chamber Location:</div>
                  <div className="text-white font-semibold flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>{profile.chamberAddress}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Consultation Hours:</div>
                  <div className="text-white font-semibold flex items-start gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>{profile.visitingHours}</span>
                  </div>
                  <div className="text-teal-400 text-[11px]">{profile.availableDays}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-white font-bold">{profile.phone}</span>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow medical-glow hover:brightness-110"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  Book In-Person Visit
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { useSite } from '@/context/SiteContext';
import { motion } from 'framer-motion';
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
import { soundEngine } from '@/lib/soundEngine';

export const AboutSection: React.FC = () => {
  const { siteData, setIsBookingModalOpen } = useSite();
  const { profile } = siteData;

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950/40 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Profile & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            Meet <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Dr. Md. Mohiuddin Majed Chowdhury</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            International pain specialist certified by The European Society of Regional Anaesthesia & Pain Therapy (ESRA), pioneering precision image-guided therapies.
          </p>
        </motion.div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Credentials Collage */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* ESRA Certificate Spotlight Card */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => soundEngine.playHoverChime()}
                className="glass-panel p-4 rounded-2xl border border-teal-500/30 glow-card relative overflow-hidden group cursor-default"
              >
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
              </motion.div>

              {/* 27th Pain Congress Stage Photo */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => soundEngine.playHoverChime()}
                className="glass-panel p-4 rounded-2xl border border-slate-800 glow-card relative overflow-hidden group cursor-default"
              >
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
              </motion.div>

            </div>

            {/* Quote / Mission Box */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative"
            >
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
                  <div className="text-[11px] text-teal-400">Consultant Interventional Pain Physician</div>
                </div>
                <div className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 text-[10px] font-bold border border-teal-500/20">
                  ESRA 2026
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Narrative Biography & Credentials Checklist */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Clinical Excellence & Expertise
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Pioneering Interventional Pain Management Without Surgery
              </h3>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {profile.fullBio || profile.heroBio}
            </p>

            {/* Checklist of Specializations */}
            <div className="space-y-3 pt-2">
              {[
                { title: 'European Society of Regional Anaesthesia & Pain Therapy (ESRA)', desc: 'Active international fellow advancing evidence-based regional anaesthetic protocols.' },
                { title: 'Bangladesh Society for Study of Pain (BSSP)', desc: 'Life member and active clinical faculty training the next generation of spine specialists.' },
                { title: 'Microscopic C-Arm Fluoroscopy Needle Guidance', desc: 'Real-time radiographic visualization eliminating blind injection errors.' },
                { title: 'High-Resolution Musculoskeletal Ultrasound', desc: 'Zero-radiation sonographic visualization for peripheral nerves, joints, and tendons.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-slate-400 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chamber Direct Info Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Building className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span><strong>Primary Chamber:</strong> {profile.chamberAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span><strong>Clinical Hours:</strong> {profile.visitingHours}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundEngine.playHapticClick();
                  setIsBookingModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <span>Schedule Consultation With Dr. Majed</span>
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

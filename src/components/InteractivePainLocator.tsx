'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crosshair, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  HelpCircle,
  Clock,
  Calendar,
  Rotate3d,
  Glasses,
  Zap,
  Volume2
} from 'lucide-react';
import { ThreeSpineViewer } from './ThreeSpineViewer';
import { soundEngine } from '@/lib/soundEngine';

interface PainZone {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  diagnosis: string[];
  recommendedProcedure: string;
  procedureType: 'C-Arm Fluoroscopy' | 'Ultrasound Guided' | 'Radiofrequency (RFA)' | 'Regenerative';
  recoveryTime: string;
  highlights: string;
}

const painZones: PainZone[] = [
  {
    id: 'lower-back',
    name: 'Lower Back & Spine',
    category: 'Lumbar Spine & Sacroiliac',
    symptoms: ['Constant aching in lower back', 'Stiffness when bending or standing up', 'Pain aggravated after prolonged sitting'],
    diagnosis: ['L4-L5 / L5-S1 Disc Bulge', 'Lumbar Facet Arthropathy', 'Sacroiliac (SI) Joint Dysfunction'],
    recommendedProcedure: 'C-Arm Guided Transforaminal Epidural & Facet Rhizotomy',
    procedureType: 'C-Arm Fluoroscopy',
    recoveryTime: '24 - 48 Hours',
    highlights: 'Targeted micro-injection directly calms irritated spinal nerve roots and facet nerves under live X-ray without spine surgery.'
  },
  {
    id: 'sciatica',
    name: 'Sciatica & Radiating Leg Pain',
    category: 'Nerve Radiculopathy',
    symptoms: ['Electric shooting pain down buttock and thigh', 'Numbness or pins-and-needles in calf or foot', 'Difficulty walking straight'],
    diagnosis: ['Herniated Lumbar Disc with Nerve Root Compression', 'Spinal Stenosis', 'Piriformis Syndrome'],
    recommendedProcedure: 'Fluoroscopic Transforaminal Selective Nerve Root Block (SNRB)',
    procedureType: 'C-Arm Fluoroscopy',
    recoveryTime: 'Immediate to 48 Hours',
    highlights: 'Pinpoint delivery of potent anti-inflammatory medication directly into the intervertebral foramen, rapidly relieving trapped nerve agony.'
  },
  {
    id: 'neck-cervical',
    name: 'Neck, Cervical & Shoulder Blade',
    category: 'Cervical Spine',
    symptoms: ['Stiff neck radiating into shoulders', 'Tingling or numbness running down the arm and fingers', 'Tension at base of skull'],
    diagnosis: ['Cervical Spondylosis', 'C5-C6 / C6-C7 Disc Protrusion', 'Cervical Radiculopathy'],
    recommendedProcedure: 'Cervical Epidural & Ultrasound Medial Branch Block',
    procedureType: 'Ultrasound Guided',
    recoveryTime: '1 - 2 Days',
    highlights: 'Precision needle guidance under ultrasound and fluoroscopy protects vascular structures while delivering long-term neck and arm relief.'
  },
  {
    id: 'knee-joint',
    name: 'Knee Osteoarthritis & Joint Pain',
    category: 'Musculoskeletal Joints',
    symptoms: ['Grinding sound (crepitus) when walking', 'Swelling and deep throbbing knee ache', 'Difficulty climbing stairs or squatting'],
    diagnosis: ['Grade 2-4 Knee Osteoarthritis', 'Patellofemoral Syndrome', 'Meniscus Degeneration'],
    recommendedProcedure: 'Cooled Radiofrequency Neurotomy (RFA) & Viscosupplementation',
    procedureType: 'Radiofrequency (RFA)',
    recoveryTime: 'Walk immediately, 12-24 Mo Relief',
    highlights: 'Selectively deactivates sensory genicular pain nerves without surgery, giving 1 to 2 years of pain-free walking.'
  },
  {
    id: 'shoulder',
    name: 'Shoulder & Frozen Joint',
    category: 'Upper Extremity',
    symptoms: ['Severe restriction in arm elevation', 'Excruciating night pain disrupting sleep', 'Inability to reach behind back'],
    diagnosis: ['Adhesive Capsulitis (Frozen Shoulder)', 'Rotator Cuff Tendinopathy', 'Subacromial Impingement'],
    recommendedProcedure: 'Ultrasound-Guided Glenohumeral Hydrodilatation & Suprascapular Block',
    procedureType: 'Ultrasound Guided',
    recoveryTime: 'Rapid mobility increase in 48 hrs',
    highlights: 'High-frequency sonography guides therapeutic distension of the constricted joint capsule, restoring natural arm motion.'
  },
  {
    id: 'headache-migraine',
    name: 'Chronic Migraine & Facial Pain',
    category: 'Craniofacial Pain',
    symptoms: ['Pounding one-sided headaches', 'Electric shock-like facial nerve sensations', 'Sensitivity to light, sound, and screen glare'],
    diagnosis: ['Intractable Chronic Migraine', 'Trigeminal Neuralgia', 'Occipital Neuralgia'],
    recommendedProcedure: 'Sphenopalatine Ganglion (SPG) Block & Greater Occipital Nerve (GON) Block',
    procedureType: 'Ultrasound Guided',
    recoveryTime: 'Same-day relief',
    highlights: 'Non-invasive or ultrasonic nerve target blocks halt chronic headache pathways at the autonomic source.'
  }
];

interface InteractivePainLocatorProps {
  onOpenXRModal?: () => void;
}

export const InteractivePainLocator: React.FC<InteractivePainLocatorProps> = ({ onOpenXRModal }) => {
  const [selectedZone, setSelectedZone] = useState<PainZone>(painZones[0]);
  const [activeTab, setActiveTab] = useState<'3d_twin' | 'clinical_details'>('3d_twin');
  const { setIsBookingModalOpen, setSelectedServiceForBooking } = useSite();

  const handleSelectZone = (zone: PainZone) => {
    soundEngine.playScanPulse();
    setSelectedZone(zone);
  };

  const handleBookForCondition = (zoneName: string) => {
    soundEngine.playHapticClick();
    setSelectedServiceForBooking(zoneName);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="pain-locator" className="py-20 relative overflow-hidden bg-[#030712]/90 border-t border-white/[0.04]">
      {/* Background Hologram grid */}
      <div className="absolute inset-0 hologram-grid opacity-25 pointer-events-none" />

      {/* Radial aura glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, var(--primary-color) 0%, rgba(6,182,212,0.1) 60%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/30 backdrop-blur-md shadow-sm">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive 3D Symptom Navigator</span>
            <span className="text-slate-600">•</span>
            <span className="text-teal-400 font-bold flex items-center gap-1">
              <Rotate3d className="w-3 h-3 animate-spin-slow" />
              Three.js & WebXR Powered
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Where is Your <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Pain Located?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your pain generator below to manipulate Dr. Majed&apos;s real-time 3D anatomical model, visualize the exact nerve target under C-Arm fluoroscopy, and review non-surgical recovery.
          </p>
        </motion.div>

        {/* Main Grid: Left Zone Buttons + Center/Right 3D Digital Twin & Clinical Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Pain Zones List (5 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center justify-between">
              <span>Select Pain Generator:</span>
              <span className="text-[10px] text-teal-400 font-mono">6 ANATOMICAL PATHWAYS</span>
            </div>

            {painZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <motion.button
                  key={zone.id}
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectZone(zone)}
                  onMouseEnter={() => soundEngine.playHoverChime()}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-slate-900/90 border-teal-500/80 shadow-[0_0_25px_rgba(20,184,166,0.3)] text-white'
                      : 'bg-slate-950/60 border-white/[0.06] text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                        isSelected ? 'bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)]' : 'bg-slate-700'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-tight">{zone.name}</div>
                      <div className="text-xs text-slate-400">{zone.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-teal-300 border border-teal-500/20 hidden sm:inline-block">
                      {zone.procedureType.split(' ')[0]}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-teal-400' : 'text-slate-600'}`} />
                  </div>
                </motion.button>
              );
            })}

            {/* Quick WebXR Direct Launcher Card */}
            {onOpenXRModal && (
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => {
                  soundEngine.playXRModeSound();
                  onOpenXRModal();
                }}
                className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/15 via-cyan-500/10 to-transparent border border-teal-500/30 hover:border-teal-400/60 cursor-pointer shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                    <Glasses className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Launch WebXR Spatial Lab</span>
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Immersive stereoscopic 3D & AR room
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </motion.div>
            )}
          </div>

          {/* Right Column: Three.js 3D Spine Viewer & Clinical Breakdown (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* 3D Model Display */}
            <div className="h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/[0.1] relative">
              <ThreeSpineViewer 
                selectedZoneId={selectedZone.id}
                onOpenXRModal={onOpenXRModal}
              />
            </div>

            {/* Bottom Clinical Breakdown Accordion / Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08] shadow-2xl bg-slate-950/80 backdrop-blur-xl">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
                    {selectedZone.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
                    {selectedZone.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm flex items-center gap-1.5"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>{selectedZone.procedureType}</span>
                  </span>
                </div>
              </div>

              {/* Protocol highlights */}
              <div className="py-4 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Specialized Non-Surgical Protocol:</span>
                  </div>
                  <div className="text-sm font-semibold text-white leading-relaxed">
                    {selectedZone.recommendedProcedure}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {selectedZone.highlights}
                  </p>
                </div>

                {/* Symptoms and Pathologies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="space-y-2">
                    <div className="text-slate-400 font-bold uppercase tracking-wider">
                      Identified Symptoms:
                    </div>
                    {selectedZone.symptoms.map((symp, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>{symp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="text-slate-400 font-bold uppercase tracking-wider">
                      Suspected Pathologies:
                    </div>
                    {selectedZone.diagnosis.map((diag, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-200">
                        <Activity className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{diag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Recovery: <strong>{selectedZone.recoveryTime}</strong></span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Daycare: <strong>Walk out in 1–2 hours</strong></span>
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Suffering from {selectedZone.name.toLowerCase()}? Consult Dr. Majed directly.
                </div>
                <button
                  onClick={() => handleBookForCondition(selectedZone.name)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 medical-glow transition-all"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Assessment for {selectedZone.name}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

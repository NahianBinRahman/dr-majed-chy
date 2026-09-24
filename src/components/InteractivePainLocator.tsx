'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Crosshair, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  HelpCircle,
  Clock,
  Calendar
} from 'lucide-react';

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

export const InteractivePainLocator: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<PainZone>(painZones[0]);
  const { setIsBookingModalOpen, setSelectedServiceForBooking } = useSite();

  const handleBookForCondition = (zoneName: string) => {
    setSelectedServiceForBooking(zoneName);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="pain-locator" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Symptom Diagnostic Navigator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Where is Your <span className="text-gradient-primary">Pain Located?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your pain region below to discover Dr. Majed&apos;s tailored minimally-invasive intervention and expected recovery path.
          </p>
        </div>

        {/* Interactive Selector Tabs & Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Pain Zones List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              Select Pain Generator Area:
            </div>
            {painZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'glass-panel border-teal-500 shadow-lg text-white scale-[1.02]'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                  style={isSelected ? { borderColor: 'var(--primary-color)' } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-3 h-3 rounded-full transition-all ${
                        isSelected ? 'scale-125' : 'bg-slate-700'
                      }`}
                      style={isSelected ? { backgroundColor: 'var(--primary-color)' } : {}}
                    />
                    <div>
                      <div className="text-sm font-bold">{zone.name}</div>
                      <div className="text-xs text-slate-400">{zone.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 hidden sm:inline-block">
                      {zone.procedureType}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-teal-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Clinical Breakdown Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative shadow-2xl">
              
              {/* Badge & Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    {selectedZone.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    {selectedZone.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    {selectedZone.procedureType}
                  </span>
                </div>
              </div>

              {/* Clinical Explanation & Highlights */}
              <div className="py-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
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

                {/* Common Symptoms & Verified Diagnosis */}
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

                {/* Recovery & Procedure Stats */}
                <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Recovery: <strong>{selectedZone.recoveryTime}</strong></span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Daycare: <strong>No Hospital Stay</strong></span>
                  </span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Suffering from this condition? Consult Dr. Majed for direct assessment.
                </div>
                <button
                  onClick={() => handleBookForCondition(selectedZone.name)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 medical-glow transition-all"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book for {selectedZone.name}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

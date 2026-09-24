'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Star, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle, 
  Quote,
  ShieldCheck
} from 'lucide-react';

export const TestimonialsAndFaq: React.FC = () => {
  const { siteData } = useSite();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Testimonials Block */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Patient Trust & Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Real Stories of <span className="text-gradient-primary">Pain Freedom</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Hear from patients who avoided invasive open surgeries through Dr. Majed&apos;s targeted fluoroscopy and ultrasound procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.testimonials.map((test) => (
              <div
                key={test.id}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 glow-card flex flex-col justify-between relative"
              >
                <Quote className="w-10 h-10 text-slate-800 absolute top-4 right-4 -z-0 opacity-50" />

                <div className="space-y-4 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{test.patientName}</span>
                    {test.verified && (
                      <span className="flex items-center gap-1 text-[11px] text-teal-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Patient
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{test.condition}</div>
                  <div className="text-[11px] font-semibold text-emerald-400 pt-1">
                    {test.recoveryTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Block */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Everything you need to know about interventional pain procedures, safety, and consultations.
            </p>
          </div>

          <div className="space-y-3">
            {siteData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-white hover:text-teal-400 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-teal-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

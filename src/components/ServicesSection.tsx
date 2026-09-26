'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { ServiceCard } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Sparkles, 
  Brain, 
  ChevronRight, 
  Check, 
  X,
  Calendar,
  Layers
} from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
};

export const ServicesSection: React.FC = () => {
  const { siteData, setIsBookingModalOpen, setSelectedServiceForBooking } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceCard | null>(null);

  const categories = ['All', ...Array.from(new Set(siteData.services.map((s) => s.tag)))];

  const filteredServices = activeCategory === 'All'
    ? siteData.services
    : siteData.services.filter((s) => s.tag === activeCategory);

  const handleBookService = (service: ServiceCard) => {
    soundEngine.playHapticClick();
    setSelectedServiceForBooking(service.title);
    setSelectedServiceModal(null);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-slate-950/60 border-t border-white/[0.04]">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Advanced Interventional Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            Specialized Procedures & <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Clinical Care</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Fluoroscopy-guided spinal injections, high-definition sonography nerve blocks, and radiofrequency ablation performed in specialized sterile surgical suites.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundEngine.playHapticClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                style={activeCategory === cat ? { backgroundColor: 'var(--primary-color)' } : {}}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid with Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.012 }}
              onMouseEnter={() => soundEngine.playHoverChime()}
              className="glass-panel rounded-2xl p-6 border border-slate-800/80 glow-card flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Optional Service Image Thumbnail if available */}
              {service.imageUrl && (
                <div className="aspect-[16/9] -mx-6 -mt-6 mb-5 overflow-hidden border-b border-slate-800 bg-slate-900">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="space-y-4">
                {/* Header with icon & badge */}
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-teal-400 bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    {iconMap[service.icon] || <Activity className="w-6 h-6" />}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {service.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors mt-0.5">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-1.5 pt-2">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    soundEngine.playHapticClick();
                    setSelectedServiceModal(service);
                  }}
                  className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Learn Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleBookService(service)}
                  className="px-3.5 py-1.5 rounded-lg text-white text-xs font-bold transition-all shadow hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  Book Care
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  soundEngine.playHapticClick();
                  setSelectedServiceModal(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedServiceModal.imageUrl && (
                <div className="aspect-[16/8] rounded-2xl overflow-hidden mb-5 border border-slate-800">
                  <img
                    src={selectedServiceModal.imageUrl}
                    alt={selectedServiceModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {selectedServiceModal.badge}
                </span>
                <span className="text-xs text-slate-400">{selectedServiceModal.tag}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-3">
                {selectedServiceModal.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedServiceModal.fullDesc}
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Clinical Scope & Patient Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedServiceModal.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Performed by Dr. Md. Mohiuddin Majed Chy under local anaesthesia.
                </div>
                <button
                  onClick={() => handleBookService(selectedServiceModal)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Procedure</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

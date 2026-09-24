'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { AchievementItem } from '@/types';
import { 
  Award, 
  Eye, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Maximize2,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

export const AchievementsGallery: React.FC = () => {
  const { siteData } = useSite();
  const [filterType, setFilterType] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<AchievementItem | null>(null);

  const filteredItems = filterType === 'all'
    ? siteData.achievements
    : siteData.achievements.filter(item => item.type === filterType);

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Milestones & Theater Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            International Credentials & <span className="text-gradient-primary">Clinical Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From the European Society of Regional Anaesthesia (ESRA) to national congress stages and high-tech C-Arm operating theaters.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Milestones' },
              { id: 'certificate', label: 'Certifications' },
              { id: 'keynote', label: 'Congress Speeches' },
              { id: 'procedure', label: 'OT & Clinical' },
              { id: 'workshop', label: 'Workshops & Teaching' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === f.id
                    ? 'text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                style={filterType === f.id ? { backgroundColor: 'var(--primary-color)' } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 glow-card cursor-pointer group flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View High-Res</span>
                  </span>
                </div>

                {/* Year Pill */}
                <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded-lg text-[11px] font-bold text-teal-300 border border-teal-500/30">
                  {item.year}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-2">
                <div className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                  {item.organization}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-slate-800/60 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
                <span className="capitalize">{item.type}</span>
                <span className="text-teal-400 font-medium flex items-center gap-1">
                  <span>Inspect</span>
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal for Photo */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700 shadow-2xl p-6 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 flex items-center justify-center max-h-[60vh]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain max-h-[58vh]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {activeItem.year}
                </span>
                <span className="text-xs text-slate-400">{activeItem.organization}</span>
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                {activeItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

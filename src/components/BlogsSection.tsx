'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { BlogPost } from '@/types';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Tag, 
  Share2,
  CheckCircle,
  Stethoscope
} from 'lucide-react';

export const BlogsSection: React.FC = () => {
  const { blogs, activeBlogModal, setActiveBlogModal, setIsBookingModalOpen } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  return (
    <section id="blogs" className="py-20 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Insights & Patient Guides</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Pain Management <span className="text-gradient-primary">Articles & Knowledge</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Evidence-based medical articles on non-surgical spine therapies, European guidelines, and ultrasound-guided solutions authored by Dr. Majed.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                style={selectedCategory === cat ? { backgroundColor: 'var(--primary-color)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 glow-card flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      {blog.publishedAt}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveBlogModal(blog)}
                    className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors cursor-pointer leading-snug"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5 text-teal-400" />
                  <span className="truncate max-w-[130px]">{blog.author.split(' ')[0]} {blog.author.split(' ')[1]}</span>
                </div>

                <button
                  onClick={() => setActiveBlogModal(blog)}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-all group-hover:translate-x-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Blog Full Reader Modal */}
      {activeBlogModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200"
          onClick={() => setActiveBlogModal(null)}
        >
          <div 
            className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-10 relative max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBlogModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Cover Image */}
            <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-slate-800 bg-slate-900">
              <img
                src={activeBlogModal.coverImage}
                alt={activeBlogModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20">
                {activeBlogModal.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                {activeBlogModal.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                Published {activeBlogModal.publishedAt}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-4 leading-tight">
              {activeBlogModal.title}
            </h2>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-teal-500">
                <img src="/images/dr_majed_portrait_hd.jpg" alt={activeBlogModal.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{activeBlogModal.author}</div>
                <div className="text-xs text-slate-400">Consultant Interventional Pain Medicine, ESRA Member</div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
              <div className="whitespace-pre-line">
                {activeBlogModal.content}
              </div>
            </div>

            {/* Tags */}
            {activeBlogModal.tags && (
              <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-teal-400" />
                  Related:
                </span>
                {activeBlogModal.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Doctor Booking CTA inside Blog */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-cyan-950/40 border border-teal-500/30 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>Struggling with this symptom?</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Book a direct clinical evaluation with Dr. Majed Chowdhury today.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveBlogModal(null);
                  setIsBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md hover:brightness-110 transition-all whitespace-nowrap"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                Schedule Consultation
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

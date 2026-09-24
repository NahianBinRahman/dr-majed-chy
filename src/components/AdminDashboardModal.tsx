'use client';

import React, { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  X, 
  Palette, 
  UserCheck, 
  ListFilter, 
  Layers, 
  Award, 
  BookOpen, 
  CalendarCheck, 
  Save, 
  Trash2, 
  Plus, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff,
  RotateCcw,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Sliders
} from 'lucide-react';
import { ServiceCard, AchievementItem, BlogPost, MenuItem } from '@/types';

const colorPresets = [
  { name: 'Teal Luxury (Default)', hex: '#0d9488' },
  { name: 'Medical Cyan', hex: '#06b6d4' },
  { name: 'Sapphire Medical', hex: '#2563eb' },
  { name: 'Emerald Health', hex: '#10b981' },
  { name: 'Imperial Violet', hex: '#8b5cf6' },
  { name: 'Ruby Clinical', hex: '#e11d48' },
  { name: 'Amber Gold', hex: '#f59e0b' },
];

export const AdminDashboardModal: React.FC = () => {
  const { 
    siteData, 
    blogs, 
    appointments, 
    isAdminOpen, 
    setIsAdminOpen,
    updateTheme,
    updateProfile,
    updateMenus,
    updateServices,
    updateAchievements,
    saveBlogPost,
    deleteBlogPost,
    updateAppointmentStatus,
    resetToDefaults
  } = useSite();

  const [activeTab, setActiveTab] = useState<'theme' | 'profile' | 'menus' | 'services' | 'achievements' | 'blogs' | 'appointments'>('theme');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Form states for profile
  const [profileForm, setProfileForm] = useState(siteData.profile);

  // Form state for creating/editing service
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Form state for creating/editing milestone
  const [editingMilestone, setEditingMilestone] = useState<AchievementItem | null>(null);
  const [isNewMilestone, setIsNewMilestone] = useState(false);

  // Form state for creating/editing blog
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === 'adminx11') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid password. Access restricted.');
    }
  };

  const triggerSaveNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Profile Save
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    triggerSaveNotification('Doctor profile saved successfully!');
  };

  // Menu Reorder / Toggle
  const handleToggleMenu = async (id: string) => {
    const nextMenus = siteData.menus.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m);
    await updateMenus(nextMenus);
    triggerSaveNotification('Menu visibility updated!');
  };

  const handleMoveMenu = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= siteData.menus.length) return;
    const next = [...siteData.menus];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    next.forEach((item, idx) => { item.order = idx + 1; });
    await updateMenus(next);
    triggerSaveNotification('Menu order updated!');
  };

  // Services CRUD
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    let nextServices = [...siteData.services];
    if (isNewService) {
      nextServices.unshift(editingService);
    } else {
      nextServices = nextServices.map(s => s.id === editingService.id ? editingService : s);
    }
    await updateServices(nextServices);
    setEditingService(null);
    setIsNewService(false);
    triggerSaveNotification('Service card saved!');
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service card?')) return;
    const nextServices = siteData.services.filter(s => s.id !== id);
    await updateServices(nextServices);
    triggerSaveNotification('Service deleted!');
  };

  // Milestones CRUD
  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;
    let nextMilestones = [...siteData.achievements];
    if (isNewMilestone) {
      nextMilestones.unshift(editingMilestone);
    } else {
      nextMilestones = nextMilestones.map(m => m.id === editingMilestone.id ? editingMilestone : m);
    }
    await updateAchievements(nextMilestones);
    setEditingMilestone(null);
    setIsNewMilestone(false);
    triggerSaveNotification('Credential milestone saved!');
  };

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm('Delete this milestone?')) return;
    const next = siteData.achievements.filter(m => m.id !== id);
    await updateAchievements(next);
    triggerSaveNotification('Milestone removed!');
  };

  // Blogs CRUD
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    await saveBlogPost(editingBlog);
    setEditingBlog(null);
    setIsNewBlog(false);
    triggerSaveNotification('Blog post published/saved!');
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to remove this blog article?')) return;
    await deleteBlogPost(id);
    triggerSaveNotification('Blog post deleted!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop animate-in fade-in duration-200">
      {!isAuthenticated ? (
        <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 bg-slate-950/95 relative animate-in zoom-in-95 duration-200">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/30">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Admin Authentication</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative security password to access settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Security Password</label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter admin password..."
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {authError && (
                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/25 p-2.5 rounded-xl text-center">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-98 transition-all"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="glass-panel w-full max-w-6xl rounded-3xl border border-slate-700 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden bg-slate-950/95">
          {/* Admin Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white font-display">
                    Doctor Site Admin Management
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Sync
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Instantly customize colors, typography, doctor text, procedures, blogs, and patient bookings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setInputPassword('');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Lock admin session"
              >
                Lock
              </button>
            {saveStatus && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5" />
                {saveStatus}
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/40 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'theme', label: 'Theme & Style', icon: Palette },
            { id: 'profile', label: 'Doctor Profile', icon: UserCheck },
            { id: 'menus', label: 'Navigation Menus', icon: ListFilter },
            { id: 'services', label: 'Procedures & Cards', icon: Layers },
            { id: 'achievements', label: 'Certificates & Gallery', icon: Award },
            { id: 'blogs', label: 'Clinical Blogs', icon: BookOpen },
            { id: 'appointments', label: 'Patient Bookings', icon: CalendarCheck, count: appointments.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingService(null);
                  setEditingMilestone(null);
                  setEditingBlog(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                style={isActive ? { backgroundColor: 'var(--primary-color)' } : {}}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-teal-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Body Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: THEME & COLOR */}
          {activeTab === 'theme' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in duration-150">
              
              {/* Primary Color Palette */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-teal-400" />
                  <span>Primary Brand & Glow Accent Color (Real-time Live Preview)</span>
                </label>
                <p className="text-xs text-slate-400">
                  Select a medical color theme or enter your own custom hex code. Updates the entire website immediately.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {colorPresets.map((preset) => {
                    const isSelected = siteData.theme.primaryColor.toLowerCase() === preset.hex.toLowerCase();
                    return (
                      <button
                        key={preset.hex}
                        onClick={() => {
                          updateTheme({ primaryColor: preset.hex, primaryColorName: preset.name });
                          triggerSaveNotification(`Color updated to ${preset.name}!`);
                        }}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'border-white bg-slate-800/90 shadow-lg scale-102'
                            : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full shadow-inner flex-shrink-0"
                          style={{ backgroundColor: preset.hex }}
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{preset.name.split(' ')[0]}</div>
                          <div className="text-[10px] text-slate-400 uppercase">{preset.hex}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <span className="text-xs text-slate-400">Or Custom Hex:</span>
                  <input
                    type="color"
                    value={siteData.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                  />
                  <input
                    type="text"
                    value={siteData.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-28 px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              {/* Font Size Scaling */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-bold text-white">Font Size Scaling</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'compact', label: 'Compact (0.92x)', desc: 'Higher density' },
                    { id: 'normal', label: 'Normal (1.0x)', desc: 'Standard reading size' },
                    { id: 'large', label: 'Large (1.08x)', desc: 'Maximum legibility' },
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      onClick={() => {
                        updateTheme({ fontSizeScale: scale.id as any });
                        triggerSaveNotification(`Font scale set to ${scale.id}!`);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        siteData.theme.fontSizeScale === scale.id
                          ? 'border-teal-500 bg-teal-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{scale.label}</div>
                      <div className="text-[10px] text-slate-400">{scale.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-bold text-white">Typography Font Family</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', preview: 'Modern Premium Tech' },
                    { id: 'Inter', label: 'Inter', preview: 'Clinical Precision' },
                    { id: 'Outfit', label: 'Outfit', preview: 'Luxury Healthcare' },
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => {
                        updateTheme({ fontFamily: font.id });
                        triggerSaveNotification(`Font family set to ${font.id}!`);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        siteData.theme.fontFamily === font.id
                          ? 'border-teal-500 bg-teal-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{font.label}</div>
                      <div className="text-[10px] text-slate-400">{font.preview}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Mode Toggle */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-bold text-white">Theme Display Mode</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      updateTheme({ mode: 'dark' });
                      triggerSaveNotification('Dark luxury mode enabled!');
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      siteData.theme.mode === 'dark'
                        ? 'border-teal-500 bg-slate-900 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Dark Luxury (Recommended)
                  </button>
                  <button
                    onClick={() => {
                      updateTheme({ mode: 'light' });
                      triggerSaveNotification('Light medical mode enabled!');
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      siteData.theme.mode === 'light'
                        ? 'border-teal-500 bg-slate-900 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Light Medical
                  </button>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Want to restore initial layout and content?</span>
                <button
                  onClick={() => {
                    if (confirm('Reset all site customizations to original defaults?')) {
                      resetToDefaults();
                      triggerSaveNotification('Reset to initial defaults!');
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: DOCTOR PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="max-w-4xl space-y-6 animate-in fade-in duration-150">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Doctor Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Short Display Name</label>
                  <input
                    type="text"
                    value={profileForm.shortName}
                    onChange={e => setProfileForm({ ...profileForm, shortName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Honorific Designation</label>
                  <input
                    type="text"
                    value={profileForm.honorific}
                    onChange={e => setProfileForm({ ...profileForm, honorific: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Medical Degrees & Qualifications</label>
                  <input
                    type="text"
                    value={profileForm.titles}
                    onChange={e => setProfileForm({ ...profileForm, titles: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Experience Years</label>
                  <input
                    type="number"
                    value={profileForm.experienceYears}
                    onChange={e => setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Total Procedures</label>
                  <input
                    type="number"
                    value={profileForm.proceduresDone}
                    onChange={e => setProfileForm({ ...profileForm, proceduresDone: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Patients Treated</label>
                  <input
                    type="number"
                    value={profileForm.patientsTreated}
                    onChange={e => setProfileForm({ ...profileForm, patientsTreated: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Success Rate %</label>
                  <input
                    type="number"
                    value={profileForm.successRate}
                    onChange={e => setProfileForm({ ...profileForm, successRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Hero Section Bio Text</label>
                <textarea
                  rows={3}
                  value={profileForm.heroBio}
                  onChange={e => setProfileForm({ ...profileForm, heroBio: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Full About Doctor Bio</label>
                <textarea
                  rows={4}
                  value={profileForm.fullBio}
                  onChange={e => setProfileForm({ ...profileForm, fullBio: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Chamber Phone Hotline</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Consultation Visiting Hours</label>
                  <input
                    type="text"
                    value={profileForm.visitingHours}
                    onChange={e => setProfileForm({ ...profileForm, visitingHours: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Chamber Physical Address</label>
                <input
                  type="text"
                  value={profileForm.chamberAddress}
                  onChange={e => setProfileForm({ ...profileForm, chamberAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: NAVIGATION MENUS */}
          {activeTab === 'menus' && (
            <div className="max-w-3xl space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-400 mb-2">
                Reorder menus, rename menu tabs, or toggle visibility on the live website.
              </div>

              <div className="space-y-2">
                {siteData.menus.map((menu, idx) => (
                  <div
                    key={menu.id}
                    className="p-3 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveMenu(idx, 'up')}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === siteData.menus.length - 1}
                          onClick={() => handleMoveMenu(idx, 'down')}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white">{menu.label}</div>
                        <div className="text-[10px] text-slate-500">{menu.href}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleMenu(menu.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          menu.enabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {menu.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{menu.enabled ? 'Visible' : 'Hidden'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & PROCEDURES CRUD */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {editingService ? (
                /* Service Edit / Add Form */
                <form onSubmit={handleSaveService} className="max-w-3xl space-y-4 glass-panel p-6 rounded-3xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {isNewService ? 'Add New Clinical Procedure' : 'Edit Procedure Card'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Procedure Title *</label>
                      <input
                        type="text"
                        required
                        value={editingService.title}
                        onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category Tag</label>
                      <input
                        type="text"
                        value={editingService.tag}
                        onChange={e => setEditingService({ ...editingService, tag: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Badge Label</label>
                      <input
                        type="text"
                        value={editingService.badge}
                        onChange={e => setEditingService({ ...editingService, badge: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Image URL</label>
                      <input
                        type="text"
                        value={editingService.imageUrl || ''}
                        onChange={e => setEditingService({ ...editingService, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                        placeholder="/images/operation_ot_carm.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Card Short Summary</label>
                    <textarea
                      rows={2}
                      value={editingService.shortDesc}
                      onChange={e => setEditingService({ ...editingService, shortDesc: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingService.fullDesc}
                      onChange={e => setEditingService({ ...editingService, fullDesc: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Benefits (Comma separated)</label>
                    <input
                      type="text"
                      value={editingService.benefits.join(', ')}
                      onChange={e => setEditingService({
                        ...editingService,
                        benefits: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-white text-xs font-bold shadow-md"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      Save Procedure Card
                    </button>
                  </div>
                </form>
              ) : (
                /* Services List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Manage clinical procedure cards presented to patients.
                    </div>
                    <button
                      onClick={() => {
                        setEditingService({
                          id: 'serv-' + Date.now(),
                          title: '',
                          shortDesc: '',
                          fullDesc: '',
                          icon: 'Activity',
                          tag: 'Spine & Disc',
                          badge: 'Advanced',
                          benefits: ['Minimally invasive', 'Local anaesthesia', 'Same day discharge']
                        });
                        setIsNewService(true);
                      }}
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {siteData.services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                              {service.badge}
                            </span>
                            <span className="text-[10px] text-slate-400">{service.tag}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{service.title}</h4>
                          <p className="text-xs text-slate-300 line-clamp-2">{service.shortDesc}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-slate-800/80">
                          <button
                            onClick={() => {
                              setEditingService(service);
                              setIsNewService(false);
                            }}
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CERTIFICATES & GALLERY */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {editingMilestone ? (
                <form onSubmit={handleSaveMilestone} className="max-w-3xl space-y-4 glass-panel p-6 rounded-3xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {isNewMilestone ? 'Add Milestone Photo' : 'Edit Milestone'}
                    </h3>
                    <button type="button" onClick={() => setEditingMilestone(null)} className="p-1 rounded text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Milestone / Title *</label>
                      <input
                        type="text"
                        required
                        value={editingMilestone.title}
                        onChange={e => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Issuing Body / Organization</label>
                      <input
                        type="text"
                        value={editingMilestone.organization}
                        onChange={e => setEditingMilestone({ ...editingMilestone, organization: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Year</label>
                      <input
                        type="text"
                        value={editingMilestone.year}
                        onChange={e => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Type</label>
                      <select
                        value={editingMilestone.type}
                        onChange={e => setEditingMilestone({ ...editingMilestone, type: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      >
                        <option value="certificate">Certificate</option>
                        <option value="keynote">Keynote</option>
                        <option value="procedure">OT Procedure</option>
                        <option value="workshop">Workshop</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Image Asset Path</label>
                      <input
                        type="text"
                        value={editingMilestone.imageUrl}
                        onChange={e => setEditingMilestone({ ...editingMilestone, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                        placeholder="/images/certificate_esra.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Description</label>
                    <textarea
                      rows={3}
                      value={editingMilestone.description}
                      onChange={e => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button type="button" onClick={() => setEditingMilestone(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-xl text-white text-xs font-bold shadow-md" style={{ backgroundColor: 'var(--primary-color)' }}>
                      Save Milestone
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Doctor&apos;s verified certifications and theater photographs.
                    </div>
                    <button
                      onClick={() => {
                        setEditingMilestone({
                          id: 'milestone-' + Date.now(),
                          title: '',
                          organization: '',
                          year: '2026',
                          description: '',
                          imageUrl: '/images/certificate_esra.jpg',
                          type: 'certificate',
                          featured: true
                        });
                        setIsNewMilestone(true);
                      }}
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {siteData.achievements.map((item) => (
                      <div key={item.id} className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-xs font-bold text-white truncate">{item.title}</div>
                          <div className="text-[10px] text-teal-400">{item.organization} ({item.year})</div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => {
                              setEditingMilestone(item);
                              setIsNewMilestone(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMilestone(item.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CLINICAL BLOGS CRUD */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {editingBlog ? (
                <form onSubmit={handleSaveBlog} className="max-w-4xl space-y-4 glass-panel p-6 rounded-3xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {isNewBlog ? 'Write New Clinical Article' : 'Edit Article'}
                    </h3>
                    <button type="button" onClick={() => setEditingBlog(null)} className="p-1 rounded text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={editingBlog.title}
                        onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category</label>
                      <input
                        type="text"
                        value={editingBlog.category}
                        onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Read Time</label>
                      <input
                        type="text"
                        value={editingBlog.readTime}
                        onChange={e => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Published Date</label>
                      <input
                        type="date"
                        value={editingBlog.publishedAt}
                        onChange={e => setEditingBlog({ ...editingBlog, publishedAt: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Cover Image</label>
                      <input
                        type="text"
                        value={editingBlog.coverImage}
                        onChange={e => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                        placeholder="/images/operation_ot_carm.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Brief Excerpt</label>
                    <textarea
                      rows={2}
                      value={editingBlog.excerpt}
                      onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Full Article Content</label>
                    <textarea
                      rows={8}
                      value={editingBlog.content}
                      onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-xl text-white text-xs font-bold shadow-md" style={{ backgroundColor: 'var(--primary-color)' }}>
                      Save & Publish Article
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Manage medical blog articles authored by Dr. Majed.
                    </div>
                    <button
                      onClick={() => {
                        setEditingBlog({
                          id: 'blog-' + Date.now(),
                          slug: 'new-medical-article',
                          title: '',
                          category: 'Spine Health',
                          readTime: '4 min read',
                          publishedAt: new Date().toISOString().split('T')[0],
                          coverImage: '/images/operation_ot_carm.jpg',
                          author: siteData.profile.name,
                          excerpt: '',
                          content: '',
                          featured: true,
                          tags: ['Spine', 'Intervention']
                        });
                        setIsNewBlog(true);
                      }}
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write New Blog Post</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-800">
                            <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white line-clamp-1">{b.title}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2">
                              <span className="text-teal-400">{b.category}</span>
                              <span>•</span>
                              <span>{b.publishedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingBlog(b);
                              setIsNewBlog(false);
                            }}
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: PATIENT APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Manage incoming patient consultation requests.</span>
                <span className="font-bold text-white">{appointments.length} Total Bookings</span>
              </div>

              {appointments.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  No appointments booked yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{apt.patientName}</span>
                          {apt.patientAge && <span className="text-xs text-slate-400">({apt.patientAge} yrs)</span>}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            apt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            apt.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            apt.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {apt.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1 text-teal-400">
                            <Phone className="w-3.5 h-3.5" />
                            {apt.patientPhone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {apt.preferredDate} at {apt.preferredTimeSlot}
                          </span>
                          <span className="text-slate-400">• Condition: <strong className="text-white">{apt.painLocation}</strong></span>
                        </div>

                        {apt.symptoms && (
                          <p className="text-xs text-slate-400 italic pt-1">
                            &ldquo;{apt.symptoms}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Action status buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {apt.status !== 'confirmed' && (
                          <button
                            onClick={async () => {
                              await updateAppointmentStatus(apt.id, 'confirmed');
                              triggerSaveNotification('Appointment confirmed!');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                          >
                            Confirm
                          </button>
                        )}

                        {apt.status !== 'completed' && (
                          <button
                            onClick={async () => {
                              await updateAppointmentStatus(apt.id, 'completed');
                              triggerSaveNotification('Marked completed!');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                          >
                            Complete
                          </button>
                        )}

                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={async () => {
                              await updateAppointmentStatus(apt.id, 'cancelled');
                              triggerSaveNotification('Appointment cancelled');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400 hover:text-rose-400"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        </div>
      )}
    </div>
  );
};

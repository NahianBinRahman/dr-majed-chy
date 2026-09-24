'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, BlogPost, Appointment, SiteTheme, DoctorProfile, MenuItem, ServiceCard, AchievementItem } from '@/types';
import { initialSiteData, initialBlogs, initialAppointments } from '@/data/initialData';

interface SiteContextType {
  siteData: SiteData;
  blogs: BlogPost[];
  appointments: Appointment[];
  isLoading: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeBlogModal: BlogPost | null;
  setActiveBlogModal: (blog: BlogPost | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedServiceForBooking?: string;
  setSelectedServiceForBooking: (serviceName?: string) => void;
  updateTheme: (newTheme: Partial<SiteTheme>) => Promise<void>;
  updateProfile: (newProfile: Partial<DoctorProfile>) => Promise<void>;
  updateMenus: (newMenus: MenuItem[]) => Promise<void>;
  updateServices: (newServices: ServiceCard[]) => Promise<void>;
  updateAchievements: (newAchievements: AchievementItem[]) => Promise<void>;
  saveBlogPost: (blog: BlogPost) => Promise<boolean>;
  deleteBlogPost: (id: string) => Promise<boolean>;
  bookAppointment: (data: any) => Promise<{ success: boolean; appointment?: Appointment; error?: string }>;
  updateAppointmentStatus: (id: string, status: Appointment['status'], notes?: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(initialSiteData);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  // Apply theme to DOM
  const applyThemeToDOM = (theme: SiteTheme) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    root.style.setProperty('--primary-color', theme.primaryColor);

    // Parse hex to RGB for alpha glows
    const hex = theme.primaryColor.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      root.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
      root.style.setProperty('--primary-light', `rgba(${r}, ${g}, ${b}, 0.12)`);
      root.style.setProperty('--primary-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
    }

    // Font size scale
    const scaleMap = {
      compact: '0.92',
      normal: '1',
      large: '1.08',
    };
    root.style.setProperty('--font-scale', scaleMap[theme.fontSizeScale] || '1');

    // Font family
    if (theme.fontFamily === 'Inter') {
      root.style.setProperty('--font-family', "'Inter', sans-serif");
    } else if (theme.fontFamily === 'Outfit') {
      root.style.setProperty('--font-family', "'Outfit', sans-serif");
    } else {
      root.style.setProperty('--font-family', "'Plus Jakarta Sans', sans-serif");
    }

    // Mode
    if (theme.mode === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
  };

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        const [siteRes, blogRes, aptRes] = await Promise.all([
          fetch('/api/site-data'),
          fetch('/api/blogs'),
          fetch('/api/appointments'),
        ]);

        if (siteRes.ok) {
          const sData = await siteRes.json();
          setSiteData(sData);
          applyThemeToDOM(sData.theme);
        }
        if (blogRes.ok) {
          const bData = await blogRes.json();
          setBlogs(bData);
        }
        if (aptRes.ok) {
          const aData = await aptRes.json();
          setAppointments(aData);
        }
      } catch (err) {
        console.warn('Using client initial state', err);
        applyThemeToDOM(initialSiteData.theme);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const updateTheme = async (newTheme: Partial<SiteTheme>) => {
    const updatedTheme = { ...siteData.theme, ...newTheme };
    const updatedSiteData = { ...siteData, theme: updatedTheme };
    setSiteData(updatedSiteData);
    applyThemeToDOM(updatedTheme);

    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: updatedTheme }),
      });
    } catch (err) {
      console.error('Error saving theme', err);
    }
  };

  const updateProfile = async (newProfile: Partial<DoctorProfile>) => {
    const updatedProfile = { ...siteData.profile, ...newProfile };
    const updatedSiteData = { ...siteData, profile: updatedProfile };
    setSiteData(updatedSiteData);

    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: updatedProfile }),
      });
    } catch (err) {
      console.error('Error saving profile', err);
    }
  };

  const updateMenus = async (newMenus: MenuItem[]) => {
    const updatedSiteData = { ...siteData, menus: newMenus };
    setSiteData(updatedSiteData);

    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menus: newMenus }),
      });
    } catch (err) {
      console.error('Error saving menus', err);
    }
  };

  const updateServices = async (newServices: ServiceCard[]) => {
    const updatedSiteData = { ...siteData, services: newServices };
    setSiteData(updatedSiteData);

    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: newServices }),
      });
    } catch (err) {
      console.error('Error saving services', err);
    }
  };

  const updateAchievements = async (newAchievements: AchievementItem[]) => {
    const updatedSiteData = { ...siteData, achievements: newAchievements };
    setSiteData(updatedSiteData);

    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievements: newAchievements }),
      });
    } catch (err) {
      console.error('Error saving achievements', err);
    }
  };

  const saveBlogPost = async (blog: BlogPost): Promise<boolean> => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error saving blog', err);
      // Fallback local update
      const existing = blogs.findIndex((b) => b.id === blog.id);
      if (existing >= 0) {
        const next = [...blogs];
        next[existing] = blog;
        setBlogs(next);
      } else {
        setBlogs([blog, ...blogs]);
      }
      return true;
    }
  };

  const deleteBlogPost = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs);
        return true;
      }
      return false;
    } catch (err) {
      setBlogs(blogs.filter((b) => b.id !== id));
      return true;
    }
  };

  const bookAppointment = async (formData: any) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppointments([data.appointment, ...appointments]);
        return { success: true, appointment: data.appointment };
      }
      return { success: false, error: data.error || 'Failed to submit appointment' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status'], notes?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, doctorNotes: notes }),
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating appointment', err);
      return false;
    }
  };

  const resetToDefaults = async () => {
    setSiteData(initialSiteData);
    setBlogs(initialBlogs);
    setAppointments(initialAppointments);
    applyThemeToDOM(initialSiteData.theme);
    try {
      await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initialSiteData),
      });
    } catch (e) {}
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        blogs,
        appointments,
        isLoading,
        isAdminOpen,
        setIsAdminOpen,
        activeBlogModal,
        setActiveBlogModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        updateTheme,
        updateProfile,
        updateMenus,
        updateServices,
        updateAchievements,
        saveBlogPost,
        deleteBlogPost,
        bookAppointment,
        updateAppointmentStatus,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

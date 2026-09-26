'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { InteractivePainLocator } from '@/components/InteractivePainLocator';
import { ServicesSection } from '@/components/ServicesSection';
import { AchievementsGallery } from '@/components/AchievementsGallery';
import { BlogsSection } from '@/components/BlogsSection';
import { TestimonialsAndFaq } from '@/components/TestimonialsAndFaq';
import { ChambersSection } from '@/components/ChambersSection';
import { Footer } from '@/components/Footer';
import { MobileFloatingCTA } from '@/components/MobileFloatingCTA';
import { AppointmentBookingModal } from '@/components/AppointmentBookingModal';
import { AdminDashboardModal } from '@/components/AdminDashboardModal';
import { WebXRModal } from '@/components/WebXRModal';

export default function HomePage() {
  const [isXRModalOpen, setIsXRModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050b14] overflow-x-hidden pb-16 sm:pb-0">
      {/* Navigation with scroll progress and audio visualizer */}
      <Navbar />

      {/* Hero Section with High-Res Studio Portrait & 3D Neuraxial Twin Switcher */}
      <HeroSection onOpenXRModal={() => setIsXRModalOpen(true)} />

      {/* About Doctor with ESRA 2026 Credentials */}
      <AboutSection />

      {/* Patient Symptom / Pain Region Interactive Navigator with Synchronized 3D Spine */}
      <InteractivePainLocator onOpenXRModal={() => setIsXRModalOpen(true)} />

      {/* Dynamic Procedures and Clinical Services */}
      <ServicesSection />

      {/* Photo Gallery & Milestones (ESRA Certificate, 27th Pain Congress, OT, Workshop) */}
      <AchievementsGallery />

      {/* Clinical Blog Articles & Patient Education */}
      <BlogsSection />

      {/* Verified Patient Reviews & FAQ Accordion */}
      <TestimonialsAndFaq />

      {/* Consultation Chambers & Hospital Suites */}
      <ChambersSection />

      {/* Chamber Location, Contacts & Footer */}
      <Footer />

      {/* Mobile Floating Action Dock */}
      <MobileFloatingCTA />

      {/* Modals */}
      <AppointmentBookingModal />
      <AdminDashboardModal />
      <WebXRModal isOpen={isXRModalOpen} onClose={() => setIsXRModalOpen(false)} />
    </main>
  );
}

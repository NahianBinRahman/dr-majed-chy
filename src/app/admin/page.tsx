'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSite } from '@/context/SiteContext';
import { AdminDashboardModal } from '@/components/AdminDashboardModal';
import { Sliders } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { setIsAdminOpen } = useSite();

  useEffect(() => {
    setIsAdminOpen(true);
  }, [setIsAdminOpen]);

  return (
    <div className="min-h-screen bg-[#050b14] flex flex-col items-center justify-center p-4">
      <AdminDashboardModal />
      <div className="text-center space-y-4 max-w-md p-8 glass-panel rounded-3xl border border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/30">
          <Sliders className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-white">Admin Control Center</h1>
        <p className="text-xs text-slate-400">
          The admin modal has been launched. You can customize themes, fonts, colors, doctor profile text, procedures, blogs, and appointments.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
        >
          Return to Main Website
        </button>
      </div>
    </div>
  );
}

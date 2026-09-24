import type { Metadata } from 'next';
import './globals.css';
import { SiteProvider } from '@/context/SiteContext';

export const metadata: Metadata = {
  title: 'Dr. Md. Mohiuddin Majed Chy | Interventional Pain Specialist | ESRA Certified',
  description: 'Official practice website of Dr. Md. Mohiuddin Majed Chowdhury - Consultant Interventional Pain Medicine & Regional Anaesthesiologist. Active Member of The European Society of Regional Anaesthesia & Pain Therapy (ESRA) 2026. Specialized in C-Arm spine injections, ultrasound-guided nerve blocks, and non-surgical pain relief.',
  keywords: [
    'Dr. Mohiuddin Majed Chowdhury',
    'Dr Majed Chy',
    'Interventional Pain Specialist Dhaka',
    'ESRA Certified Pain Doctor',
    'Spine Injections without surgery',
    'C-Arm Fluoroscopy Epidural',
    'Ultrasound Nerve Block',
    'Sciatica Treatment Dhaka',
    'Knee Radiofrequency Ablation',
    'Bangladesh Society for Study of Pain'
  ],
  authors: [{ name: 'Dr. Md. Mohiuddin Majed Chy' }],
  openGraph: {
    title: 'Dr. Md. Mohiuddin Majed Chy | Interventional Pain Specialist',
    description: 'European Society of Regional Anaesthesia & Pain Therapy (ESRA) Certified Specialist. Advanced C-Arm and ultrasound-guided pain relief without open surgery.',
    images: ['/images/dr_majed_portrait_hd.jpg'],
    type: 'website'
  }
};

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050b14] text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/images/dr_majed_portrait_hd.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-[#050b14] text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}

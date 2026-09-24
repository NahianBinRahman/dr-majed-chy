export interface SiteTheme {
  primaryColor: string;
  primaryColorName: string;
  fontFamily: string;
  fontSizeScale: 'compact' | 'normal' | 'large';
  mode: 'light' | 'dark' | 'system';
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  order: number;
}

export interface DoctorProfile {
  name: string;
  shortName: string;
  honorific: string;
  titles: string;
  subTitle: string;
  heroBio: string;
  fullBio: string;
  experienceYears: number;
  patientsTreated: number;
  proceduresDone: number;
  successRate: number;
  phone: string;
  emergencyPhone: string;
  email: string;
  chamberAddress: string;
  hospitalAffiliation: string;
  visitingHours: string;
  availableDays: string;
  avatarUrl: string;
  badgeText: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tag: string;
  badge: string;
  imageUrl?: string;
  benefits: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  imageUrl: string;
  type: 'certificate' | 'keynote' | 'workshop' | 'procedure';
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  author: string;
  featured: boolean;
  tags: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientAge?: number;
  painLocation: string;
  preferredDate: string;
  preferredTimeSlot: string;
  symptoms: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  doctorNotes?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  condition: string;
  comment: string;
  rating: number;
  recoveryTime: string;
  verified: boolean;
}

export interface SiteData {
  theme: SiteTheme;
  profile: DoctorProfile;
  menus: MenuItem[];
  services: ServiceCard[];
  achievements: AchievementItem[];
  testimonials: Testimonial[];
  faqs: { id: string; question: string; answer: string }[];
}

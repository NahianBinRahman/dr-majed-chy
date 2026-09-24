import fs from 'fs';
import path from 'path';
import { SiteData, BlogPost, Appointment } from '@/types';
import { initialSiteData, initialBlogs, initialAppointments } from '@/data/initialData';

const dataDir = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dataDir, 'db.json');

export interface DatabaseSchema {
  siteData: SiteData;
  blogs: BlogPost[];
  appointments: Appointment[];
}

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbFilePath)) {
    const defaultData: DatabaseSchema = {
      siteData: initialSiteData,
      blogs: initialBlogs,
      appointments: initialAppointments
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading database file, returning default data', err);
    return {
      siteData: initialSiteData,
      blogs: initialBlogs,
      appointments: initialAppointments
    };
  }
}

export function getDatabase(): DatabaseSchema {
  return ensureDbFile();
}

export function saveDatabase(data: DatabaseSchema): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getSiteData(): SiteData {
  return getDatabase().siteData;
}

export function updateSiteData(updated: Partial<SiteData>): SiteData {
  const db = getDatabase();
  db.siteData = {
    ...db.siteData,
    ...updated,
    profile: {
      ...db.siteData.profile,
      ...(updated.profile || {})
    },
    theme: {
      ...db.siteData.theme,
      ...(updated.theme || {})
    }
  };
  saveDatabase(db);
  return db.siteData;
}

export function getBlogs(): BlogPost[] {
  return getDatabase().blogs;
}

export function saveBlog(blog: BlogPost): BlogPost[] {
  const db = getDatabase();
  const index = db.blogs.findIndex(b => b.id === blog.id);
  if (index >= 0) {
    db.blogs[index] = blog;
  } else {
    db.blogs.unshift(blog);
  }
  saveDatabase(db);
  return db.blogs;
}

export function deleteBlog(id: string): BlogPost[] {
  const db = getDatabase();
  db.blogs = db.blogs.filter(b => b.id !== id);
  saveDatabase(db);
  return db.blogs;
}

export function getAppointments(): Appointment[] {
  return getDatabase().appointments;
}

export function addAppointment(apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
  const db = getDatabase();
  const newAppointment: Appointment = {
    ...apt,
    id: 'apt-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.appointments.unshift(newAppointment);
  saveDatabase(db);
  return newAppointment;
}

export function updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): Appointment | null {
  const db = getDatabase();
  const apt = db.appointments.find(a => a.id === id);
  if (!apt) return null;
  apt.status = status;
  if (notes !== undefined) apt.doctorNotes = notes;
  saveDatabase(db);
  return apt;
}

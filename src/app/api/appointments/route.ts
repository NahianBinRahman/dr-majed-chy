import { NextResponse } from 'next/server';
import { getAppointments, addAppointment, updateAppointmentStatus } from '@/lib/db';

export async function GET() {
  try {
    const list = getAppointments();
    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.patientName || !body.patientPhone || !body.preferredDate) {
      return NextResponse.json({ error: 'Name, phone, and date are required' }, { status: 400 });
    }
    const newApt = addAppointment({
      patientName: body.patientName,
      patientPhone: body.patientPhone,
      patientEmail: body.patientEmail || '',
      patientAge: body.patientAge ? Number(body.patientAge) : undefined,
      painLocation: body.painLocation || 'General Spinal/Joint Pain',
      preferredDate: body.preferredDate,
      preferredTimeSlot: body.preferredTimeSlot || '06:00 PM',
      symptoms: body.symptoms || '',
      doctorNotes: ''
    });
    return NextResponse.json({ success: true, appointment: newApt });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }
    const updated = updateAppointmentStatus(body.id, body.status, body.doctorNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, appointment: updated, appointments: getAppointments() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

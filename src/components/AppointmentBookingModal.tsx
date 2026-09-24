'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '@/context/SiteContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

export const AppointmentBookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    selectedServiceForBooking, 
    siteData, 
    bookAppointment 
  } = useSite();

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    painLocation: '',
    preferredDate: '',
    preferredTimeSlot: '06:00 PM',
    symptoms: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceForBooking) {
      setFormData(prev => ({
        ...prev,
        painLocation: selectedServiceForBooking,
        symptoms: `Consultation regarding: ${selectedServiceForBooking}`
      }));
    }
  }, [selectedServiceForBooking]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.patientName || !formData.patientPhone || !formData.preferredDate) {
      setErrorMessage('Please fill in your name, contact phone number, and preferred date.');
      return;
    }

    setIsSubmitting(true);
    const result = await bookAppointment(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessInfo(result.appointment);
    } else {
      setErrorMessage(result.error || 'Failed to submit appointment. Please try again.');
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setSuccessInfo(null);
    setErrorMessage(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="glass-panel w-full max-w-xl rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {successInfo ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-display font-extrabold text-white">
                Appointment Requested!
              </h3>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Booking Reference: #{successInfo.id}
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{successInfo.patientName}</strong>. Your consultation request for <strong>{successInfo.preferredDate}</strong> at <strong>{successInfo.preferredTimeSlot}</strong> has been logged in Dr. Majed&apos;s chamber schedule.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Chamber Location:</span>
              </div>
              <p className="text-slate-400 pl-6">
                {siteData.profile.chamberAddress}
              </p>
              <div className="flex items-center gap-2 pt-1 text-slate-400 pl-6">
                <span>Chamber Contact:</span>
                <strong className="text-white">{siteData.profile.phone}</strong>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:brightness-110"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Consultation Scheduling</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Book with {siteData.profile.shortName}
              </h3>
              <p className="text-xs text-slate-400">
                Direct booking for C-Arm interventions, ultrasound blocks, and clinical evaluations.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Patient Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammad Rahim"
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Patient Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Contact Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +880 1712-000000"
                    value={formData.patientPhone}
                    onChange={e => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.patientEmail}
                    onChange={e => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Patient Age</label>
                <input
                  type="number"
                  placeholder="e.g. 48"
                  value={formData.patientAge}
                  onChange={e => setFormData({ ...formData, patientAge: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Pain / Condition Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Primary Pain / Condition</label>
              <select
                value={formData.painLocation}
                onChange={e => setFormData({ ...formData, painLocation: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="">-- Select Pain Area or Condition --</option>
                <option value="Lower Back & Sciatica (Slipped Disc)">Lower Back & Sciatica (Slipped Disc)</option>
                <option value="Neck & Cervical Spine Pain">Neck & Cervical Spine Pain</option>
                <option value="Knee Osteoarthritis & Joint Pain">Knee Osteoarthritis & Joint Pain</option>
                <option value="Shoulder / Frozen Shoulder">Shoulder / Frozen Shoulder</option>
                <option value="Intractable Migraine / Trigeminal Neuralgia">Intractable Migraine / Trigeminal Neuralgia</option>
                <option value="Cancer Pain / Coeliac Neurolysis">Cancer Pain / Coeliac Neurolysis</option>
                <option value="Post-Surgical Chronic Pain">Post-Surgical Chronic Pain</option>
                <option value="General Pain Consultation">General Pain Consultation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Preferred Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={e => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="06:15 PM">06:15 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="07:45 PM">07:45 PM</option>
                    <option value="08:30 PM">08:30 PM</option>
                    <option value="09:15 PM">09:15 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Symptoms / Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Symptoms & Prior Medical Reports</label>
              <textarea
                rows={2}
                placeholder="Mention pain duration, prior MRI / X-ray findings, or medications taken..."
                value={formData.symptoms}
                onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all medical-glow disabled:opacity-50"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Calendar className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming with Chamber...' : 'Confirm Appointment Request'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Chamber assistant will call to verify within 2 business hours.</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

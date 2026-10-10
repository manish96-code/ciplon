import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import {
  ArrowLeft,
  Stethoscope,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Target,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
  ShieldCheck,
  FileText,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
import MRLayout from '../../layouts/MR/MRLayout';

const SPECIALTY_OPTIONS = [
  'General Medicine',
  'Cardiology',
  'Diabetology',
  'Orthopedics',
  'Pediatrics',
  'Pulmonology',
  'Gynecology',
  'Dermatology',
  'Neurology',
  'Gastroenterology',
  'ENT',
  'Ophthalmology'
];

const TIER_OPTIONS = [
  { 
    id: 'core', 
    label: 'Core KOL', 
    desc: 'Key Opinion Leader / High-volume prescriber (Weekly detailing recommended)', 
    defaultFreq: 4,
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-300' 
  },
  { 
    id: 'class_a', 
    label: 'Class A (High Potential)', 
    desc: 'Regular prescriber with strong brand loyalty (Fortnightly detailing)', 
    defaultFreq: 3,
    badge: 'bg-teal-50 text-teal-800 border-teal-300' 
  },
  { 
    id: 'class_b', 
    label: 'Class B (Moderate)', 
    desc: 'Occasional prescriber with growth opportunity (Bi-weekly visits)', 
    defaultFreq: 2,
    badge: 'bg-amber-50 text-amber-800 border-amber-300' 
  },
  { 
    id: 'class_c', 
    label: 'Class C (Maintenance)', 
    desc: 'Trial prescriber or remote location clinic (Monthly touchpoint)', 
    defaultFreq: 1,
    badge: 'bg-slate-100 text-slate-700 border-slate-300' 
  }
];

export default function DoctorForm({ mode = 'create', doctorId = null }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    specialization: 'General Medicine',
    clinic_hospital_name: '',
    address: '',
    territory: '',
    city: '',
    phone: '',
    email: '',
    visiting_hours: '',
    visiting_days: '',
    tier: 'core',
    target_frequency_per_month: 4,
    notes: '',
    status: 'active'
  });

  const [loadingDoctor, setLoadingDoctor] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState(null);

  // If in edit mode, fetch existing doctor details
  useEffect(() => {
    if (isEdit && doctorId) {
      setLoadingDoctor(true);
      axios.get(`/api/v1/mr/doctors/${doctorId}`)
        .then((res) => {
          if (res.data?.success && res.data?.data) {
            const doc = res.data.data;
            setFormData({
              name: doc.name || '',
              qualification: doc.qualification || '',
              specialization: doc.specialization || 'General Medicine',
              clinic_hospital_name: doc.clinic_hospital_name || '',
              address: doc.address || '',
              territory: doc.territory || '',
              city: doc.city || '',
              phone: doc.phone || '',
              email: doc.email || '',
              visiting_hours: doc.visiting_hours || '',
              visiting_days: doc.visiting_days || '',
              tier: doc.tier || 'core',
              target_frequency_per_month: doc.target_frequency_per_month || 4,
              notes: doc.notes || '',
              status: doc.status || 'active'
            });
          }
        })
        .catch((err) => {
          console.error('Failed to load doctor:', err);
          setLoadError('Doctor record not found or could not be loaded.');
          toast.error('Could not load doctor details.');
        })
        .finally(() => {
          setLoadingDoctor(false);
        });
    }
  }, [isEdit, doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-level error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleTierSelect = (tierId, defaultFreq) => {
    setFormData((prev) => ({
      ...prev,
      tier: tierId,
      target_frequency_per_month: isEdit ? prev.target_frequency_per_month : defaultFreq
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      if (isEdit) {
        const res = await axios.put(`/api/v1/mr/doctors/${doctorId}`, formData);
        if (res.data?.success) {
          toast.success('Doctor details updated successfully!');
          router.visit('/mr/doctors');
        }
      } else {
        const res = await axios.post('/api/v1/mr/doctors', formData);
        if (res.data?.success) {
          toast.success('New doctor added to your field directory!');
          router.visit('/mr/doctors');
        }
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error('Please resolve the highlighted validation errors.');
      } else {
        toast.error(err.response?.data?.message || 'Failed to save doctor details.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MRLayout title={isEdit ? 'Edit Doctor Profile' : 'Add New Doctor'}>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">

        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/mr/doctors"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Doctors Directory</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isEdit ? `Edit Doctor Profile` : 'Add New Doctor'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? 'Update clinic coordinates, visiting hours, and monthly detailing target calls'
                : 'Register a healthcare practitioner into your assigned field territory and detailing plan'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/mr/doctors"
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || loadingDoctor}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : isEdit ? 'Update Doctor' : 'Save & Register Doctor'}</span>
            </button>
          </div>
        </div>

        {/* Loading / Error States */}
        {loadingDoctor ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs animate-pulse space-y-4">
              <div className="h-6 bg-slate-100 rounded w-1/4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-slate-100 rounded" />
                <div className="h-10 bg-slate-100 rounded" />
              </div>
              <div className="h-24 bg-slate-100 rounded" />
            </div>
          </div>
        ) : loadError ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900">{loadError}</h3>
            <Link
              href="/mr/doctors"
              className="inline-block px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold cursor-pointer"
            >
              Return to Doctors
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Section 1: Professional Details */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Healthcare Professional Information</h2>
                  <p className="text-[11px] text-slate-500">Name, degree, specialization, and practicing territory</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Doctor Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Doctor Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600/15 transition-all ${
                      errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.name[0]}</p>
                  )}
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qualifications / Degree
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MBBS, MD (Cardiology)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Specialization <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none cursor-pointer"
                  >
                    {SPECIALTY_OPTIONS.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.specialization[0]}</p>
                  )}
                </div>

                {/* Territory / Beat */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Territory / Beat Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="territory"
                    value={formData.territory}
                    onChange={handleChange}
                    placeholder="e.g. South Zone / Central Market"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600/15 transition-all ${
                      errors.territory ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                    }`}
                  />
                  {errors.territory && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.territory[0]}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Clinic & Visiting Hours */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Clinic & Visiting Schedule</h2>
                  <p className="text-[11px] text-slate-500">Practice address and optimal MR detailing time windows</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Clinic / Hospital Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic / Hospital Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="clinic_hospital_name"
                    value={formData.clinic_hospital_name}
                    onChange={handleChange}
                    placeholder="e.g. Metro Heart & Multi-Specialty Clinic"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600/15 transition-all ${
                      errors.clinic_hospital_name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                    }`}
                  />
                  {errors.clinic_hospital_name && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.clinic_hospital_name[0]}</p>
                  )}
                </div>

                {/* Complete Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / Chamber Location
                  </label>
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 3rd Floor, Apollo Arcade, Near City Center"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>

                {/* Visiting Days */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    OPD / Visiting Days
                  </label>
                  <input
                    type="text"
                    name="visiting_days"
                    value={formData.visiting_days}
                    onChange={handleChange}
                    placeholder="e.g. Mon - Sat, or Tue/Thu/Sat"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>

                {/* Visiting Hours */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Best Visiting Hours for MRs
                  </label>
                  <input
                    type="text"
                    name="visiting_hours"
                    value={formData.visiting_hours}
                    onChange={handleChange}
                    placeholder="e.g. 11:30 AM - 01:30 PM, 06:00 PM - 08:00 PM"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Detailing Strategy & Tier Classification */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Contact & Detailing Strategy</h2>
                  <p className="text-[11px] text-slate-500">Tier classification, monthly target call frequency, and key notes</p>
                </div>
              </div>

              {/* Tier Selection Cards */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Doctor Classification Tier <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TIER_OPTIONS.map((t) => {
                    const isSelected = formData.tier === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleTierSelect(t.id, t.defaultFreq)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600/20'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">{t.label}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">{t.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-teal-800">
                          Suggested: {t.defaultFreq} visits/mo
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98201 12345"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600/15 transition-all ${
                      errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.phone[0]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. doctor@clinic.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>

                {/* Target Frequency */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Calls / Month <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    name="target_frequency_per_month"
                    value={formData.target_frequency_per_month}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Directory Status
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      className="text-teal-700 focus:ring-teal-700"
                    />
                    <span>Active (Included in Detailing Route)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleChange}
                      className="text-teal-700 focus:ring-teal-700"
                    />
                    <span>Inactive (Temporarily on hold)</span>
                  </label>
                </div>
              </div>

              {/* Detailing Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailing Notes & Molecule Preferences
                </label>
                <textarea
                  rows="3"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Key prescription habits, focus products, sample preferences, or competitor molecule objections..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Link
                href="/mr/doctors"
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel & Return
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-700/60 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{submitting ? 'Saving...' : isEdit ? 'Update Doctor Profile' : 'Save & Register Doctor'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </MRLayout>
  );
}
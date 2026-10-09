import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  CalendarClock, 
  RefreshCw, 
  UserCheck, 
  Building2, 
  Stethoscope, 
  Filter, 
  X, 
  Pill, 
  Gift, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  Sparkles,
  Phone,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import MRLayout from '../../layouts/MR/MRLayout';

const CALL_TYPES = [
  { value: 'routine_detailing', label: 'Routine Detailing', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  { value: 'new_product_launch', label: 'New Product Launch', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { value: 'sample_delivery', label: 'Sample Delivery', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { value: 'cme_invite', label: 'CME / Event Invite', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { value: 'follow_up', label: 'Follow-up Call', color: 'bg-slate-100 text-slate-700 border-slate-200' }
];

const FEEDBACK_OPTIONS = [
  { value: 'highly_interested', label: 'High Interest (Core Prescriber)', color: 'text-emerald-700 bg-emerald-50' },
  { value: 'regular_prescriber', label: 'Regular Prescriber', color: 'text-teal-700 bg-teal-50' },
  { value: 'trial_prescriber', label: 'Agreed for Clinical Trial', color: 'text-indigo-700 bg-indigo-50' },
  { value: 'neutral', label: 'Neutral / Follow-up Needed', color: 'text-amber-700 bg-amber-50' },
  { value: 'negative', label: 'Price / Molecule Objection', color: 'text-rose-700 bg-rose-50' }
];

const SUGGESTED_PRODUCTS = [
  'CiplonPara 650',
  'AzithroCare 500',
  'Cardiovast-AM',
  'TelmiStat 40',
  'PantoCiplon DSR',
  'CiplonVit Gold',
  'CeftriCiplon 1g',
  'Metabolic-XR'
];

export default function Visits({ initialFilters = {} }) {
  const [visits, setVisits] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
  const [dateFilter, setDateFilter] = useState(initialFilters.date || 'all');
  const [doctorFilter, setDoctorFilter] = useState(initialFilters.doctor_id || 'all');
  const [search, setSearch] = useState('');

  // Modals state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [deleteVisitId, setDeleteVisitId] = useState(null);
  const [activeVisit, setActiveVisit] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Schedule Form State
  const initialScheduleForm = {
    doctor_id: '',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '11:00 AM',
    call_type: 'routine_detailing',
    status: 'scheduled',
    products_detailed: ['CiplonPara 650'],
    remarks: '',
  };
  const [scheduleForm, setScheduleForm] = useState(initialScheduleForm);

  // Complete Call Form State
  const initialCompleteForm = {
    products_detailed: [],
    doctor_feedback: 'regular_prescriber',
    samples_given: '',
    remarks: '',
    next_visit_date: ''
  };
  const [completeForm, setCompleteForm] = useState(initialCompleteForm);

  // Fetch visits from REST API
  const fetchVisits = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (dateFilter !== 'all') params.date = dateFilter;
      if (doctorFilter !== 'all') params.doctor_id = doctorFilter;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get('/api/v1/mr/visits', { params });
      if (res.data?.success) {
        setVisits(res.data.data || []);
        setMeta(res.data.meta || null);
      }
    } catch (err) {
      console.error('Failed to load visits:', err);
      setError('Unable to load field visits. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVisits();
    }, 200);
    return () => clearTimeout(timer);
  }, [statusFilter, dateFilter, doctorFilter, search]);

  const handleOpenSchedule = (initialDocId = '') => {
    setScheduleForm({
      ...initialScheduleForm,
      doctor_id: initialDocId || (meta?.doctors_list?.[0]?.id || '')
    });
    setFormErrors({});
    setScheduleModalOpen(true);
  };

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});
    try {
      const res = await axios.post('/api/v1/mr/visits', scheduleForm);
      if (res.data?.success) {
        toast.success('Visit scheduled successfully');
        setScheduleModalOpen(false);
        fetchVisits();
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else {
        toast.error(err.response?.data?.message || 'Error scheduling visit.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenComplete = (visit) => {
    setActiveVisit(visit);
    setCompleteForm({
      products_detailed: visit.products_detailed || ['CiplonPara 650'],
      doctor_feedback: visit.doctor_feedback || 'regular_prescriber',
      samples_given: visit.samples_given || '',
      remarks: visit.remarks || '',
      next_visit_date: visit.next_visit_date || ''
    });
    setCompleteModalOpen(true);
  };

  const handleSubmitComplete = async (e) => {
    e.preventDefault();
    if (!activeVisit) return;
    setSubmitting(true);
    try {
      const payload = {
        status: 'completed',
        products_detailed: completeForm.products_detailed,
        doctor_feedback: completeForm.doctor_feedback,
        samples_given: completeForm.samples_given,
        remarks: completeForm.remarks,
        next_visit_date: completeForm.next_visit_date || null
      };

      const res = await axios.put(`/api/v1/mr/visits/${activeVisit.id}`, payload);
      if (res.data?.success) {
        toast.success('Doctor call logged and marked as completed!');
        setCompleteModalOpen(false);
        fetchVisits();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update visit.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVisit = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/mr/visits/${id}`);
      if (res.data?.success) {
        toast.success('Visit record removed');
        setDeleteVisitId(null);
        fetchVisits();
      }
    } catch (err) {
      toast.error('Failed to remove visit record.');
    }
  };

  const toggleProductTag = (prod, formType = 'schedule') => {
    if (formType === 'schedule') {
      const current = scheduleForm.products_detailed || [];
      if (current.includes(prod)) {
        setScheduleForm({ ...scheduleForm, products_detailed: current.filter((p) => p !== prod) });
      } else {
        setScheduleForm({ ...scheduleForm, products_detailed: [...current, prod] });
      }
    } else {
      const current = completeForm.products_detailed || [];
      if (current.includes(prod)) {
        setCompleteForm({ ...completeForm, products_detailed: current.filter((p) => p !== prod) });
      } else {
        setCompleteForm({ ...completeForm, products_detailed: [...current, prod] });
      }
    }
  };

  return (
    <MRLayout title="Field Visits & Call Management">
      <div className="space-y-5 max-w-7xl mx-auto">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Doctor Visits & Field Calls</h1>
              {meta?.today_total !== undefined && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  {meta.today_total} Scheduled Today
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Track doctor detailing calls, record sample allocations, and log prescriber feedback
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchVisits}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Refresh visits"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-700' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => handleOpenSchedule()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Schedule Call</span>
            </button>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Today's Visits</span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">
              {meta?.today_total ?? 0}
            </div>
            <span className="text-[11px] text-teal-700 font-medium">Scheduled for today</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Completed Today</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-800 mt-2">
              {meta?.today_completed ?? 0}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Logged & detailed</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Pending Calls</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <CalendarClock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-800 mt-2">
              {meta?.today_pending ?? 0}
            </div>
            <span className="text-[11px] text-amber-700 font-medium">Remaining on schedule</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Completed</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-800 mt-2">
              {meta?.all_completed ?? 0}
            </div>
            <span className="text-[11px] text-indigo-700 font-medium">All field calls</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by doctor name, clinic, or specialty..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/10 transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Date Filter */}
            <div className="w-full md:w-36">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past Calls</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-36">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Doctor Filter */}
            <div className="w-full md:w-48">
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Doctors</option>
                {meta?.doctors_list?.map((doc) => (
                  <option key={doc.id} value={doc.id}>{doc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content: Loading / Error / Empty / Visits List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs animate-pulse space-y-3">
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-8 bg-slate-100 rounded w-full mt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900">{error}</h3>
            <button
              type="button"
              onClick={fetchVisits}
              className="text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : visits.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
              <CalendarClock className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Visits Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {statusFilter !== 'all' || dateFilter !== 'all' || search
                ? 'No field calls match your current filters. Clear filters to see all visits.'
                : 'You have not scheduled any doctor calls yet. Schedule your first visit now.'}
            </p>
            <button
              type="button"
              onClick={() => handleOpenSchedule()}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              + Schedule Visit
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {visits.map((v) => {
              const callTypeInfo = CALL_TYPES.find((c) => c.value === v.call_type) || CALL_TYPES[0];
              const feedbackInfo = FEEDBACK_OPTIONS.find((f) => f.value === v.doctor_feedback);
              const isCompleted = v.status === 'completed';

              return (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-teal-300 transition-all p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left: Doctor & Call Details */}
                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${callTypeInfo.color}`}>
                        {callTypeInfo.label}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        v.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : v.status === 'scheduled'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {v.status}
                      </span>

                      {/* Date & Time */}
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{v.visit_date}</span>
                        {v.visit_time && (
                          <>
                            <span className="text-slate-300">|</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{v.visit_time}</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {v.doctor?.name ? v.doctor.name.replace('Dr. ', '').charAt(0) : 'D'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                          {v.doctor?.name || 'Doctor'}
                          {v.doctor?.qualification && (
                            <span className="text-xs text-slate-500 font-normal ml-1.5">
                              ({v.doctor.qualification})
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
                          <span className="font-medium text-slate-700 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {v.doctor?.clinic_hospital_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                            {v.doctor?.specialization}
                          </span>
                          {v.doctor?.phone && (
                            <a href={`tel:${v.doctor.phone}`} className="text-teal-700 hover:underline flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {v.doctor.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Products Detailed & Feedback (If Completed) */}
                    {(v.products_detailed?.length > 0 || v.remarks || v.samples_given) && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                        {v.products_detailed?.map((p) => (
                          <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            <Pill className="w-3 h-3 text-teal-700" />
                            {p}
                          </span>
                        ))}

                        {feedbackInfo && (
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${feedbackInfo.color}`}>
                            {feedbackInfo.label}
                          </span>
                        )}

                        {v.samples_given && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium">
                            <Gift className="w-3 h-3" />
                            {v.samples_given}
                          </span>
                        )}

                        {v.remarks && (
                          <p className="text-[11px] text-slate-500 italic w-full mt-0.5">
                            "{v.remarks}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={() => handleOpenComplete(v)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Log Call</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenComplete(v)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Log</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setDeleteVisitId(v.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Remove Visit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Schedule Call Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Schedule Doctor Visit</h2>
                <p className="text-xs text-slate-500">Plan upcoming detailing appointment in your territory</p>
              </div>
              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSchedule} className="space-y-3.5 text-xs">
              {/* Doctor Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Doctor <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={scheduleForm.doctor_id}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, doctor_id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Choose Doctor --</option>
                  {meta?.doctors_list?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialization} - {d.clinic_hospital_name})
                    </option>
                  ))}
                </select>
                {formErrors.doctor_id && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.doctor_id[0]}</p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Visit Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduleForm.visit_date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, visit_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Visit Time Slot
                  </label>
                  <input
                    type="text"
                    value={scheduleForm.visit_time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, visit_time: e.target.value })}
                    placeholder="e.g. 11:30 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Call Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Call Objective / Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={scheduleForm.call_type}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, call_type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none cursor-pointer"
                >
                  {CALL_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Planned Products */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Focus Products to Detail
                </label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {SUGGESTED_PRODUCTS.map((prod) => {
                    const isSelected = scheduleForm.products_detailed?.includes(prod);
                    return (
                      <button
                        type="button"
                        key={prod}
                        onClick={() => toggleProductTag(prod, 'schedule')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {prod}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Call Notes & Objectives
                </label>
                <textarea
                  rows="2"
                  value={scheduleForm.remarks}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, remarks: e.target.value })}
                  placeholder="e.g. Present clinical evidence, deliver requested literature..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  {submitting ? 'Saving...' : 'Confirm Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log / Complete Call Modal */}
      {completeModalOpen && activeVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Log Doctor Detailing Call</h2>
                <p className="text-xs text-slate-500">Record discussion points with {activeVisit.doctor?.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setCompleteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitComplete} className="space-y-3.5 text-xs">
              {/* Products Detailed */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Products Detailed to Doctor
                </label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {SUGGESTED_PRODUCTS.map((prod) => {
                    const isSelected = completeForm.products_detailed?.includes(prod);
                    return (
                      <button
                        type="button"
                        key={prod}
                        onClick={() => toggleProductTag(prod, 'complete')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {prod}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Doctor Feedback */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Doctor Prescribing Response & Feedback <span className="text-rose-500">*</span>
                </label>
                <select
                  value={completeForm.doctor_feedback}
                  onChange={(e) => setCompleteForm({ ...completeForm, doctor_feedback: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none cursor-pointer"
                >
                  {FEEDBACK_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              {/* Samples Given */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Physician Samples / Promotional Inputs Provided
                </label>
                <input
                  type="text"
                  value={completeForm.samples_given}
                  onChange={(e) => setCompleteForm({ ...completeForm, samples_given: e.target.value })}
                  placeholder="e.g. 2 strips CiplonPara 650, 1 patient starter pack"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              {/* Detailed Remarks */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Clinical Discussion Remarks & Commitments
                </label>
                <textarea
                  rows="2"
                  value={completeForm.remarks}
                  onChange={(e) => setCompleteForm({ ...completeForm, remarks: e.target.value })}
                  placeholder="Doctor's response, dosage preferences, questions raised..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              {/* Next Visit Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Promised Next Visit / Follow-up Date
                </label>
                <input
                  type="date"
                  value={completeForm.next_visit_date}
                  onChange={(e) => setCompleteForm({ ...completeForm, next_visit_date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCompleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  {submitting ? 'Saving...' : 'Complete & Log Call'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteVisitId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Remove Visit Record?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this visit record from your field schedule?
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteVisitId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteVisit(deleteVisitId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </MRLayout>
  );
}

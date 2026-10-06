import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Save, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function StaffForm({ isEdit = false, staff = null, roles = [] }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: staff?.name || '',
    email: staff?.email || '',
    role: staff?.role || 'mr',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(`/admin/staff/${staff.id}`);
    } else {
      post('/admin/staff');
    }
  };

  const getRoleDescription = (name) => {
    switch (name) {
      case 'super_admin':
        return 'Full unrestricted administrative access to products, settings, and staff.';
      case 'manager':
        return 'Can manage formulations, categories, batch records, and view field DCR reports.';
      case 'mr':
        return 'Medical Representative: field access to formulations, visual aids, and DCR submissions.';
      default:
        return 'Standard staff member access.';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/admin/staff"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Staff Management</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isEdit ? 'Edit Staff Member & Role' : 'Add New Staff Member'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isEdit
              ? 'Update team member information, assigned permissions, or reset password.'
              : 'Create a new employee, manager, or Medical Representative (MR) account.'}
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="e.g. Dr. Rajesh Sharma or John Doe"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="e.g. rajesh.sharma@ciplon.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.email}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Assign Role & Access Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((r) => (
                <label
                  key={r.id}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    data.role === r.name
                      ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/15'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.name}
                    checked={data.role === r.name}
                    onChange={(e) => setData('role', e.target.value)}
                    className="mt-0.5 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {r.name === 'super_admin' ? 'Super Admin' : r.name === 'mr' ? 'Medical Representative (MR)' : r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-snug">
                      {getRoleDescription(r.name)}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {errors.role && <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.role}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {isEdit ? 'Password (Leave blank to keep unchanged)' : 'Initial Password'} {!isEdit && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder={isEdit ? '••••••••' : 'Minimum 8 characters'}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all`}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.password}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/staff"
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Staff Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
import { Link, useForm } from '@inertiajs/react';
import { Save, Mail, Lock, User } from 'lucide-react';
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

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="e.g. Dr. Rajesh Sharma"
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600/20 transition-all`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="e.g. rajesh@ciplon.com"
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600/20 transition-all`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role & Access Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roles.map((r) => (
                <label
                  key={r.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                    data.role === r.name
                      ? 'border-teal-600 bg-teal-50/40 text-teal-950 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
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
                    <span className="text-xs font-bold block">
                      {r.name === 'super_admin' ? 'Super Admin' : r.name === 'mr' ? 'Medical Representative (MR)' : r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight font-normal">
                      {r.name === 'super_admin' ? 'Full backoffice access' : r.name === 'manager' ? 'Formulations & reports' : 'Field catalog & DCR reports'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {errors.role && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.role}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isEdit ? 'Password (Leave blank to keep current)' : 'Password'} {!isEdit && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder={isEdit ? '••••••••' : 'Minimum 8 characters'}
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.password ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600/20 transition-all`}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.password}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Link
              href="/admin/staff"
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Staff'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
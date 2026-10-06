import { Link, router } from '@inertiajs/react';
import { Shield, Plus, Edit2, Trash2, ArrowLeft, Users, CheckCircle2, Lock } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function RoleList({ roles = [] }) {
  const handleDelete = (role) => {
    if (confirm(`Are you sure you want to delete role "${role.name}"?`)) {
      router.delete(`/admin/roles/${role.id}`);
    }
  };

  const getRoleTitle = (name) => {
    if (name === 'super_admin') return 'Super Administrator';
    if (name === 'manager') return 'Area / Regulatory Manager';
    if (name === 'mr') return 'Medical Representative (MR)';
    return name.replace('_', ' ').toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Navigation Breadcrumbs & Header */}
        <div>
          <Link
            href="/admin/staff"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Staff Management</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Roles & Permissions</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Configure access levels and granular permissions for staff roles</p>
              </div>
            </div>

            <Link
              href="/admin/roles/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Role</span>
            </Link>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role) => {
            const isProtected = role.name === 'super_admin';

            return (
              <div
                key={role.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-teal-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700">
                      {isProtected ? <Lock className="w-5 h-5 text-purple-600" /> : <Shield className="w-5 h-5 text-teal-700" />}
                    </span>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {role.permissions_count || 0} Permissions
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {getRoleTitle(role.name)}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Identifier: {role.name}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span><strong>{role.users_count || 0}</strong> team members assigned</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/admin/roles/${role.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Configure Permissions</span>
                  </Link>

                  {!isProtected && role.users_count === 0 && (
                    <button
                      type="button"
                      onClick={() => handleDelete(role)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
import { Link, router } from '@inertiajs/react';
import { Shield, Plus, Edit2, Trash2, Users, Lock } from 'lucide-react';
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
      <div className="space-y-4">
        {/* Top Action Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Define access levels and configure module permissions for user roles.
          </p>

          <Link
            href="/admin/roles/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Role</span>
          </Link>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => {
            const isProtected = role.name === 'super_admin';

            return (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                      {isProtected ? <Lock className="w-4 h-4 text-purple-600" /> : <Shield className="w-4 h-4 text-teal-700" />}
                    </span>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {role.permissions_count || 0} Permissions
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {getRoleTitle(role.name)}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {role.name}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>{role.users_count || 0}</strong> assigned users</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/admin/roles/${role.id}/edit`}
                    className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Configure</span>
                  </Link>

                  {!isProtected && role.users_count === 0 && (
                    <button
                      type="button"
                      onClick={() => handleDelete(role)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
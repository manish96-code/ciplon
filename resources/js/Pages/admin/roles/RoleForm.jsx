import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Shield, CheckSquare, Square } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function RoleForm({ isEdit = false, role = null, groupedPermissions = {} }) {
  const isSuperAdmin = role?.name === 'super_admin';

  const { data, setData, post, put, processing, errors } = useForm({
    name: role?.name || '',
    permissions: role?.permissions || [],
  });

  const togglePermission = (permName) => {
    if (isSuperAdmin) return;
    if (data.permissions.includes(permName)) {
      setData('permissions', data.permissions.filter((p) => p !== permName));
    } else {
      setData('permissions', [...data.permissions, permName]);
    }
  };

  const toggleGroup = (modulePermissions) => {
    if (isSuperAdmin) return;
    const names = modulePermissions.map((p) => p.name);
    const allSelected = names.every((n) => data.permissions.includes(n));

    if (allSelected) {
      setData('permissions', data.permissions.filter((p) => !names.includes(p)));
    } else {
      const merged = Array.from(new Set([...data.permissions, ...names]));
      setData('permissions', merged);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(`/admin/roles/${role.id}`);
    } else {
      post('/admin/roles');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumbs */}
        <div>
          <Link
            href="/admin/roles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Roles</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isEdit ? `Configure Role: ${role.name}` : 'Create New Role'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select the granular actions and modules users assigned to this role are authorized to access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Role Name / Identifier <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                disabled={isSuperAdmin}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="e.g. medical_rep or territory_manager"
                className={`w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                  errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
                } rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all ${
                  isSuperAdmin ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.name}</p>}
              <p className="text-[11px] text-slate-400 mt-1">
                Lowercase letters and underscores (e.g. <code className="text-teal-700">area_sales_manager</code>).
              </p>
            </div>
          </div>

          {/* Grouped Permissions Matrix */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Module Permissions Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(groupedPermissions).map(([moduleName, permissions]) => {
                const names = permissions.map((p) => p.name);
                const allSelected = names.every((n) => data.permissions.includes(n));
                const someSelected = names.some((n) => data.permissions.includes(n));

                return (
                  <div
                    key={moduleName}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{moduleName}</h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {permissions.filter((p) => data.permissions.includes(p.name)).length} of {permissions.length} enabled
                        </span>
                      </div>

                      {!isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => toggleGroup(permissions)}
                          className="text-[11px] font-bold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 pt-1">
                      {permissions.map((perm) => {
                        const checked = data.permissions.includes(perm.name);

                        return (
                          <label
                            key={perm.id}
                            className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              checked
                                ? 'bg-teal-50/60 border-teal-200 text-teal-950 font-bold'
                                : 'bg-slate-50/60 border-slate-150 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              disabled={isSuperAdmin}
                              checked={checked}
                              onChange={() => togglePermission(perm.name)}
                              className="rounded text-teal-600 focus:ring-teal-500"
                            />
                            <div className="min-w-0 flex-1">
                              <span>{perm.label}</span>
                              <span className="text-[10px] text-slate-400 font-mono block truncate">
                                {perm.name}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <Link
              href="/admin/roles"
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
              <span>{processing ? 'Saving...' : isEdit ? 'Save Role & Permissions' : 'Create Role'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
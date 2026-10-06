import { Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Name Card */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role Identifier <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={isSuperAdmin}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="e.g. area_sales_manager or medical_rep"
              className={`w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border ${
                errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
              } rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600/20 transition-all ${
                isSuperAdmin ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>}
            <p className="text-[11px] text-slate-400 mt-1">
              Use lowercase alphanumeric characters and underscores (e.g. <code className="text-teal-700">territory_manager</code>).
            </p>
          </div>

          {/* Grouped Permissions Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Module Permissions
              </h2>
              <span className="text-xs text-slate-400">
                {data.permissions.length} total permissions enabled
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {Object.entries(groupedPermissions).map(([moduleName, permissions]) => {
                const names = permissions.map((p) => p.name);
                const allSelected = names.every((n) => data.permissions.includes(n));

                return (
                  <div
                    key={moduleName}
                    className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">{moduleName}</h3>
                        <span className="text-[10px] text-slate-400">
                          {permissions.filter((p) => data.permissions.includes(p.name)).length}/{permissions.length} active
                        </span>
                      </div>

                      {!isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => toggleGroup(permissions)}
                          className="text-[11px] font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-0.5">
                      {permissions.map((perm) => {
                        const checked = data.permissions.includes(perm.name);

                        return (
                          <label
                            key={perm.id}
                            className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                              checked
                                ? 'bg-teal-50/50 border-teal-200 text-teal-950 font-semibold'
                                : 'bg-slate-50/50 border-slate-150 text-slate-600 hover:bg-slate-100/70'
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
                              <span className="block truncate">{perm.label}</span>
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

          {/* Action Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <Link
              href="/admin/roles"
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
              <span>{processing ? 'Saving...' : isEdit ? 'Save Role' : 'Create Role'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
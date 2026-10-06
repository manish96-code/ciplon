import { useForm, Link } from '@inertiajs/react';
import { Save, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
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

  const totalPermissionsCount = Object.values(groupedPermissions).reduce(
    (acc, perms) => acc + perms.length,
    0
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-5 pb-10">
        {isSuperAdmin && (
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-xl p-4 flex items-center gap-3 text-purple-900">
            <Lock className="w-5 h-5 text-purple-600 shrink-0" />
            <div className="text-xs">
              <strong className="block font-semibold text-purple-950">Super Administrator Role is Protected</strong>
              <span>This role has global, permanent access to all administrative capabilities and cannot be modified.</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Identifier Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role Identifier Key <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={isSuperAdmin}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="e.g. area_sales_manager or medical_rep"
              className={`w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border ${
                errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-teal-600'
              } rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/10 transition-all ${
                isSuperAdmin ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
              }`}
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>}
            <p className="text-[11px] text-slate-400 mt-1.5">
              Use lowercase alphanumeric characters and underscores (e.g. <code className="text-teal-700 font-medium">territory_manager</code>).
            </p>
          </div>

          {/* Grouped Permissions Matrix */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Header with counter */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/40">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Module Capabilities & Permissions</h2>
                <p className="text-xs text-slate-500 mt-0.5">Toggle specific privileges granted to users assigned this role.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{data.permissions.length} of {totalPermissionsCount} permissions granted</span>
              </span>
            </div>

            {/* Modules Grid */}
            <div className="divide-y divide-slate-100">
              {Object.entries(groupedPermissions).map(([moduleName, permissions]) => {
                const names = permissions.map((p) => p.name);
                const allSelected = names.every((n) => data.permissions.includes(n));
                const activeCount = permissions.filter((p) => data.permissions.includes(p.name)).length;

                return (
                  <div key={moduleName} className="p-4 sm:p-5">
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{moduleName}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {activeCount}/{permissions.length}
                        </span>
                      </div>

                      {!isSuperAdmin && (
                        <button
                          type="button"
                          onClick={() => toggleGroup(permissions)}
                          className="text-xs font-medium text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {permissions.map((perm) => {
                        const checked = data.permissions.includes(perm.name);

                        return (
                          <label
                            key={perm.id}
                            className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                              checked
                                ? 'bg-teal-50/60 text-teal-950 font-medium'
                                : 'hover:bg-slate-50 text-slate-700'
                            } ${isSuperAdmin ? 'cursor-default' : ''}`}
                          >
                            <input
                              type="checkbox"
                              disabled={isSuperAdmin}
                              checked={checked}
                              onChange={() => togglePermission(perm.name)}
                              className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                            />
                            <div className="min-w-0 flex-1 leading-tight">
                              <span className="block font-semibold text-slate-900">{perm.label}</span>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate">
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
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <Link
              href="/admin/roles"
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>

            {!isSuperAdmin && (
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{processing ? 'Saving...' : isEdit ? 'Save Role Changes' : 'Create Role'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

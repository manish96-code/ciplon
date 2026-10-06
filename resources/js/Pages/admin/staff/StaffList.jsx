import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { UserPlus, Search, Edit2, Trash2, Shield, Filter } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function StaffList({ staff, filters = {}, roles = [] }) {
  const { auth } = usePage().props;
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [roleFilter, setRoleFilter] = useState(filters.role || '');

  const applyFilters = (searchVal, roleVal) => {
    const params = {};
    if (searchVal.trim()) params.search = searchVal.trim();
    if (roleVal) params.role = roleVal;
    router.get('/admin/staff', params, { preserveState: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters(searchTerm, roleFilter);
  };

  const handleRoleChange = (val) => {
    setRoleFilter(val);
    applyFilters(searchTerm, val);
  };

  const handleDelete = (member) => {
    if (confirm(`Are you sure you want to remove staff member "${member.name}"?`)) {
      router.delete(`/admin/staff/${member.id}`);
    }
  };

  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case 'super_admin':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Super Admin</span>;
      case 'manager':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Manager</span>;
      case 'mr':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">Medical Rep (MR)</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{roleName || 'Staff'}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Controls Bar: Search, Role Filter, Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-teal-600 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600/20 transition-all"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={roleFilter}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:border-teal-600 outline-none cursor-pointer text-slate-700"
              >
                <option value="">All Roles</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name === 'super_admin' ? 'Super Admin' : r.name === 'mr' ? 'Medical Rep' : r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/admin/roles"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              title="Configure Roles & Permissions"
            >
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Roles</span>
            </Link>

            <Link
              href="/admin/staff/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Staff</span>
            </Link>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-5">Name & Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Date Joined</th>
                  <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {staff?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-slate-400 font-medium">
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  staff?.data?.map((member) => {
                    const primaryRole = member.roles?.[0]?.name || member.role;
                    const isSelf = member.id === auth.user?.id;

                    return (
                      <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 sm:px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs uppercase shrink-0">
                              {member.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 flex items-center gap-1.5 truncate">
                                <span>{member.name}</span>
                                {isSelf && (
                                  <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">You</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">{member.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {getRoleBadge(primaryRole)}
                        </td>

                        <td className="py-3 px-4 text-slate-500">
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4 sm:px-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/admin/staff/${member.id}/edit`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                              title="Edit Member"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>

                            {!isSelf && (
                              <button
                                type="button"
                                onClick={() => handleDelete(member)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete Member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {staff?.links && staff.links.length > 3 && (
            <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {staff.from || 0} to {staff.to || 0} of {staff.total || 0} members</span>
              <div className="flex items-center gap-1">
                {staff.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url || '#'}
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      link.active
                        ? 'bg-teal-700 text-white'
                        : link.url
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'text-slate-300 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
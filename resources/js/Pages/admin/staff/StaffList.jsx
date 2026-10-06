import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Users, UserPlus, Search, Edit2, Trash2, Shield, Filter, CheckCircle2 } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function StaffList({ staff, filters = {}, roles = [] }) {
  const { auth, flash } = usePage().props;
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [roleFilter, setRoleFilter] = useState(filters.role || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/admin/staff', {
      search: searchTerm,
      role: roleFilter,
    }, { preserveState: true, replace: true });
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
    router.get('/admin/staff', {
      search: searchTerm,
      role: role,
    }, { preserveState: true, replace: true });
  };

  const handleDelete = (member) => {
    if (confirm(`Are you sure you want to remove staff member "${member.name}"?`)) {
      router.delete(`/admin/staff/${member.id}`);
    }
  };

  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case 'super_admin':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">Super Admin</span>;
      case 'manager':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">Manager</span>;
      case 'mr':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">Medical Rep (MR)</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">{roleName || 'Staff'}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Staff & Team Management</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage employees, managers, and Medical Representatives (MR)</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/roles"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              <span>Roles & Permissions</span>
            </Link>

            <Link
              href="/admin/staff/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff Member</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email address..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-teal-600 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
            />
          </form>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Role:</span>
            </span>

            <button
              type="button"
              onClick={() => handleRoleChange('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                roleFilter === '' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              All
            </button>

            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  roleFilter === r.name ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {r.name === 'super_admin' ? 'Super Admin' : r.name === 'mr' ? 'Medical Rep' : r.name.charAt(0).toUpperCase() + r.name.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Team Member</th>
                  <th className="py-3.5 px-4">Role & Access</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {staff?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-slate-400 font-medium">
                      No staff members found matching criteria.
                    </td>
                  </tr>
                ) : (
                  staff?.data?.map((member) => {
                    const primaryRole = member.roles?.[0]?.name || member.role;
                    const isSelf = member.id === auth.user?.id;

                    return (
                      <tr key={member.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs uppercase shrink-0">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{member.name}</span>
                                {isSelf && (
                                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">You</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium">{member.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {getRoleBadge(primaryRole)}
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-medium">
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/admin/staff/${member.id}/edit`}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                              title="Edit Details / Role"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>

                            {!isSelf && (
                              <button
                                type="button"
                                onClick={() => handleDelete(member)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete Member"
                              >
                                <Trash2 className="w-4 h-4" />
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
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {staff.from || 0} to {staff.to || 0} of {staff.total || 0} members</span>
              <div className="flex items-center gap-1">
                {staff.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url || '#'}
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
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
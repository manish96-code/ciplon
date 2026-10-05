// CategoryList component managing pharmaceutical categories
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
  Plus, 
  RefreshCw, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Folder,
  Edit3,
  Trash2,
  Filter,
  X
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';
import ConfirmModal from '../../../components/common/ConfirmModal';
import SearchBar from '../../../components/common/SearchBar';

export default function CategoryList({ categories: paginatedCategories, filters = {} }) {
  const categories = Array.isArray(paginatedCategories)
    ? paginatedCategories
    : (paginatedCategories?.data || []);

  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, category: null });

  // Update URL search and status filter via Inertia GET
  const applyFilters = (searchVal, statusVal) => {
    const params = {};
    if (searchVal.trim()) params.search = searchVal.trim();
    if (statusVal) params.status = statusVal;
    router.get('/admin/categories', params, { preserveState: true });
  };

  const handleSearchChange = (val) => {
    setSearch(val);
  };

  const handleSearchSubmit = () => {
    applyFilters(search, statusFilter);
  };

  const handleStatusChange = (val) => {
    setStatusFilter(val);
    applyFilters(search, val);
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('');
    router.get('/admin/categories', {}, { preserveState: true });
  };

  // Format timestamp into localized date
  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  // Open custom confirmation dialog for deletion
  const requestDelete = (category) => {
    setDeleteConfirm({ isOpen: true, category });
  };

  // Perform category deletion after user confirms in modal
  const handleConfirmDelete = () => {
    const category = deleteConfirm.category;
    if (!category) return;

    setDeletingId(category.id);
    router.delete(`/admin/categories/${category.id}`, {
      preserveScroll: true,
      onFinish: () => {
        setDeletingId(null);
        setDeleteConfirm({ isOpen: false, category: null });
      },
    });
  };

  // Handle status toggle
  const handleToggleStatus = (category) => {
    const newStatus = category.status === 'active' ? 'inactive' : 'active';
    router.patch(
      `/admin/categories/${category.id}/status`,
      { status: newStatus },
      { preserveScroll: true }
    );
  };

  const handleRefresh = () => {
    router.reload({ only: ['categories'] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pt-2 pb-20 sm:pb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:flex-1">
            <SearchBar
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onClear={() => {
                setSearch('');
                applyFilters('', statusFilter);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search by category name or description..."
            />

            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className={`sm:hidden h-[38px] px-3 rounded-lg border transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5 text-xs font-medium relative ${
                isFilterModalOpen || statusFilter
                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                  : 'bg-slate-50/50 hover:bg-white border-slate-200 text-slate-600'
              }`}
              title="Filter categories"
              aria-label="Filter categories"
            >
              <Filter className="w-4 h-4" />
              {statusFilter && (
                <span className="w-2 h-2 bg-teal-600 rounded-full" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-36 px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
              >
                <option value="">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>

              {(search || statusFilter) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 whitespace-nowrap cursor-pointer rounded-lg hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
              title="Refresh list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <Link
              href="/admin/category/add"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Category</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">No categories found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {search || statusFilter 
                  ? 'Try adjusting your search query or status filter.' 
                  : 'Get started by creating your first pharmaceutical category.'}
              </p>
              {!search && !statusFilter && (
                <Link
                  href="/admin/category/add"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4 sm:px-6">Category</th>
                    <th className="py-3 px-4">Hierarchy</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Created</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((category) => {
                    const isRoot = !category.parent_id;
                    const hasChildren = category.children_count > 0;

                    return (
                      <tr 
                        key={category.id} 
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isRoot 
                                ? 'bg-teal-50 text-teal-700 border border-teal-100' 
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              <Folder className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-semibold text-slate-900 block capitalize">
                                {category.name}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 block">
                                /{category.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {isRoot ? (
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                                <Layers className="w-3 h-3 text-slate-500" />
                                Primary Category
                              </span>
                              {hasChildren && (
                                <span className="text-[11px] text-teal-600 font-medium">
                                  ({category.children_count} sub)
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-800 border border-teal-200/60 capitalize">
                              Sub of {category.parent?.name || `ID #${category.parent_id}`}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-600 text-xs first-letter:uppercase">
                          {category.description || (
                            <span className="text-slate-300 italic">No description</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(category)}
                            title="Click to toggle status"
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {category.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                <XCircle className="w-3 h-3" />
                                Inactive
                              </span>
                            )}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right text-xs text-slate-500 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {formatDate(category.created_at)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/admin/categories/${category.id}/edit`}
                              className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                              title="Edit category"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => requestDelete(category)}
                              disabled={deletingId === category.id}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                              title="Delete category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, category: null })}
          onConfirm={handleConfirmDelete}
          isLoading={Boolean(deletingId)}
          title="Delete Category"
          message={`Are you sure you want to delete the category "${deleteConfirm.category?.name}"? Any subcategories or associated products may be affected. This action cannot be undone.`}
          confirmText="Delete Category"
          isDanger={true}
        />

        {/* Filter Modal for Mobile */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="fixed inset-0" 
              onClick={() => setIsFilterModalOpen(false)} 
            />

            <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl p-5 z-10 space-y-4 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Filter Categories</h3>
                    <p className="text-[11px] text-slate-500">Filter category listing by status</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 py-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Category Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('');
                  }}
                  disabled={!statusFilter}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => {
                    applyFilters(search, statusFilter);
                    setIsFilterModalOpen(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Add Category Button for Mobile */}
        <Link
          href="/admin/category/add"
          className="sm:hidden fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4.5 py-3 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-teal-900/25 transition-all cursor-pointer"
          aria-label="Add Category"
        >
          <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
          <span>Add Category</span>
        </Link>
      </div>
    </AdminLayout>
  );
}

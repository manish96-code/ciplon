// ProductList component displaying registered pharmaceutical formulations
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
  Package, 
  Plus, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Star,
  Edit3,
  Trash2,
  Eye,
  Pill,
  Clock,
  Archive,
  Filter,
  X
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';
import ConfirmModal from '../../../components/common/ConfirmModal';
import SearchBar from '../../../components/common/SearchBar';

export default function ProductList({ products: paginatedProducts, categories: initialCategories = [], filters = {} }) {
  const products = Array.isArray(paginatedProducts)
    ? paginatedProducts
    : (paginatedProducts?.data || []);

  const meta = {
    current_page: paginatedProducts?.current_page || 1,
    last_page: paginatedProducts?.last_page || 1,
    total: paginatedProducts?.total || products.length,
  };

  const categories = initialCategories;

  const [search, setSearch] = useState(filters.search || '');
  const [categoryFilter, setCategoryFilter] = useState(filters.category_id || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [featuredFilter, setFeaturedFilter] = useState(filters.is_featured || '');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, product: null });

  // Apply filters via Inertia GET
  const applyFilters = (newFilters = {}) => {
    const params = {
      search: newFilters.search !== undefined ? newFilters.search : search,
      category_id: newFilters.category_id !== undefined ? newFilters.category_id : categoryFilter,
      status: newFilters.status !== undefined ? newFilters.status : statusFilter,
      is_featured: newFilters.is_featured !== undefined ? newFilters.is_featured : featuredFilter,
    };

    // Clean empty values
    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });

    router.get('/admin/products', params, { preserveState: true });
  };

  // Open confirmation dialog for product deletion
  const requestDelete = (product) => {
    setDeleteConfirm({ isOpen: true, product });
  };

  // Perform deletion after user confirms in modal
  const handleConfirmDelete = () => {
    const product = deleteConfirm.product;
    if (!product) return;

    setDeletingId(product.id);
    router.delete(`/admin/products/${product.id}`, {
      preserveScroll: true,
      onFinish: () => {
        setDeletingId(null);
        setDeleteConfirm({ isOpen: false, product: null });
      },
    });
  };

  // Quick toggle active / inactive status
  const handleToggleStatus = (product) => {
    const nextStatus = product.status === 'active' ? 'inactive' : 'active';
    router.patch(
      `/admin/products/${product.id}/status`,
      { status: nextStatus },
      { preserveScroll: true }
    );
  };

  const handleRefresh = () => {
    router.reload({ only: ['products'] });
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setStatusFilter('');
    setFeaturedFilter('');
    router.get('/admin/products', {}, { preserveState: true });
  };

  // Helper for lifecycle status pills
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <XCircle className="w-3 h-3" /> Inactive
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Draft
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Archive className="w-3 h-3" /> Archived
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pt-2 pb-20 sm:pb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:flex-1">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => {
                  setSearch('');
                  applyFilters({ search: '' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    applyFilters({ search });
                  }
                }}
                placeholder="Search formulations by brand, generic, or code..."
              />

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className={`sm:hidden h-[38px] px-3 rounded-lg border transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5 text-xs font-medium relative ${
                  isFilterModalOpen || categoryFilter || statusFilter || featuredFilter
                    ? 'bg-teal-50 border-teal-300 text-teal-700'
                    : 'bg-slate-50/50 hover:bg-white border-slate-200 text-slate-600'
                }`}
                title="Filter products"
                aria-label="Filter products"
              >
                <Filter className="w-4 h-4" />
                {(categoryFilter || statusFilter || featuredFilter) && (
                  <span className="w-2 h-2 bg-teal-600 rounded-full" />
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                title="Refresh list"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>

              <Link
                href="/admin/products/add"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>

          {/* Desktop Filter Row */}
          <div className="hidden sm:flex items-center gap-3 pt-3 border-t border-slate-100 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                applyFilters({ category_id: e.target.value });
              }}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700 max-w-[200px]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                applyFilters({ status: e.target.value });
              }}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={featuredFilter}
              onChange={(e) => {
                setFeaturedFilter(e.target.value);
                applyFilters({ is_featured: e.target.value });
              }}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
            >
              <option value="">Featured: All</option>
              <option value="1">Featured Only ⭐</option>
              <option value="0">Standard Only</option>
            </select>

            {(search || categoryFilter || statusFilter || featuredFilter) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 cursor-pointer ml-auto"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {search || categoryFilter || statusFilter || featuredFilter
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by creating your first pharmaceutical product.'}
              </p>
              <Link
                href="/admin/products/add"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4 sm:px-6">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => {
                    const displayImg = product.primary_image?.url || product.primaryImage?.url || product.images?.[0]?.url;

                    return (
                      <tr 
                        key={product.id} 
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                              {displayImg && (
                                <img 
                                  src={displayImg} 
                                  alt={product.brand_name} 
                                  className="w-full h-full object-cover" 
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback');
                                    if (fallback) fallback.classList.remove('hidden');
                                  }}
                                />
                              )}
                              <div 
                                className={`img-fallback items-center justify-center ${displayImg ? 'hidden' : 'flex'}`}
                              >
                                <Pill className="w-5 h-5 text-slate-400" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Link 
                                  href={`/admin/products/${product.id}`}
                                  className="font-semibold text-slate-900 hover:text-teal-600 transition-colors block capitalize"
                                >
                                  {product.brand_name}
                                </Link>
                              </div>
                              <span className="text-[11px] text-slate-500 block truncate max-w-xs capitalize">
                                {product.generic_name || 'No generic specified'}
                              </span>
                              {product.product_code && (
                                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                                  Code: {product.product_code}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {product.category ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200/60 capitalize">
                              <Layers className="w-3 h-3 text-teal-600" />
                              {product.category.name}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic text-xs">Uncategorized</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(product)}
                            title="Click to toggle status"
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {getStatusBadge(product.status)}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {product.is_featured ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              Featured
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              title="View product details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="p-1.5 rounded-lg text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => requestDelete(product)}
                              disabled={deletingId === product.id}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                              title="Delete product"
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

          {/* Pagination bar */}
          {meta.last_page > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Showing {products.length} of {meta.total} products</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: meta.last_page }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => applyFilters({ page: pNum })}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                        meta.current_page === pNum
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, product: null })}
          onConfirm={handleConfirmDelete}
          isLoading={Boolean(deletingId)}
          title="Delete Formulation"
          message={`Are you sure you want to delete "${deleteConfirm.product?.brand_name}"? All associated compositions and image records will be permanently removed.`}
          confirmText="Delete Product"
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
                    <h3 className="text-sm font-bold text-slate-900">Filter Products</h3>
                    <p className="text-[11px] text-slate-500">Refine catalog by category and status</p>
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
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Featured Showcase
                  </label>
                  <select
                    value={featuredFilter}
                    onChange={(e) => setFeaturedFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
                  >
                    <option value="">All Featured States</option>
                    <option value="1">Featured Only ⭐</option>
                    <option value="0">Standard Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter('');
                    setStatusFilter('');
                    setFeaturedFilter('');
                  }}
                  disabled={!categoryFilter && !statusFilter && !featuredFilter}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => {
                    applyFilters({
                      category_id: categoryFilter,
                      status: statusFilter,
                      is_featured: featuredFilter,
                    });
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

        {/* Floating Add Product Button for Mobile */}
        <Link
          href="/admin/products/add"
          className="sm:hidden fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4.5 py-3 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-teal-900/25 transition-all cursor-pointer"
          aria-label="Add Product"
        >
          <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
          <span>Add Product</span>
        </Link>
      </div>
    </AdminLayout>
  );
}

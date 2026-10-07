// Dashboard overview component for pharmaceutical administration
import { Link } from '@inertiajs/react';
import { 
  Package, 
  FolderTree, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Activity, 
  Pill, 
  Cloud,
  ChevronRight
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Dashboard({ stats = {}, recentProducts = [] }) {
  const totalProducts = stats.totalProducts ?? 0;
  const activeProducts = stats.activeProducts ?? 0;
  const featuredProducts = stats.featuredProducts ?? 0;
  const totalCategories = stats.totalCategories ?? 0;

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Ciplon Enterprise Platform</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Formulation & Catalog Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor active medicine monographs, chemical compositions, and category distribution.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Link
              href="/admin/products/add"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/category/add"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
            >
              <FolderTree className="w-3.5 h-3.5 text-teal-600" />
              <span>Add Category</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Products</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900">{totalProducts}</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Registered drug formulations</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link href="/admin/products" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                <span>View catalog</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Categories</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FolderTree className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900">{totalCategories}</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Formulation classifications</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link href="/admin/category" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                <span>View categories</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Featured</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900">{featuredProducts}</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Homepage showcase active</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Public showcase</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cloud Storage</span>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Cloud className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ImageKit CDN
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Media assets synchronized</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-500 truncate">ik.imagekit.io/man96</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Pill className="w-4.5 h-4.5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Recently Registered Formulations</h3>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>See all products</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentProducts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No products in the catalog yet. Click "Add Product" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-5">Product Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Dosage & Strength</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-900">{prod.brand_name}</div>
                        <span className="text-[11px] text-slate-400 block">{prod.generic_name || 'No generic'}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {prod.category?.name ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-800">
                            {prod.category.name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {prod.dosage_form || 'Formulation'} {prod.strength ? `• ${prod.strength}` : ''}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          prod.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link
                          href={`/admin/products/${prod.id}`}
                          className="text-xs font-semibold text-teal-600 hover:underline"
                        >
                          Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

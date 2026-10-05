import { Menu, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminNavbar({ onToggleSidebar }) {
  const { url, props } = usePage();
  const currentPath = url.split('?')[0];

  // Load authenticated administrator profile
  const authUser = props.auth?.user || {};
  const adminName = authUser.name || 'Administrator';
  const adminEmail = authUser.email || 'admin@apexbio.com';

  // Determine if currently at dashboard root
  const isRootDashboard = currentPath === '/admin' || currentPath === '/admin/dashboard';

  // Compute clean single page heading based on current path
  const getPageTitle = () => {
    const path = currentPath.toLowerCase();
    if (path === '/admin' || path === '/admin/dashboard') return 'Dashboard';
    if (path.includes('/products/add') || path.includes('/products/create')) return 'Add New Product';
    if (path.includes('/products/') && path.includes('/edit')) return 'Edit Product';
    if (path.startsWith('/admin/products/') && path.split('/').filter(Boolean).length === 3) return 'Product Details';
    if (path.startsWith('/admin/product')) return 'Products';
    if ((path.includes('/category/') || path.includes('/categories/')) && path.includes('/edit')) return 'Edit Category';
    if (path.includes('/category/add') || path.includes('/category/create') || path === '/admin/addcategory') return 'Add Category';
    if (path.startsWith('/admin/categor')) return 'Categories';
    if (path.includes('/therapeutic')) return 'Therapeutic Areas';
    if (path.includes('/enquiries')) return 'Enquiries';
    if (path.includes('/settings')) return 'Settings';

    const parts = currentPath.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || 'Dashboard';
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  const pageTitle = getPageTitle();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {!isRootDashboard && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>
        )}

        <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <span className="block text-xs font-semibold text-slate-900 truncate max-w-[120px]">{adminName}</span>
            <span className="block text-[10px] text-slate-400 font-mono truncate max-w-[140px]">{adminEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

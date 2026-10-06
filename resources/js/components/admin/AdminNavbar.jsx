import { Menu, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminNavbar({ onToggleSidebar }) {
  const { url, props } = usePage();
  const currentPath = url.split('?')[0];

  const authUser = props.auth?.user || {};
  const adminName = authUser.name || 'Administrator';
  const adminEmail = authUser.email || 'admin@ciplon.com';

  const getNavContext = () => {
    const path = currentPath.toLowerCase();

    // Top-level sections (Primary sidebar destinations - NO back button)
    if (path === '/admin' || path === '/admin/dashboard') {
      return { title: 'Dashboard', parent: null };
    }
    if (path === '/admin/products') {
      return { title: 'Products', parent: null };
    }
    if (path === '/admin/categories') {
      return { title: 'Categories', parent: null };
    }
    if (path === '/admin/staff') {
      return { title: 'Staff & Team', parent: null };
    }
    if (path === '/admin/roles') {
      return { title: 'Roles & Permissions', parent: null };
    }
    if (path === '/admin/settings') {
      return { title: 'Settings', parent: null };
    }
    if (path === '/admin/therapeutic') {
      return { title: 'Therapeutic Areas', parent: null };
    }
    if (path === '/admin/enquiries') {
      return { title: 'Enquiries', parent: null };
    }

    // Sub-pages with explicit parent link & breadcrumb
    if (path.includes('/products/add') || path.includes('/products/create')) {
      return { title: 'Add New Product', parent: { label: 'Products', url: '/admin/products' } };
    }
    if (path.includes('/products/') && path.includes('/edit')) {
      return { title: 'Edit Product', parent: { label: 'Products', url: '/admin/products' } };
    }
    if (path.startsWith('/admin/products/') && path.split('/').filter(Boolean).length === 3) {
      return { title: 'Product Details', parent: { label: 'Products', url: '/admin/products' } };
    }
    if ((path.includes('/category/') || path.includes('/categories/')) && path.includes('/edit')) {
      return { title: 'Edit Category', parent: { label: 'Categories', url: '/admin/categories' } };
    }
    if (path.includes('/category/add') || path.includes('/category/create') || path === '/admin/addcategory') {
      return { title: 'Add Category', parent: { label: 'Categories', url: '/admin/categories' } };
    }
    if (path.includes('/staff/create') || path.includes('/staff/add')) {
      return { title: 'Add Staff Member', parent: { label: 'Staff & Team', url: '/admin/staff' } };
    }
    if (path.includes('/staff/') && path.includes('/edit')) {
      return { title: 'Edit Staff Member', parent: { label: 'Staff & Team', url: '/admin/staff' } };
    }
    if (path.includes('/roles/create')) {
      return { title: 'Create Role', parent: { label: 'Roles & Permissions', url: '/admin/roles' } };
    }
    if (path.includes('/roles/') && path.includes('/edit')) {
      return { title: 'Configure Permissions', parent: { label: 'Roles & Permissions', url: '/admin/roles' } };
    }

    const parts = currentPath.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || 'Dashboard';
    const fallbackTitle = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    return { title: fallbackTitle, parent: null };
  };

  const navContext = getNavContext();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {navContext.parent ? (
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={navContext.parent.url}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              title={`Back to ${navContext.parent.label}`}
              aria-label={`Back to ${navContext.parent.label}`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm min-w-0">
              <Link
                href={navContext.parent.url}
                className="hidden sm:inline hover:text-slate-900 transition-colors truncate font-medium text-slate-500"
              >
                {navContext.parent.label}
              </Link>
              <span className="hidden sm:inline text-slate-300">/</span>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                {navContext.title}
              </h1>
            </div>
          </div>
        ) : (
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
            {navContext.title}
          </h1>
        )}
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
          <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
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

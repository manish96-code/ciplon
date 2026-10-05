// Header component with integrated searchbar, logo, responsive navigation, and mobile menu
import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, X, ArrowRight, ShieldCheck, Phone, Mail, Search } from 'lucide-react';
import Container from './common/Container';
import Button from './common/Button';

export default function Header({ companyData, onOpenEnquiryModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { url } = usePage();
  const currentPath = url.split('?')[0];
  const isProductsPage = currentPath.startsWith('/products');

  const getQueryParam = (param) => {
    try {
      const searchParams = new URLSearchParams(url.split('?')[1] || '');
      return searchParams.get(param) || '';
    } catch {
      return '';
    }
  };

  const [searchTerm, setSearchTerm] = useState(getQueryParam('search'));

  // Keep search term synchronized with URL search parameter
  useEffect(() => {
    setSearchTerm(getQueryParam('search'));
  }, [url]);

  // Monitor scroll offset to adjust navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    router.get('/products', trimmed ? { search: trimmed } : {}, { preserveState: true });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (isProductsPage) {
      router.get('/products', {}, { preserveState: true });
    }
  };

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const companyName = companyData?.company_name || companyData?.name || 'ApexBio';
  const companyPhone = companyData?.company_phone || companyData?.phone || '';
  const companyEmail = companyData?.enquiries_email || companyData?.enquiriesEmail || companyData?.company_email || companyData?.email || '';
  const logoUrl = companyData?.logo_url || companyData?.logoUrl;
  const isWhoGmp = companyData?.who_gmp_certified ?? companyData?.whoGmpCertified ?? false;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav
        className={`bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? 'border-b border-slate-100 py-2.5'
            : 'border-b border-slate-100/80 py-3'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <Link
              href="/"
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
              title="Home"
            >
              {logoUrl ? (
                <div className="h-10 flex items-center">
                  <img
                    src={logoUrl}
                    alt={companyName}
                    className="h-9 w-auto max-w-[150px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white transition-transform group-hover:scale-[1.02]">
                  <ShieldCheck className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-none">
                  {companyName}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-teal-700 mt-1">
                  Pharmaceuticals
                </span>
              </div>
            </Link>

            {/* Desktop search bar */}
            <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search formulations, molecules..."
                  className="w-full pl-9 pr-8 py-2 bg-slate-100/70 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500/20 transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50/60 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Actions: Search toggle & Hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className={`p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors md:hidden ${
                  mobileSearchOpen ? 'bg-teal-50 text-teal-700' : ''
                }`}
                aria-label="Toggle mobile search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expandable Mobile Search Row */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-2.5 pt-2.5 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search formulations, molecules..."
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>
          )}

          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 pb-4 space-y-2 bg-white animate-in fade-in duration-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 mt-2 border-t border-slate-100 space-y-2">
                <Button
                  variant="primary"
                  className="w-full justify-center bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                  icon={ArrowRight}
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All Formulations
                </Button>

                {companyPhone && (
                  <div className="pt-2 text-center text-xs text-slate-500">
                    <a href={`tel:${companyPhone.replace(/\s+/g, '')}`} className="block py-1 font-medium text-teal-700">
                      {companyPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}

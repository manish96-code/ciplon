import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, X, ArrowRight, ShieldCheck, Phone, Mail, Search, Award, FileText, Globe } from 'lucide-react';
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

  useEffect(() => {
    setSearchTerm(getQueryParam('search'));
  }, [url]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.get(`/products?search=${encodeURIComponent(trimmed)}`);
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    } else if (isProductsPage) {
      router.get('/products');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (isProductsPage && getQueryParam('search')) {
      router.get('/products');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Formulations', href: '/products' },
    { name: 'Therapeutic Areas', href: '/#therapeutic-areas' },
    { name: 'Quality & GMP', href: '/#quality' },
    { name: 'R&D Pipeline', href: '/#rd' },
    { name: 'Corporate', href: '/#about' },
  ];

  const companyName = companyData?.company_name || companyData?.companyName || 'Ciplon Life Sciences';
  const companyPhone = companyData?.company_phone || companyData?.companyPhone || '+91 800 458 7290';
  const companyEmail = companyData?.enquiries_email || companyData?.enquiriesEmail || 'enquiry@ciplon.com';
  const logoUrl = companyData?.logo_url || companyData?.logoUrl;
  const isWhoGmp = companyData?.who_gmp_certified ?? true;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 shadow-xs">
      {/* Top Corporate Utility Bar - Light Theme */}
      <div className="hidden lg:block bg-slate-100/90 text-slate-600 text-[11px] py-1.5 border-b border-slate-200">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <Award className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>WHO-GMP & ISO 9001:2015 Validated Manufacturing Facilities</span>
              </span>
              <span className="hidden xl:flex items-center gap-1.5 text-slate-500 font-medium">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Global Exports & Finished Formulations</span>
              </span>
            </div>

            <div className="flex items-center gap-5 font-medium">
              <a
                href={`mailto:${companyEmail}`}
                className="flex items-center gap-1.5 hover:text-teal-800 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                <span>{companyEmail}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={`tel:${companyPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-teal-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>{companyPhone}</span>
              </a>
              <span className="text-slate-300">|</span>
              <Link
                href="/login"
                className="text-slate-600 hover:text-teal-800 transition-colors font-semibold flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-slate-500" />
                <span>Portal Login</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled ? 'border-b border-slate-200/90 py-2.5 shadow-sm' : 'border-b border-slate-200 py-3.5'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Ciplon Brand Logo */}
            <Link
              href="/"
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
              title="Ciplon Life Sciences"
            >
              {logoUrl ? (
                <div className="h-10 flex items-center">
                  <img
                    src={logoUrl}
                    alt={companyName}
                    className="h-9 w-auto max-w-[160px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-700/15 transition-transform group-hover:scale-[1.02]">
                  <ShieldCheck className="w-5 h-5 text-teal-100 stroke-[2.2]" />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                  {companyName.toUpperCase().replace(' PHARMACEUTICALS', '').replace(' LIFE SCIENCES', '')}
                  <span className="text-teal-700">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mt-1">
                  Pharmaceuticals &bull; WHO-GMP
                </span>
              </div>
            </Link>

            {/* Desktop search bar */}
            <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search molecules, brands, indications..."
                  className="w-full pl-10 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-teal-600 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/15 transition-all"
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

            {/* Primary Nav Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (typeof onOpenEnquiryModal === 'function') {
                    onOpenEnquiryModal();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="ml-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs"
              >
                Inquire Now
              </Button>
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
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search molecules, brands, indications..."
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

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 pb-4 space-y-2 bg-white animate-in fade-in duration-200">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-slate-100 space-y-2">
                <Button
                  variant="primary"
                  className="w-full justify-center bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold py-2.5"
                  icon={ArrowRight}
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Product Catalog
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

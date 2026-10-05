import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout({ children, companyData: propCompanyData, categories: propCategories }) {
  const { url, props } = usePage();
  const companyData = propCompanyData || props.company || {};
  const categories = propCategories || props.navCategories || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-teal-600 selection:text-white antialiased">
      <Header
        companyData={companyData}
        categories={categories}
      />

      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer
        companyData={companyData}
        categories={categories}
      />
    </div>
  );
}

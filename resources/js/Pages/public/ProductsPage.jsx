// Products catalog page with slim category filter navbar and streamlined product grid
import { useMemo } from 'react';
import { router } from '@inertiajs/react';
import { Pill, RefreshCw } from 'lucide-react';
import PublicLayout from '../../layouts/PublicLayout';
import Container from '../../components/common/Container';
import ProductCard from '../../components/home/ProductCard';

export default function ProductsPage({ products = [], categories = [], filters = {} }) {
  const searchQuery = filters.search || '';
  const selectedCategory = filters.category || 'All';

  // Sync category selection via Inertia GET
  const handleCategorySelect = (category) => {
    const params = {};
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }
    if (category !== 'All') {
      params.category = category;
    }
    router.get('/products', params, { preserveState: true });
  };

  // Reset search and category filters
  const handleResetFilters = () => {
    router.get('/products', {}, { preserveState: true });
  };

  // Safely extract category names list
  const availableCategories = useMemo(() => {
    const list = ['All'];

    if (Array.isArray(categories)) {
      categories.forEach((cat) => {
        const name = typeof cat === 'object' && cat?.name ? cat.name : cat;
        if (name && name !== 'All' && !list.includes(name)) {
          list.push(name);
        }
      });
    }

    if (Array.isArray(products)) {
      products.forEach((p) => {
        const catName = typeof p.category === 'object' && p.category?.name
          ? p.category.name
          : (typeof p.category === 'string' ? p.category : p.therapeuticArea);
        if (catName && !list.includes(catName)) {
          list.push(catName);
        }
      });
    }

    return list;
  }, [categories, products]);

  // Filter products by search query and category (or trust backend filter)
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.filter((p) => {
      if (!p) return false;

      // Category matching
      if (selectedCategory !== 'All') {
        const catName = typeof p.category === 'object' && p.category?.name
          ? p.category.name
          : (typeof p.category === 'string' ? p.category : p.therapeuticArea || '');
        if (catName.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search keyword matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const brand = (p.brand_name || p.brandName || '').toLowerCase();
        const generic = (p.generic_name || p.genericName || '').toLowerCase();
        const code = (p.product_code || p.productCode || '').toLowerCase();
        const desc = (p.description || p.short_description || '').toLowerCase();

        return brand.includes(q) || generic.includes(q) || code.includes(q) || desc.includes(q);
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All';

  return (
    <PublicLayout categories={categories}>
      <div className="min-h-screen bg-slate-50/50 pb-12">
        <div className="sticky top-[57px] sm:top-[61px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <Container>
            <div className="flex items-center justify-between gap-4 py-2 sm:py-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>

        <Container className="pt-4 sm:pt-5">
          {hasActiveFilters && (
            <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-600 bg-white rounded-xl px-3.5 py-2 border border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Showing results for</span>
                {selectedCategory !== 'All' && (
                  <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    {selectedCategory}
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                    "{searchQuery.trim()}"
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer shrink-0 inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-10 text-center max-w-lg mx-auto space-y-3.5 my-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto text-teal-600">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No Formulations Found
              </h3>
              <p className="text-xs text-slate-500">
                No products match your current search query or category filter. Try searching for other molecules or reset filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product.product_code || product.brand_name}
                  product={product}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    </PublicLayout>
  );
}

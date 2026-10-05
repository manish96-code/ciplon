// FeaturedProducts component rendering top 6 featured and latest formulations for homepage showcase
import { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ProductCard from './ProductCard';
import Button from '../common/Button';

export default function FeaturedProducts({ products = [] }) {
  // Sort featured products first, then latest non-featured products, and cap at exactly 6 products
  const displayedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    const isFeatured = (p) => Boolean(
      p?.is_featured === true ||
      p?.is_featured === 1 ||
      p?.is_featured === '1' ||
      p?.featured === true ||
      p?.badge
    );

    const sorted = [...products].sort((a, b) => {
      const aFeat = isFeatured(a) ? 1 : 0;
      const bFeat = isFeatured(b) ? 1 : 0;
      if (bFeat !== aFeat) {
        return bFeat - aFeat;
      }
      const aId = Number(a?.id) || 0;
      const bId = Number(b?.id) || 0;
      return bId - aId;
    });

    return sorted.slice(0, 6);
  }, [products]);

  return (
    <section id="products" className="py-10 lg:py-14 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <SectionHeading
          badge="Product Portfolio"
          title="Featured Formulations"
          subtitle="Explore our portfolio of pharmaceutical products across multiple therapeutic areas."
          description="Formulated with high-grade active pharmaceutical ingredients (APIs) and advanced excipient delivery systems, our portfolio is tailored to meet demanding clinical and distribution requirements."
        />

        {displayedProducts.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-sm">
            No formulations currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id || product.product_code || product.brand_name}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-all hover:gap-2.5 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Need detailed product dossiers or distribution licensing?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Our regulatory affairs team provides comprehensive technical documentation, stability data, and Certificates of Analysis (COA) for institutional partners.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="medical"
              size="md"
              icon={ArrowRight}
              href="#contact"
            >
              Contact Regulatory Affairs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

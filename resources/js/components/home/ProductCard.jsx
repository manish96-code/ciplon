// Minimal and interactive ProductCard with image, dosage form badge, clean name, and full card clickability
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Pill, FlaskConical, Droplet, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const productId = product.id || product.product_code || product.productCode || product.slug;
  const brandName = product.brandName || product.brand_name || 'Pharmaceutical Product';
  const genericName = product.genericName || product.generic_name || '';
  const dosageForm = product.dosageForm || product.dosage_form || 'Formulation';
  const strength = product.strength || '';
  const categoryName = product.category?.name || (typeof product.category === 'string' ? product.category : '') || product.therapeuticArea || '';

  // Extract primary image URL from API resource or static fallbacks
  const imageUrl =
    product.imageUrl ||
    product.image_url ||
    product.image ||
    product.primary_image?.url ||
    product.primary_image?.image_url ||
    product.primaryImage?.url ||
    product.primaryImage?.image_url ||
    (Array.isArray(product.images) && product.images.length > 0
      ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url || product.images[0]?.image_url)
      : null);

  // Return representative dosage form icon
  const getDosageIcon = (form = '') => {
    const safeForm = String(form || '').toLowerCase();
    if (safeForm.includes('capsule')) {
      return (
        <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" />
          <line x1="8" y1="8" x2="16" y2="16" />
        </svg>
      );
    }
    if (safeForm.includes('syrup') || safeForm.includes('liquid') || safeForm.includes('suspension')) {
      return <FlaskConical className="w-6 h-6 text-teal-600" />;
    }
    if (safeForm.includes('drop')) {
      return <Droplet className="w-6 h-6 text-teal-600" />;
    }
    return <Pill className="w-6 h-6 text-teal-600" />;
  };

  return (
    <Link
      href={`/products/${productId}`}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-teal-500/40 transition-colors duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        <div className="relative w-full h-44 sm:h-48 bg-slate-50/70 border-b border-slate-100/70 flex items-center justify-center overflow-hidden">
          <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-teal-700 text-white">
            {dosageForm}
          </span>

          {strength && (
            <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 bg-white/90">
              {strength}
            </span>
          )}

          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={brandName}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-100/60 p-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-teal-700 group-hover:scale-105 transition-transform duration-200">
                {getDosageIcon(dosageForm)}
              </div>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-4">
          {categoryName && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 block mb-0.5">
              {categoryName}
            </span>
          )}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
            {brandName}
          </h3>
          {genericName && (
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
              {genericName}
            </p>
          )}
        </div>
      </div>

      <div className="px-3.5 sm:px-4 pb-3.5 pt-0">
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-600 truncate">
            {dosageForm}
          </span>
          <span className="text-teal-700 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

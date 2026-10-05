// ProductDetailModal component presenting pharmaceutical specifications in clean light theme
import { X, Shield, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function ProductDetailModal({ product, onClose, onEnquire }) {
  if (!product) return null;

  const brandName = product.brandName || product.brand_name || 'Product Details';
  const genericName = product.genericName || product.generic_name || '';
  const productCode = product.productCode || product.product_code || '';
  const dosageForm = product.dosageForm || product.dosage_form || 'Formulation';
  const strength = product.strength || '';
  const packSize = product.packSize || product.pack_size || '';
  const categoryName = product.category?.name || (typeof product.category === 'string' ? product.category : '') || product.therapeuticArea || '';
  const composition = product.composition || (Array.isArray(product.compositions) ? product.compositions.map(c => `${c.ingredient_name || ''} ${c.strength || ''}`).join(', ') : '') || product.description || 'Pharmaceutical formulation specifications available on request.';
  const indications = product.indications || product.description || 'Clinical therapeutic indication data available in registered product technical dossier.';
  const storage = product.storage || 'Store in a cool, dry place below 25°C. Protect from direct sunlight and moisture.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200 text-slate-900 rounded-t-3xl relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            {productCode && (
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                {productCode}
              </span>
            )}
            {categoryName && (
              <span className="text-xs text-slate-500 font-medium">
                {categoryName}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {brandName}
          </h3>
          {genericName && (
            <p className="text-sm text-teal-700 font-medium mt-1">
              {genericName}
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Dosage Form</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{dosageForm}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Strength</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{strength || 'Standard'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Packaging</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{packSize || 'Commercial Unit'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Composition
            </h4>
            <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-800 leading-relaxed">
              {composition}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Therapeutic Indications
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {indications}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Storage Instructions
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              {storage}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-950 flex items-start gap-3">
            <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Regulatory Notice:</strong> Product dossiers (CTD / ACTD formats), certificates of pharmaceutical product (COPP), and stability data are available upon authorized distributor registration.
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            onClick={() => {
              onClose();
              onEnquire(product);
            }}
            className="w-full sm:w-auto"
          >
            Enquire for Commercial Distribution
          </Button>
        </div>
      </div>
    </div>
  );
}

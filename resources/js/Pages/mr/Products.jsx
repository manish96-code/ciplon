import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import {
  Pill,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  FileText,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  Maximize2,
  Minimize2,
  Calendar,
  Building2,
  BookOpen,
  Info,
  Check,
  Stethoscope,
  ExternalLink,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';
import MRLayout from '../../layouts/MR/MRLayout';

export default function Products({ initialFilters = {} }) {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [search, setSearch] = useState(initialFilters.search || '');
  const [categoryFilter, setCategoryFilter] = useState(initialFilters.category || 'all');
  const [dosageFilter, setDosageFilter] = useState(initialFilters.dosage_form || 'all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Detailing modal & Presentation mode state
  const [detailProduct, setDetailProduct] = useState(null);
  const [presentationMode, setPresentationMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (dosageFilter !== 'all') params.dosage_form = dosageFilter;

      const res = await axios.get('/api/v1/mr/products', { params });
      if (res.data?.success) {
        setProducts(res.data.data || []);
        setMeta(res.data.meta || null);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Unable to load product catalog. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, categoryFilter, dosageFilter]);

  // Open E-Detailing Full-Screen Mode
  const handleOpenPresentation = (prod, slideIndex = 0) => {
    setDetailProduct(prod);
    setActiveSlide(slideIndex);
    setPresentationMode(true);
  };

  // Close E-Detailing Mode
  const handleClosePresentation = () => {
    setPresentationMode(false);
  };

  // Next / Prev slide handlers
  const handleNextSlide = () => {
    if (activeSlide < 3) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!presentationMode) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'Escape') {
        handleClosePresentation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, activeSlide]);

  return (
    <MRLayout title="Products & Digital Detailing Aids">
      <div className="space-y-5 max-w-7xl mx-auto pb-10">

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Product Portfolio & E-Detailing
              </h1>
              {meta?.total !== undefined && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  {meta.total} Formulations
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive pharmaceutical visual aids, molecule compositions, and prescribing guides for in-clinic doctor calls
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchProducts}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Refresh products catalog"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-700' : ''}`} />
            </button>

            <Link
              href="/mr/visits"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4 stroke-[2.2]" />
              <span>Field Visits</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by brand name, generic molecule, indication, or composition..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/10 transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-56">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Therapeutic Segments</option>
                {meta?.categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.products_count ?? 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Dosage Form Filter */}
            <div className="w-full md:w-44">
              <select
                value={dosageFilter}
                onChange={(e) => setDosageFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Dosage Forms</option>
                {meta?.dosage_forms?.map((form) => (
                  <option key={form} value={form}>{form}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl self-end md:self-center shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid presentation cards"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List view"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content: Loading / Error / Empty / Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs animate-pulse space-y-3">
                <div className="h-32 bg-slate-100 rounded-xl w-full" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-8 bg-slate-100 rounded w-full mt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900">{error}</h3>
            <button
              type="button"
              onClick={fetchProducts}
              className="text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
            >
              Retry Loading Catalog
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
              <Pill className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Formulations Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No products match your current search query or therapeutic category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategoryFilter('all');
                setDosageFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => {
              const primaryImg = p.primary_image?.file_path || p.images?.[0]?.file_path;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-teal-400 hover:shadow-sm transition-all p-5 flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    {/* Header: Packshot & Badges */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                        {primaryImg ? (
                          <img
                            src={primaryImg}
                            alt={p.brand_name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Pill className="w-8 h-8 text-teal-700" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          {p.category && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                              {p.category.name}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            p.prescription_type === 'Rx Only'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {p.prescription_type || 'Rx'}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors truncate">
                          {p.brand_name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                          {p.generic_name}
                        </p>
                        <div className="text-[10px] text-teal-800 font-semibold mt-0.5">
                          {p.dosage_form} • {p.strength}
                        </div>
                      </div>
                    </div>

                    {/* Active Compositions */}
                    {p.compositions && p.compositions.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {p.compositions.map((c) => (
                          <span
                            key={c.id}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-teal-50 text-teal-800 border border-teal-200/60"
                          >
                            {c.ingredient_name} ({c.strength} {c.unit})
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Indications Preview */}
                    {p.indications && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        <span className="font-semibold text-slate-700">Indications: </span>
                        {p.indications}
                      </p>
                    )}
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setDetailProduct(p)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="View Prescribing Guide"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Guide</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenPresentation(p, 0)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Open Interactive Visual Aid for Doctor Presentation"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Present Visual Aid</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List / Detailing Table View */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Brand & Molecule</th>
                    <th className="py-3 px-4">Segment</th>
                    <th className="py-3 px-4">Dosage / Strength</th>
                    <th className="py-3 px-4">Active Compositions</th>
                    <th className="py-3 px-4 text-right">Detailing Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-teal-50/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{p.brand_name}</div>
                        <div className="text-[11px] text-slate-500">{p.generic_name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {p.category?.name || 'General'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {p.dosage_form} <span className="text-slate-400">•</span> {p.strength}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.compositions?.slice(0, 2).map((c) => (
                            <span key={c.id} className="text-[10px] bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded font-medium">
                              {c.ingredient_name}
                            </span>
                          ))}
                          {p.compositions?.length > 2 && (
                            <span className="text-[10px] text-slate-400">+{p.compositions.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailProduct(p)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Guide
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenPresentation(p, 0)}
                          className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Present</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Slide-out Prescribing Guide Drawer */}
      {detailProduct && !presentationMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white h-full w-full max-w-lg shadow-2xl p-6 overflow-y-auto space-y-5 animate-in slide-in-from-right duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  {detailProduct.category?.name || 'Therapeutic Portfolio'}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{detailProduct.brand_name}</h2>
                <p className="text-xs text-slate-500 font-medium">{detailProduct.generic_name}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compositions Card */}
            {detailProduct.compositions && detailProduct.compositions.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-700" />
                  <span>Active Pharmaceutical Ingredients (API)</span>
                </h4>
                <div className="divide-y divide-slate-200/60 text-xs">
                  {detailProduct.compositions.map((c) => (
                    <div key={c.id} className="py-1.5 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{c.ingredient_name}</span>
                      <span className="font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {c.strength} {c.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indications & Therapeutic Usage */}
            {detailProduct.indications && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                  <span>Therapeutic Indications</span>
                </h4>
                <p className="text-xs text-slate-600 bg-teal-50/40 p-3 rounded-xl border border-teal-100 leading-relaxed">
                  {detailProduct.indications}
                </p>
              </div>
            )}

            {/* Dosage & Administration */}
            {detailProduct.directions && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>Dosage & Directions for Use</span>
                </h4>
                <p className="text-xs text-slate-600 p-3 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                  {detailProduct.directions}
                </p>
              </div>
            )}

            {/* Precautions */}
            {detailProduct.precautions && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Precautions & Contraindications</span>
                </h4>
                <p className="text-xs text-slate-600 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 leading-relaxed">
                  {detailProduct.precautions}
                </p>
              </div>
            )}

            {/* Storage */}
            {detailProduct.storage && (
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700">Storage Guidelines: </span>
                {detailProduct.storage}
              </div>
            )}

            {/* Bottom Launch Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenPresentation(detailProduct, 0)}
                className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Visual Aid Presentation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN E-DETAILING INTERACTIVE VISUAL AID PRESENTATION DECK */}
      {presentationMode && detailProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
          
          {/* Top Presentation Bar */}
          <div className="h-14 px-6 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight">{detailProduct.brand_name}</span>
                <span className="text-xs text-slate-400 ml-2 font-normal hidden sm:inline">
                  — Ciplon Visual Aid Presentation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Slide Counter */}
              <div className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Slide <span className="text-teal-400 font-bold">{activeSlide + 1}</span> of 4
              </div>

              {/* Close / Exit Button */}
              <button
                type="button"
                onClick={handleClosePresentation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Exit Deck</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-800 w-full">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${((activeSlide + 1) / 4) * 100}%` }}
            />
          </div>

          {/* Central Presentation Stage */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <div className="max-w-5xl w-full">

              {/* SLIDE 1: Molecule Profile & Brand Hero */}
              {activeSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 p-6 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full" />
                      {detailProduct.primary_image?.file_path || detailProduct.images?.[0]?.file_path ? (
                        <img
                          src={detailProduct.primary_image?.file_path || detailProduct.images?.[0]?.file_path}
                          alt={detailProduct.brand_name}
                          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        />
                      ) : (
                        <Pill className="w-28 h-28 text-teal-400 relative z-10" />
                      )}
                    </div>
                    <span className="mt-3 text-xs text-slate-400 font-semibold tracking-wider uppercase">
                      {detailProduct.dosage_form} • {detailProduct.strength}
                    </span>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {detailProduct.category?.name || 'Therapeutic Core'}
                      </span>
                      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
                        {detailProduct.brand_name}
                      </h1>
                      <h3 className="text-base md:text-lg text-slate-300 font-medium mt-1">
                        {detailProduct.generic_name}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {detailProduct.short_description || detailProduct.description}
                    </p>

                    {/* APIs Box */}
                    {detailProduct.compositions && detailProduct.compositions.length > 0 && (
                      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2.5">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                          Formulation Composition
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {detailProduct.compositions.map((c) => (
                            <div key={c.id} className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60">
                              <span className="block text-xs font-semibold text-white">{c.ingredient_name}</span>
                              <span className="block text-[11px] text-teal-400 font-mono mt-0.5">
                                {c.strength} {c.unit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Clinical Indications & Target Patients */}
              {activeSlide === 1 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      Slide 2 • Clinical Indications
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                      Therapeutic Spectrum & Indications
                    </h2>
                    <p className="text-xs md:text-sm text-slate-400">
                      Prescription profiling and targeted clinical conditions for {detailProduct.brand_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-4 shadow-xl">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Target Patient Symptoms</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {detailProduct.indications || 'Broad spectrum symptom management tailored for clinical OPD and hospital care.'}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-4 shadow-xl">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Clinical Efficacy Highlights</h3>
                      <ul className="text-sm text-slate-300 space-y-2.5">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>Rapid onset of pharmacological relief with sustained therapeutic bioavailability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>High gastrointestinal tolerability reducing treatment abandonment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>Suitable for standard outpatient prescribing across diverse demographics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Dosage Guidelines & Safety Profile */}
              {activeSlide === 2 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      Slide 3 • Administration & Safety
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                      Dosage Protocol & Tolerability
                    </h2>
                    <p className="text-xs md:text-sm text-slate-400">
                      Recommended clinical administration regimen and safety profile
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3 shadow-xl">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Recommended Dosage</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {detailProduct.directions || 'As advised by the physician. Typically administered once or twice daily after meals.'}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3 shadow-xl">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Safety & Precautions</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {detailProduct.precautions || 'Contraindicated in documented hypersensitivity to active ingredients.'}
                      </p>
                    </div>

                    <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3 shadow-xl">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Storage & Packaging</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {detailProduct.storage || 'Store below 25°C in a dry place. Protect from moisture and direct light.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: The Ciplon Clinical Advantage (Summary) */}
              {activeSlide === 3 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200 text-center max-w-3xl mx-auto">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      Slide 4 • Competitive Edge
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                      Why Prescribe {detailProduct.brand_name}?
                    </h2>
                    <p className="text-sm text-slate-300">
                      Key differentiators engineered for therapeutic excellence and high patient compliance
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {[
                      { title: 'GMP Certified Formulation', desc: 'Manufactured under WHO-GMP cleanrooms with validated purity profiles.' },
                      { title: 'Optimized Bioavailability', desc: 'Superior molecular micronization ensuring rapid intestinal uptake.' },
                      { title: 'Moisture Barrier Packaging', desc: 'Alu-Alu blister protection safeguarding stability across all climatic zones.' },
                      { title: 'Affordable Patient Pricing', desc: 'Ensures uninterrupted therapy completion and sustained prescription adherence.' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <Link
                      href="/mr/visits"
                      className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Log Visit Detailing This Molecule</span>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Presentation Deck Navigation Toolbar */}
          <div className="h-20 px-6 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between backdrop-blur-md">
            
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevSlide}
              disabled={activeSlide === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Slide Navigation Pills */}
            <div className="flex items-center gap-2">
              {['1. Molecule Intro', '2. Indications', '3. Dosage & Safety', '4. Ciplon Advantage'].map((title, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextSlide}
              disabled={activeSlide === 3}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition-colors shadow-xs cursor-pointer"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}

    </MRLayout>
  );
}
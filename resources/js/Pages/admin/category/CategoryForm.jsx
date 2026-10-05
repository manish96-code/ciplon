import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { 
  AlertCircle, 
  Layers, 
  FileText, 
  ToggleLeft,
  FolderPlus,
  FolderEdit
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

// Helper function to capitalize first letter of a string
const ucfirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function CategoryForm({ category = null, parentCategories = [] }) {
  const isEditMode = Boolean(category?.id);

  const { data, setData, post, put, processing, errors, clearErrors } = useForm({
    name: category?.name || '',
    parent_id: category?.parent_id ? String(category.parent_id) : '',
    description: category?.description || '',
    status: category?.status || 'active',
  });

  const [slugPreview, setSlugPreview] = useState(category?.slug || '');

  // Handle input changes with automatic first-letter capitalization
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'name' && val.length > 0) {
      val = ucfirst(val);
      // Auto-preview slug
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlugPreview(generatedSlug);
    }

    setData(name, val);

    if (errors[name]) {
      clearErrors(name);
    }
  };

  // Handle form submission for both create and update
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...data,
      name: data.name.trim(),
      parent_id: data.parent_id ? parseInt(data.parent_id, 10) : null,
      description: data.description.trim() || null,
    };

    if (isEditMode) {
      put(`/admin/categories/${category.id}`, {
        data: payload,
      });
    } else {
      post('/admin/categories', {
        data: payload,
      });
    }
  };

  // Filter out the current category from parent dropdown in edit mode
  const filteredParents = parentCategories.filter((cat) => {
    if (!isEditMode) return true;
    return String(cat.id) !== String(category?.id);
  });

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12 pt-2">
        {errors.general && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-rose-900">Error</h4>
              <p className="text-xs text-rose-700 mt-0.5">{errors.general}</p>
            </div>
            <button
              type="button"
              onClick={() => clearErrors('general')}
              className="text-xs font-semibold text-rose-800 hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                {isEditMode ? <FolderEdit className="w-5 h-5" /> : <FolderPlus className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isEditMode ? 'Edit Pharmaceutical Category' : 'Create New Category'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure classification hierarchy, therapeutic domain, and publication state.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Category Name *</span>
                  <span className="text-[10px] text-slate-400 font-normal">Capitalized automatically</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="e.g. Cardiovascular Agents"
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors outline-none ${
                    errors.name
                      ? 'border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.name}
                  </p>
                )}
                {slugPreview && (
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    Slug preview: <span className="text-teal-600">/{slugPreview}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Parent Category (Hierarchy)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Leave empty for top-level</span>
                </label>
                <select
                  name="parent_id"
                  value={data.parent_id}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none cursor-pointer text-slate-700"
                >
                  <option value="">None (Top-Level Primary Category)</option>
                  {filteredParents.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.parent_id && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.parent_id}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clinical & Pharmacological Description</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Outline the therapeutic focus, indication categories, or physiological mechanism..."
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors outline-none resize-none text-slate-700"
                />
                {errors.description && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <ToggleLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Publication Status</span>
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={data.status === 'active'}
                      onChange={handleChange}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">Active (Visible in catalog)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={data.status === 'inactive'}
                      onChange={handleChange}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs font-semibold text-slate-500">Inactive (Draft / Hidden)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/categories"
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {processing && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{isEditMode ? 'Update Category' : 'Create Category'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

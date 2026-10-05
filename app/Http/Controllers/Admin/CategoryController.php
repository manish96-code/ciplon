<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    // Display a listing of categories with search and status filtering.
    public function index(Request $request): Response
    {
        $query = Category::query()
            ->with('parent:id,name,slug')
            ->withCount('children');

        if ($request->filled('search')) {
            $search = trim($request->query('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('parent_id')) {
            $parentId = $request->query('parent_id');
            if ($parentId === 'null' || $parentId === '' || $parentId === 'root') {
                $query->whereNull('parent_id');
            } elseif (is_numeric($parentId)) {
                $query->where('parent_id', (int) $parentId);
            }
        }

        $perPage = (int) $request->query('per_page', 15);
        $categories = $query->latest('id')->paginate($perPage)->withQueryString();

        return Inertia::render('admin/category/CategoryList', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->query('search', ''),
                'status' => $request->query('status', ''),
            ],
        ]);
    }

    // Show the form for creating a new category.
    public function create(): Response
    {
        $parentCategories = Category::query()
            ->whereNull('parent_id')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('admin/category/CategoryForm', [
            'parentCategories' => $parentCategories,
        ]);
    }

    // Store a newly created category in the database.
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'parent_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::enum(CategoryStatus::class)],
        ]);

        Category::create([
            'name' => $validated['name'],
            'slug' => Category::generateUniqueSlug($validated['name']),
            'parent_id' => $validated['parent_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'created_by' => $request->user()?->id,
            'updated_by' => $request->user()?->id,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    // Show the form for editing an existing category.
    public function edit(Category $category): Response
    {
        $descendantIds = $category->descendantIds();
        $excludedIds = array_merge([$category->id], $descendantIds);

        $parentCategories = Category::query()
            ->whereNotIn('id', $excludedIds)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('admin/category/CategoryForm', [
            'category' => $category,
            'parentCategories' => $parentCategories,
        ]);
    }

    // Update the specified category.
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories', 'name')->ignore($category->id)],
            'parent_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::enum(CategoryStatus::class)],
        ]);

        if (! empty($validated['parent_id'])) {
            $parentId = (int) $validated['parent_id'];

            if ($parentId === (int) $category->id) {
                return back()->withErrors(['parent_id' => 'A category cannot be its own parent.']);
            }

            if (in_array($parentId, $category->descendantIds())) {
                return back()->withErrors(['parent_id' => 'Cannot assign a descendant category as parent.']);
            }
        }

        $slug = $category->name !== $validated['name']
            ? Category::generateUniqueSlug($validated['name'], $category->id)
            : $category->slug;

        $category->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'parent_id' => $validated['parent_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'updated_by' => $request->user()?->id,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    // Remove the specified category.
    public function destroy(Category $category): RedirectResponse
    {
        if ($category->children()->exists()) {
            return back()->with('error', 'Cannot delete category with existing subcategories. Please reassign or delete subcategories first.');
        }

        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }

    // Update only the category status.
    public function updateStatus(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(CategoryStatus::class)],
        ]);

        $category->update([
            'status' => $validated['status'],
            'updated_by' => $request->user()?->id,
        ]);

        return back()->with('success', 'Category status updated successfully.');
    }
}

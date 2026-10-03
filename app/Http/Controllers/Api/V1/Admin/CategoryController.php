<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Enums\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    // Display a listing of categories.
    public function index(Request $request): JsonResponse
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

        // Allow fetching all categories (for dropdowns/selectors)
        if ($request->boolean('all')) {
            $categories = $query->orderBy('name')->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
            ]);
        }

        $perPage = (int) $request->query('per_page', 15);
        $categories = $query->latest('id')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $categories->items(),
            'meta' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
            ],
        ]);
    }

    // Store a newly created category in the database.
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'parent_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::enum(CategoryStatus::class)],
        ]);

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => Category::generateUniqueSlug($validated['name']),
            'parent_id' => $validated['parent_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'created_by' => $request->user()?->id,
            'updated_by' => $request->user()?->id,
        ]);

        $category->load('parent:id,name,slug');

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category,
        ], 201);
    }

    // Display the specified category.
    public function show(Category $category): JsonResponse
    {
        $category->load(['parent', 'children', 'creator:id,name,email', 'updater:id,name,email']);

        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    // Update the specified category.
    public function update(Request $request, Category $category): JsonResponse
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
                return response()->json([
                    'success' => false,
                    'message' => 'A category cannot be its own parent.',
                    'errors' => ['parent_id' => ['A category cannot be its own parent.']],
                ], 422);
            }

            if (in_array($parentId, $category->descendantIds())) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot assign a descendant category as parent.',
                    'errors' => ['parent_id' => ['Cannot assign a descendant category as parent.']],
                ], 422);
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

        $category->load('parent:id,name,slug');

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'data' => $category,
        ]);
    }

    // Remove the specified category.
    public function destroy(Category $category): JsonResponse
    {
        if ($category->children()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with existing subcategories. Please reassign or delete subcategories first.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.',
        ]);
    }

    // Update only the category status.
    public function updateStatus(Request $request, Category $category): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(CategoryStatus::class)],
        ]);

        $category->update([
            'status' => $validated['status'],
            'updated_by' => $request->user()?->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category status updated successfully.',
            'data' => $category,
        ]);
    }
}

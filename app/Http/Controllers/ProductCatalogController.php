<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCatalogController extends Controller
{
    // Display the public product portfolio with search and category filtering.
    public function index(Request $request): Response
    {
        $categories = Category::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $query = Product::query()
            ->where('status', 'active')
            ->with(['category:id,name,slug', 'primaryImage', 'images']);

        if ($request->filled('search')) {
            $search = trim($request->query('search'));
            $query->where(function ($q) use ($search) {
                $q->where('brand_name', 'like', "%{$search}%")
                    ->orWhere('generic_name', 'like', "%{$search}%")
                    ->orWhere('product_code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->query('category') !== 'All') {
            $catFilter = $request->query('category');
            $query->whereHas('category', function ($q) use ($catFilter) {
                $q->where('name', $catFilter)
                    ->orWhere('slug', $catFilter);
            });
        }

        $products = $query->latest('id')->get();

        return Inertia::render('public/ProductsPage', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->query('search', ''),
                'category' => $request->query('category', 'All'),
            ],
        ]);
    }

    // Display detailed pharmaceutical specifications for a single formulation.
    public function show(string $id): Response
    {
        $product = Product::query()
            ->where(function ($q) use ($id) {
                if (is_numeric($id)) {
                    $q->where('id', (int) $id);
                } else {
                    $q->where('slug', $id)->orWhere('product_code', $id);
                }
            })
            ->with([
                'category:id,name,slug',
                'compositions',
                'images',
                'primaryImage',
            ])
            ->firstOrFail();

        $relatedProducts = Product::query()
            ->where('status', 'active')
            ->where('id', '!=', $product->id)
            ->where('category_id', $product->category_id)
            ->with(['category:id,name,slug', 'primaryImage', 'images'])
            ->take(6)
            ->get();

        if ($relatedProducts->isEmpty()) {
            $relatedProducts = Product::query()
                ->where('status', 'active')
                ->where('id', '!=', $product->id)
                ->with(['category:id,name,slug', 'primaryImage', 'images'])
                ->take(6)
                ->get();
        }

        $categories = Category::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('public/ProductDetailsPage', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'categories' => $categories,
        ]);
    }

    // Handle commercial enquiry submissions from the modal.
    public function storeEnquiry(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
            'product_name' => ['nullable', 'string', 'max:255'],
        ]);

        return back()->with('success', 'Your enquiry has been received. Our medical and commercial team will contact you shortly.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    // Display admin dashboard with catalog statistics and recent products.
    public function index(): Response
    {
        $totalProducts = Product::count();
        $activeProducts = Product::where('status', 'active')->count();
        $featuredProducts = Product::where('is_featured', true)->count();
        $totalCategories = Category::count();

        $recentProducts = Product::query()
            ->with(['category:id,name,slug', 'primaryImage', 'images'])
            ->latest('id')
            ->take(5)
            ->get();

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'activeProducts' => $activeProducts,
                'featuredProducts' => $featuredProducts,
                'totalCategories' => $totalCategories,
            ],
            'recentProducts' => $recentProducts,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    // Display the public homepage with showcase products and categories.
    public function index(): Response
    {
        $categories = Category::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'description']);

        $featuredProducts = Product::query()
            ->where('status', 'active')
            ->with(['category:id,name,slug', 'primaryImage', 'images'])
            ->orderByDesc('is_featured')
            ->latest('id')
            ->take(8)
            ->get();

        return Inertia::render('public/HomePage', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'company' => Setting::getPublicMap(),
        ]);
    }
}

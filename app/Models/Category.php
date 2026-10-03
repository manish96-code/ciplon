<?php

namespace App\Models;

use App\Enums\CategoryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'status' => CategoryStatus::class,
    ];

    // Parent category relationship.
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Immediate children categories.
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // User who created the category.
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // User who last updated the category.
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Products belonging to this category.
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    // Polymorphic category images.
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'model')
            ->where('collection', 'category-image')
            ->orderBy('sort_order');
    }

    // Generate a unique slug for the category.
    public static function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    // Recursively retrieve all descendant IDs.
    public function descendantIds(): array
    {
        $ids = [];
        foreach ($this->children()->get(['id']) as $child) {
            $ids[] = $child->id;
            $ids = array_merge($ids, $child->descendantIds());
        }

        return $ids;
    }
}

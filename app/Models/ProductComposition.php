<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductComposition extends Model
{
    use HasFactory;

    protected $table = 'product_compositions';

    protected $fillable = [
        'product_id',
        'ingredient_name',
        'strength',
        'unit',
    ];

    /**
     * Parent product relationship.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

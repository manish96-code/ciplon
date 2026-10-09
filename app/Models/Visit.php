<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'doctor_id',
        'visit_date',
        'visit_time',
        'call_type',
        'status',
        'products_detailed',
        'doctor_feedback',
        'samples_given',
        'remarks',
        'next_visit_date',
    ];

    protected $casts = [
        'visit_date' => 'date:Y-m-d',
        'next_visit_date' => 'date:Y-m-d',
        'products_detailed' => 'array',
    ];

    public function representative(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function scopeForUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeToday(Builder $query): Builder
    {
        return $query->whereDate('visit_date', Carbon::today());
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', 'completed');
    }

    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeFilterByStatus(Builder $query, ?string $status): Builder
    {
        if (blank($status) || $status === 'all') {
            return $query;
        }

        return $query->where('status', $status);
    }

    public function scopeFilterByDate(Builder $query, ?string $date): Builder
    {
        if (blank($date) || $date === 'all') {
            return $query;
        }

        if ($date === 'today') {
            return $query->whereDate('visit_date', Carbon::today());
        }

        if ($date === 'upcoming') {
            return $query->whereDate('visit_date', '>=', Carbon::today());
        }

        if ($date === 'past') {
            return $query->whereDate('visit_date', '<', Carbon::today());
        }

        return $query->whereDate('visit_date', $date);
    }

    public function scopeFilterByDoctor(Builder $query, $doctorId): Builder
    {
        if (blank($doctorId) || $doctorId === 'all') {
            return $query;
        }

        return $query->where('doctor_id', $doctorId);
    }
}

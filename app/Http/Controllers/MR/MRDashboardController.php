<?php

namespace App\Http\Controllers\MR;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MRDashboardController extends Controller
{
    /**
     * Render the MR Dashboard Inertia view.
     */
    public function show(): Response
    {
        return Inertia::render('mr/Dashboard');
    }

    /**
     * API: Return dashboard statistics and activity feeds for the authenticated MR.
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $activeDoctors = Doctor::forUser($userId)->active()->get();
        $totalDoctors = $activeDoctors->count();
        $targetVisits = (int) $activeDoctors->sum('target_frequency_per_month');

        $dashboardData = [
            'summary' => [
                'today_visits' => 0,
                'completed_visits' => 0,
                'pending_visits' => 0,
                'follow_ups_due' => 0,
            ],
            'performance' => [
                'visits' => [
                    'completed' => 0,
                    'target' => $targetVisits,
                ],
                'doctors' => [
                    'covered' => 0,
                    'target' => $totalDoctors,
                ],
                'product_promotions' => [
                    'completed' => 0,
                    'target' => 0,
                ],
                'achievement' => 0,
            ],
            'today_visits' => [],
            'upcoming_followups' => [],
            'recent_activities' => [],
        ];

        return response()->json([
            'success' => true,
            'data' => $dashboardData,
        ]);
    }
}

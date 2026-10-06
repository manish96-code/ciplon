<?php

namespace App\Http\Controllers\MR;

use App\Http\Controllers\Controller;
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
        // Phase 1: Return zero / empty metrics adhering to the API specification
        // until future modules (Doctors, Visits, Samples, Targets) are implemented.
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
                    'target' => 0,
                ],
                'doctors' => [
                    'covered' => 0,
                    'target' => 0,
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

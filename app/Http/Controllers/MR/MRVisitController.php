<?php

namespace App\Http\Controllers\MR;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MRVisitController extends Controller
{
    /**
     * Render the MR Visits page.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('mr/Visits', [
            'initialFilters' => [
                'status' => $request->query('status', 'all'),
                'date' => $request->query('date', 'today'),
                'doctor_id' => $request->query('doctor_id', 'all'),
            ],
        ]);
    }

    /**
     * API: List visits for the authenticated MR with filters.
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $query = Visit::forUser($userId)
            ->with(['doctor:id,name,qualification,specialization,clinic_hospital_name,territory,tier,phone'])
            ->filterByStatus($request->query('status'))
            ->filterByDate($request->query('date'))
            ->filterByDoctor($request->query('doctor_id'));

        if ($request->filled('search')) {
            $term = trim($request->query('search'));
            $query->whereHas('doctor', function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                  ->orWhere('clinic_hospital_name', 'like', "%{$term}%")
                  ->orWhere('specialization', 'like', "%{$term}%");
            });
        }

        $sortOrder = $request->query('sort_order', 'desc');
        $query->orderBy('visit_date', $sortOrder)->orderBy('visit_time', 'asc');

        $visits = $query->get();

        // Calculate metadata for MR using database queries for reliability
        $today = Carbon::today()->toDateString();
        $totalAll = Visit::forUser($userId)->count();
        $todayTotal = Visit::forUser($userId)->whereDate('visit_date', $today)->count();
        $todayCompleted = Visit::forUser($userId)->whereDate('visit_date', $today)->where('status', 'completed')->count();
        $todayPending = Visit::forUser($userId)->whereDate('visit_date', $today)->where('status', 'scheduled')->count();
        $allCompleted = Visit::forUser($userId)->where('status', 'completed')->count();
        $allScheduled = Visit::forUser($userId)->where('status', 'scheduled')->count();
        $allMissed = Visit::forUser($userId)->where('status', 'missed')->count();

        $meta = [
            'total' => $totalAll,
            'today_total' => $todayTotal,
            'today_completed' => $todayCompleted,
            'today_pending' => $todayPending,
            'all_completed' => $allCompleted,
            'all_scheduled' => $allScheduled,
            'all_missed' => $allMissed,
            'doctors_list' => Doctor::forUser($userId)->active()->select('id', 'name', 'specialization', 'clinic_hospital_name', 'tier')->get(),
        ];

        return response()->json([
            'success' => true,
            'data' => $visits,
            'meta' => $meta,
        ]);
    }

    /**
     * API: Schedule or log a new doctor visit.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'doctor_id' => ['required', 'exists:doctors,id'],
            'visit_date' => ['required', 'date'],
            'visit_time' => ['nullable', 'string', 'max:50'],
            'call_type' => ['required', 'in:routine_detailing,new_product_launch,sample_delivery,cme_invite,follow_up'],
            'status' => ['nullable', 'in:scheduled,completed,missed,cancelled'],
            'products_detailed' => ['nullable', 'array'],
            'doctor_feedback' => ['nullable', 'string', 'max:100'],
            'samples_given' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string', 'max:1000'],
            'next_visit_date' => ['nullable', 'date'],
        ]);

        $validated['status'] = $validated['status'] ?? 'scheduled';

        // Ensure doctor belongs to authenticated MR
        $doctor = Doctor::forUser($request->user()->id)->findOrFail($validated['doctor_id']);

        $validated['user_id'] = $request->user()->id;

        $visit = Visit::create($validated);
        $visit->load('doctor:id,name,qualification,specialization,clinic_hospital_name,territory,tier,phone');

        return response()->json([
            'success' => true,
            'message' => $visit->status === 'completed' ? 'Doctor call logged successfully.' : 'Visit scheduled successfully.',
            'data' => $visit,
        ], 201);
    }

    /**
     * API: Get single visit details.
     */
    public function showVisit(Request $request, int $id): JsonResponse
    {
        $visit = Visit::forUser($request->user()->id)
            ->with(['doctor'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $visit,
        ]);
    }

    /**
     * API: Update visit details or complete a scheduled call.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $visit = Visit::forUser($request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'doctor_id' => ['sometimes', 'required', 'exists:doctors,id'],
            'visit_date' => ['sometimes', 'required', 'date'],
            'visit_time' => ['nullable', 'string', 'max:50'],
            'call_type' => ['sometimes', 'required', 'in:routine_detailing,new_product_launch,sample_delivery,cme_invite,follow_up'],
            'status' => ['sometimes', 'required', 'in:scheduled,completed,missed,cancelled'],
            'products_detailed' => ['nullable', 'array'],
            'doctor_feedback' => ['nullable', 'string', 'max:100'],
            'samples_given' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string', 'max:1000'],
            'next_visit_date' => ['nullable', 'date'],
        ]);

        if (isset($validated['doctor_id'])) {
            Doctor::forUser($request->user()->id)->findOrFail($validated['doctor_id']);
        }

        $visit->update($validated);
        $visit->load('doctor:id,name,qualification,specialization,clinic_hospital_name,territory,tier,phone');

        return response()->json([
            'success' => true,
            'message' => 'Visit record updated successfully.',
            'data' => $visit,
        ]);
    }

    /**
     * API: Delete / cancel a visit record.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $visit = Visit::forUser($request->user()->id)->findOrFail($id);
        $visit->delete();

        return response()->json([
            'success' => true,
            'message' => 'Visit record removed successfully.',
        ]);
    }
}
<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    public function run(): void
    {
        $mrUsers = User::role('mr')->get();
        if ($mrUsers->isEmpty()) {
            return;
        }

        $today = Carbon::today()->toDateString();
        $tomorrow = Carbon::tomorrow()->toDateString();
        $dayAfter = Carbon::today()->addDays(2)->toDateString();
        $yesterday = Carbon::yesterday()->toDateString();

        foreach ($mrUsers as $mr) {
            $doctors = Doctor::forUser($mr->id)->get();
            if ($doctors->isEmpty()) {
                continue;
            }

            $doc1 = $doctors->get(0);
            $doc2 = $doctors->get(1);
            $doc3 = $doctors->get(2);
            $doc4 = $doctors->get(3);
            $doc5 = $doctors->get(4);

            // 1. Today's Completed Visit
            if ($doc1) {
                Visit::updateOrCreate(
                    ['user_id' => $mr->id, 'doctor_id' => $doc1->id, 'visit_date' => $today, 'visit_time' => '10:30 AM'],
                    [
                        'call_type' => 'routine_detailing',
                        'status' => 'completed',
                        'products_detailed' => ['CiplonPara 650', 'AzithroCare 500'],
                        'doctor_feedback' => 'regular_prescriber',
                        'samples_given' => '2 strips CiplonPara 650, 1 strip AzithroCare 500',
                        'remarks' => 'Doctor confirmed high satisfaction with patient tolerance for CiplonPara 650. Requested clinical trial data on AzithroCare.',
                        'next_visit_date' => Carbon::today()->addDays(14)->toDateString(),
                    ]
                );
            }

            // 2. Today's Scheduled Visits (Pending)
            if ($doc2) {
                Visit::updateOrCreate(
                    ['user_id' => $mr->id, 'doctor_id' => $doc2->id, 'visit_date' => $today, 'visit_time' => '02:00 PM'],
                    [
                        'call_type' => 'new_product_launch',
                        'status' => 'scheduled',
                        'products_detailed' => ['Cardiovast-AM', 'TelmiStat 40'],
                        'doctor_feedback' => null,
                        'samples_given' => null,
                        'remarks' => 'Introduce new cardioprotective combination. Present bioequivalence study.',
                        'next_visit_date' => null,
                    ]
                );
            }

            if ($doc3) {
                Visit::updateOrCreate(
                    ['user_id' => $mr->id, 'doctor_id' => $doc3->id, 'visit_date' => $today, 'visit_time' => '05:30 PM'],
                    [
                        'call_type' => 'routine_detailing',
                        'status' => 'scheduled',
                        'products_detailed' => ['PantoCiplon DSR', 'Metabolic-XR'],
                        'doctor_feedback' => null,
                        'samples_given' => null,
                        'remarks' => 'Evening OPD visit. Focus on sustained-release PPI mechanism.',
                        'next_visit_date' => null,
                    ]
                );
            }

            // 3. Tomorrow's Scheduled Visits
            if ($doc4) {
                Visit::updateOrCreate(
                    ['user_id' => $mr->id, 'doctor_id' => $doc4->id, 'visit_date' => $tomorrow, 'visit_time' => '11:00 AM'],
                    [
                        'call_type' => 'sample_delivery',
                        'status' => 'scheduled',
                        'products_detailed' => ['OsteoFlex Joint Care'],
                        'doctor_feedback' => null,
                        'samples_given' => null,
                        'remarks' => 'Deliver requested orthopedic samples and patient exercise brochures.',
                        'next_visit_date' => null,
                    ]
                );
            }

            // 4. Past Completed Visit (Yesterday)
            if ($doc5) {
                Visit::updateOrCreate(
                    ['user_id' => $mr->id, 'doctor_id' => $doc5->id, 'visit_date' => $yesterday, 'visit_time' => '04:00 PM'],
                    [
                        'call_type' => 'routine_detailing',
                        'status' => 'completed',
                        'products_detailed' => ['Pediatric Cold Syrup', 'CiplonVit Drops'],
                        'doctor_feedback' => 'highly_interested',
                        'samples_given' => '3 dropper bottles CiplonVit',
                        'remarks' => 'Appreciated pleasant fruit flavor formulation for infants. Will prescribe for winter seasonal cases.',
                        'next_visit_date' => Carbon::today()->addDays(10)->toDateString(),
                    ]
                );
            }
        }
    }
}

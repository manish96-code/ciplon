<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        // Find MR users
        $mrUsers = User::role('mr')->get();

        if ($mrUsers->isEmpty()) {
            $mrUser = User::firstOrCreate(
                ['email' => 'mr@ciplon.com'],
                ['name' => 'Rajesh Sharma', 'password' => bcrypt('password'), 'role' => 'mr']
            );
            $mrUser->assignRole('mr');
            $mrUsers = collect([$mrUser]);
        }

        $sampleDoctors = [
            [
                'name' => 'Dr. Rajesh Kulkarni',
                'qualification' => 'MBBS, MD (General Medicine)',
                'specialization' => 'General Medicine',
                'clinic_hospital_name' => 'Lifeline Multispecialty Clinic',
                'address' => 'Shop 4, Ground Floor, Sai Plaza, MG Road',
                'territory' => 'Downtown',
                'city' => 'Mumbai',
                'phone' => '+91 98201 12345',
                'email' => 'dr.kulkarni@lifelineclinic.in',
                'visiting_hours' => '10:00 AM - 01:30 PM, 06:00 PM - 08:30 PM',
                'visiting_days' => 'Mon - Sat',
                'tier' => 'class_a',
                'target_frequency_per_month' => 3,
                'notes' => 'Key prescriber for CiplonPara 650 and antibiotics. Prefers morning detailing visits.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Sunita Mehta',
                'qualification' => 'MBBS, MS, MCh (Cardiology), FACC',
                'specialization' => 'Cardiology',
                'clinic_hospital_name' => 'Metro Heart Institute & Research Centre',
                'address' => 'Suite 302, 3rd Floor, Metro Towers, Linking Road',
                'territory' => 'South Zone',
                'city' => 'Mumbai',
                'phone' => '+91 98202 23456',
                'email' => 'sunitamehta.cardio@gmail.com',
                'visiting_hours' => '11:00 AM - 02:00 PM',
                'visiting_days' => 'Mon, Wed, Fri',
                'tier' => 'core',
                'target_frequency_per_month' => 4,
                'notes' => 'Leading cardiologist in region. High volume of hypertensive patients; prioritizes clinical trial monographs.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Vikram Singhania',
                'qualification' => 'MBBS, MD, DM (Endocrinology)',
                'specialization' => 'Diabetology',
                'clinic_hospital_name' => 'Apex Metabolic & Diabetes Centre',
                'address' => '12, Sunrise Chambers, Opposite City Hospital',
                'territory' => 'Central Suburbs',
                'city' => 'Mumbai',
                'phone' => '+91 98203 34567',
                'email' => 'dr.singhania@apexmetabolic.org',
                'visiting_hours' => '04:00 PM - 08:00 PM',
                'visiting_days' => 'Tue, Thu, Sat',
                'tier' => 'core',
                'target_frequency_per_month' => 4,
                'notes' => 'Core KOL for diabetes care and metabolic therapies. Regularly requires patient education brochures.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Ananya Sen',
                'qualification' => 'MBBS, MS (Orthopedics), DNB',
                'specialization' => 'Orthopedics',
                'clinic_hospital_name' => 'Sen Bone & Joint Specialist Clinic',
                'address' => 'Building 2B, Greenfield Arcade, Station Road',
                'territory' => 'North Zone',
                'city' => 'Mumbai',
                'phone' => '+91 98204 45678',
                'email' => 'dr.ananyasen@orthocare.com',
                'visiting_hours' => '09:30 AM - 12:30 PM, 05:30 PM - 08:00 PM',
                'visiting_days' => 'Mon - Fri',
                'tier' => 'class_a',
                'target_frequency_per_month' => 2,
                'notes' => 'Focus on osteoarthritis, joint inflammation, and pain management molecules.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Priya Deshmukh',
                'qualification' => 'MBBS, DCH, MD (Pediatrics)',
                'specialization' => 'Pediatrics',
                'clinic_hospital_name' => 'Little Angels Child Care Clinic',
                'address' => '401, Harmony Commercial Complex, SV Road',
                'territory' => 'West Zone',
                'city' => 'Mumbai',
                'phone' => '+91 98205 56789',
                'email' => 'priya.deshmukh@pedicare.in',
                'visiting_hours' => '10:00 AM - 01:00 PM, 05:00 PM - 07:30 PM',
                'visiting_days' => 'Mon - Sat',
                'tier' => 'class_b',
                'target_frequency_per_month' => 2,
                'notes' => 'Prescribes pediatric suspensions, multivitamins, and antipyretics. Highly values pleasant taste profiles in syrups.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Amit Joshi',
                'qualification' => 'MBBS, MD (Pulmonary Medicine)',
                'specialization' => 'Pulmonology',
                'clinic_hospital_name' => 'City Chest & Allergy Clinic',
                'address' => 'Shop 10, Crystal Plaza, Station Road',
                'territory' => 'Downtown',
                'city' => 'Mumbai',
                'phone' => '+91 98206 67890',
                'email' => 'dr.amitjoshi@citychest.com',
                'visiting_hours' => '11:30 AM - 02:30 PM',
                'visiting_days' => 'Mon - Fri',
                'tier' => 'class_a',
                'target_frequency_per_month' => 3,
                'notes' => 'Key prescriber for inhalers, anti-asthmatics, and cough formulations.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Neha Agarwal',
                'qualification' => 'MBBS, DGO, MD (Obstetrics & Gynecology)',
                'specialization' => 'Gynecology',
                'clinic_hospital_name' => 'Blossom Women & Fertility Clinic',
                'address' => '2nd Floor, Royal Touch Centre, Near Metro Station',
                'territory' => 'Central Suburbs',
                'city' => 'Mumbai',
                'phone' => '+91 98207 78901',
                'email' => 'drneha.agarwal@blossomclinic.com',
                'visiting_hours' => '04:30 PM - 08:30 PM',
                'visiting_days' => 'Mon, Tue, Thu, Fri',
                'tier' => 'class_b',
                'target_frequency_per_month' => 2,
                'notes' => 'High prescriber for prenatal supplements, hematinics, and calcium formulations.',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Harish Nambiar',
                'qualification' => 'MBBS, DVD, MD (Dermatology)',
                'specialization' => 'Dermatology',
                'clinic_hospital_name' => 'DermaCare Skin & Aesthetic Clinic',
                'address' => '105, Regency Enclave, Hill Road',
                'territory' => 'South Zone',
                'city' => 'Mumbai',
                'phone' => '+91 98208 89012',
                'email' => 'harish.nambiar@dermacare.in',
                'visiting_hours' => '10:00 AM - 01:00 PM',
                'visiting_days' => 'Tue - Sat',
                'tier' => 'class_c',
                'target_frequency_per_month' => 1,
                'notes' => 'Topical antimicrobials, anti-fungals, and antihistamines.',
                'status' => 'active',
            ],
        ];

        foreach ($mrUsers as $mr) {
            foreach ($sampleDoctors as $doctorData) {
                Doctor::updateOrCreate(
                    [
                        'user_id' => $mr->id,
                        'name' => $doctorData['name'],
                    ],
                    array_merge($doctorData, ['user_id' => $mr->id])
                );
            }
        }
    }
}

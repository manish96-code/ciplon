<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    // Seed the application database with administrator credentials and settings.
    public function run(): void
    {
        // Primary Administrator Account
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('123456789'),
                'email_verified_at' => now(),
            ]
        );

        // Secondary / Test Administrator Account
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test Admin',
                'password' => Hash::make('123456789'),
                'email_verified_at' => now(),
            ]
        );

        // Seed Company Profile & System Settings
        $this->call([
            SettingSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}

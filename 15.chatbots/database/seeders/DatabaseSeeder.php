<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

        User::factory()
            ->withPersonalTeam()
            ->hasChatbots(2)
            ->create([
                'name' => 'Luis Arrieta',
                'email' => 'luisarrieta796@gmail.com',
            ]);
    }
}

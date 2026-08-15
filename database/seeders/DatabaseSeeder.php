<?php

namespace Database\Seeders;

use App\Models\Coach;
use App\Models\Player;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => bcrypt('password')
        ]);

        Coach::create([
            'first_name' => 'JJ',
            'last_name' => 'Reddick'
        ]);

        Coach::create([
            'first_name' => 'Mike',
            'last_name' => 'Brown'
        ]);

        Player::create([
            'first_name' => 'LeBron',
            'last_name' => 'James',
            'comments' => 'Old GOAT'
        ]);
        Player::create([
            'first_name' => 'Luka',
            'last_name' => 'Doncic',
            'comments' => 'Young GOAT'
        ]);
    }
}

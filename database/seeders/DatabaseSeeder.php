<?php

namespace Database\Seeders;

use App\Models\Coach;
use App\Models\Group;
use App\Models\GroupUser;
use App\Models\Player;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $groupUuid = Str::uuid();

        $group = Group::create([
            'group_name' => 'LAB',
            'group_uuid' => $groupUuid
        ]);

        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => bcrypt('password')
        ]);

        User::factory()->create([
            'name' => 'John Smith',
            'email' => 'john@smith.com',
            'password' => bcrypt('password')
        ]);

        Coach::create([
            'first_name' => 'JJ',
            'last_name' => 'Reddick',
            'group_uuid' => $groupUuid
        ]);
        Coach::create([
            'first_name' => 'Mike',
            'last_name' => 'Brown',
            'group_uuid' => $groupUuid
        ]);
        Coach::create([
            'first_name' => 'Steve',
            'last_name' => 'Kerr',
            'group_uuid' => '2498598adf-34543543-fdsfadf34-34534543-34rw2d2f3'
        ]);

        Player::create([
            'first_name' => 'LeBron',
            'last_name' => 'James',
            'comments' => 'Old GOAT',
            'group_uuid' => $groupUuid
        ]);
        Player::create([
            'first_name' => 'Luka',
            'last_name' => 'Doncic',
            'comments' => 'Young GOAT',
            'group_uuid' => $groupUuid
        ]);
        Player::create([
            'first_name' => 'Jaylen',
            'last_name' => 'Brown',
            'comments' => 'Hairline',
            'group_uuid' => '2498598adf-34543543-fdsfadf34-34534543-34rw2d2f3'
        ]);

        GroupUser::create([
            'group_id' => $group->id,
            'user_id' => $user->id
        ]);
    }
}

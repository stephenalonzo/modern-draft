<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Draft;
use App\Models\Player;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $groupUuid = '';

        $users = User::with('groups')->where('id', Auth::user()->id)->get();

        foreach ($users as $user) {
            foreach ($user->groups as $group) {
                $groupUuid = $group->group_uuid;
                // dd($group);
            }
        }

        return Inertia::render('dashboard', [
            'players' => Player::all()->count(),
            'coaches' => Coach::all()->count(),
            'drafts' => Draft::select('id', 'draft_id', 'draft_status')->where('draft_status', 'completed')->get(),
            'groupUuid' => $groupUuid
        ]);
    }
}

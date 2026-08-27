<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Draft;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard', [
            'players' => Player::where('group_uuid', $request->route('group'))->count(),
            'coaches' => Coach::where('group_uuid', $request->route('group'))->count(),
            'drafts' => Draft::select('id', 'draft_id', 'draft_status', 'group_uuid')->where('draft_status', 'completed')->where('group_uuid', $request->route('group'))->get()
        ]);
    }
}

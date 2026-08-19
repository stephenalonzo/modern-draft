<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Draft;
use App\Models\Player;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'players' => Player::all()->count(),
            'coaches' => Coach::all()->count(),
            'drafts' => Draft::select('id', 'draft_id', 'draft_status')->where('draft_status', 'completed')->get()
        ]);
    }
}

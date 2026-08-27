<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerRequest;
use App\Models\Coach;
use App\Models\Group;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('players/index', [
            'players' => Player::where('group_uuid', $request->route('group'))->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('players/create');
    }

    public function store(PlayerRequest $request)
    {
        $validated = $request->validated();
        $validated['group_uuid'] = $request->route('group');

        $checkGroup = Group::where('group_uuid', $request->route('group'))->first();

        if (is_null($checkGroup)) {
            return redirect()->to(route('select-group'));
        }

        Player::create($validated);

        return redirect()->to(route('dashboard', $request->route('group')));
    }

    public function edit(Player $player)
    {
        return Inertia::render('players/edit', [
            'player' => $player
        ]);
    }

    public function update(PlayerRequest $request, Player $player)
    {
        $validated = $request->validated();

        dd($validated);
    }

    public function destroy(Player $player)
    {
        dd($player);
    }

    public function teamView()
    {
        return Inertia::render('players/team', [
            'coaches' => Coach::with('players')->get()
        ]);
    }
}

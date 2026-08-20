<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerRequest;
use App\Models\Coach;
use App\Models\Player;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function index()
    {
        return Inertia::render('players/index', [
            'players' => Player::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('players/create');
    }

    public function store(PlayerRequest $request)
    {
        $validated = $request->validated();

        Player::create($validated);

        return redirect()->to('/dashboard');
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

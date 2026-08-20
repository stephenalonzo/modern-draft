<?php

namespace App\Http\Controllers;

use App\Http\Requests\TradeRequest;
use App\Models\Player;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {
        return Inertia::render('players/trade', [
            'players' => Player::with('coaches')->get()
        ]);
    }

    public function update(TradeRequest $request)
    {
        $validated = $request->validated();

        $playerOneTraded = Player::with('coaches')->find($validated['player_one_id']);
        $playerTwoTraded = Player::with('coaches')->find($validated['player_two_id']);

        foreach ($playerOneTraded->coaches as $coach) {
            $coach->players()->detach($playerOneTraded->id);
            $coach->players()->attach($playerTwoTraded->id);
        }

        foreach ($playerTwoTraded->coaches as $coach) {
            $coach->players()->detach($playerTwoTraded->id);
            $coach->players()->attach($playerOneTraded->id);
        }

        return redirect()->to(route('teamsIndex'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\DraftOrderRequest;
use App\Http\Requests\DraftRequest;
use App\Models\Coach;
use App\Models\Draft;
use App\Models\DraftOrder;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DraftController extends Controller
{
    public function index()
    {
        return Inertia::render('drafts/index', [
            'drafts' => Draft::all()
        ]);
    }

    public function show(Draft $draft)
    {
        return Inertia::render('drafts/show', [
            'draft' => $draft,
            'players' => Player::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('drafts/create', [
            'coaches' => Coach::all()
        ]);
    }

    public function draftOrder()
    {
        return Inertia::render('drafts/order', [
            'coaches' => Coach::all(),
            'drafts' => Draft::all()
        ]);
    }

    public function store(DraftRequest $request)
    {
        $validated = $request->validated();

        $validated['draft_id'] = rand(1000, 9999);

        Draft::create($validated);

        return redirect()->to('/dashboard');
    }

    public function draftOrderStore(DraftOrderRequest $request)
    {
        $validated = $request->validated();

        foreach ($validated['coaches'] as $coach) {
            DraftOrder::create([
                'draft_id' => $validated['draft_id'],
                'coach' => $coach['coach']
            ]);
        }

        return redirect()->to('/dashboard');
    }

    public function startDraft(Draft $draft)
    {
        $draft->update(['draft_status' => 'active']);
    }
}

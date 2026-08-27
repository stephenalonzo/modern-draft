<?php

namespace App\Http\Controllers;

use App\Http\Requests\DraftOrderRequest;
use App\Http\Requests\DraftPickRequest;
use App\Http\Requests\DraftRequest;
use App\Models\Coach;
use App\Models\Draft;
use App\Models\DraftOrder;
use App\Models\DraftPick;
use App\Models\Group;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DraftController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('drafts/index', [
            'drafts' => Draft::where('group_uuid', $request->route('group'))->where('draft_status', 'pending')->orWhere('draft_status', 'active')->get(),
            'completedDrafts' => Draft::where('group_uuid', $request->route('group'))->where('draft_status', 'completed')->get()
        ]);
    }

    public function show(Draft $draft)
    {
        $getCoach = DraftOrder::select('coach')->where('draft_id', $draft->draft_id)->where('on_the_board', 'active')->first();

        $getRecentPickCoach = DraftOrder::select('coach')->where('draft_id', $draft->draft_id)->where('on_the_board', 'completed')->orderByDesc('updated_at')->first();

        $draftPick = DraftPick::select('player_first_name', 'player_last_name', 'coach')->where('draft_id', $draft->draft_id)->latest()->limit(1)->get();

        return Inertia::render('drafts/show', [
            'draft' => $draft,
            'players' => Player::with('coaches')->get(),
            'coaches' => Coach::all(),
            'coach' => $getCoach->coach ?? '',
            'recentPickCoach' => $getRecentPickCoach->coach ?? '',
            'draftPick' => $draftPick ?? []
        ]);
    }

    public function create()
    {
        return Inertia::render('drafts/create', [
            'coaches' => Coach::all()
        ]);
    }

    public function draftOrder(Request $request)
    {
        return Inertia::render('drafts/order', [
            'coaches' => Coach::where('group_uuid', $request->route('group'))->get(),
            'drafts' => Draft::where('group_uuid', $request->route('group'))->get()
        ]);
    }

    public function store(DraftRequest $request)
    {
        $validated = $request->validated();

        $validated['draft_id'] = rand(1000, 9999);
        $validated['group_uuid'] = $request->route('group');

        $checkGroup = Group::where('group_uuid', $request->route('group'))->first();

        if (is_null($checkGroup)) {
            return redirect()->to(route('select-group'));
        }

        Draft::create($validated);

        return redirect()->to(route('dashboard', $request->route('group')));
    }

    public function draftOrderStore(DraftOrderRequest $request)
    {
        $validated = $request->validated();

        foreach ($validated['coaches'] as $coach) {
            $checkGroup = Group::where('group_uuid', $request->route('group'))->first();

            if (is_null($checkGroup)) {
                return redirect()->to(route('select-group'));
            }

            DraftOrder::create([
                'draft_id' => $validated['draft_id'],
                'coach' => $coach['coach'],
                'on_the_board' => 'pending'
            ]);
        }

        return redirect()->to(route('dashboard', $request->route('group')));
    }

    public function startDraft(Draft $draft)
    {
        $draft->update(['draft_status' => 'active']);

        $draftOrder = DraftOrder::where('draft_id', $draft->draft_id)->where('on_the_board', 'pending')->first();

        $draftOrder->update(['on_the_board' => 'active']);
    }

    public function endDraft(Draft $draft)
    {
        $draft->update(['draft_status' => 'completed']);
    }

    public function draftPick(DraftPickRequest $request, Draft $draft)
    {
        $validated = $request->validated();

        $validated['draft_id'] = $draft->draft_id;
        $getCoach = DraftOrder::select('coach')->where('draft_id', $draft->draft_id)->where('on_the_board', 'active')->first();
        $validated['coach'] = $getCoach->coach;

        $updateDraftOrder = DraftOrder::where('draft_id', $draft->draft_id)->where('on_the_board', 'active')->first();
        $completedUpdate = $updateDraftOrder->update(['on_the_board' => 'completed']);

        $getCoachName = explode(' ', $getCoach->coach);
        $getPlayer = Player::select('id', 'first_name', 'last_name')->where('group_uuid', $request->route('group'))->where('first_name', $validated['player_first_name'])->where('last_name', $validated['player_last_name'])->first();

        if ($completedUpdate) {
            $checkGroup = Group::where('group_uuid', $request->route('group'))->first();

            if (is_null($checkGroup)) {
                return redirect()->to(route('select-group'));
            }

            $draftPick = DraftPick::create($validated);

            $coach = Coach::where('group_uuid', $request->route('group'))->where('first_name', $getCoachName[0])->where('last_name', $getCoachName[1])->first();

            $coach->players()->attach($getPlayer->id);

            if ($draftPick) {
                $nextActivePick = DraftOrder::where('draft_id', $draft->draft_id)->where('on_the_board', 'pending')->first();

                if (!is_null($nextActivePick)) {
                    $nextActivePick->update(['on_the_board' => 'active']);
                }

                return back();
            }
        }
    }
}

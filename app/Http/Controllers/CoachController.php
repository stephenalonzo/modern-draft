<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoachRequests;
use App\Models\Coach;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoachController extends Controller
{
    public function index()
    {
        return Inertia::render('coaches/index', [
            'coaches' => Coach::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('coaches/create');
    }

    public function edit(Coach $coach)
    {
        return Inertia::render('coaches/edit', [
            'coach' => $coach
        ]);
    }

    public function store(CoachRequests $request)
    {
        $validated = $request->validated();

        $checkGroup = Group::where('group_uuid', $request->route('group'))->first();

        if (is_null($checkGroup)) {
            return redirect()->to(route('select-group'));
        }

        Coach::create($validated);

        return redirect()->to(route('dashboard', $request->route('group')));
    }

    public function update(CoachRequests $request, Coach $coach)
    {
        $validated = $request->validated();

        dd($validated);
    }
}

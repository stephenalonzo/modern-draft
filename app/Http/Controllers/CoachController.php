<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoachRequests;
use App\Models\Coach;
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

        Coach::create($validated);

        return redirect()->to('/dashboard');
    }

    public function update(CoachRequests $request, Coach $coach)
    {
        $validated = $request->validated();

        dd($validated);
    }
}

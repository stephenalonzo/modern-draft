<?php

namespace App\Http\Controllers;

use App\Http\Requests\DraftRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DraftController extends Controller
{
    public function index()
    {
        return Inertia::render('drafts/index');
    }

    public function create()
    {
        return Inertia::render('drafts/create');
    }

    public function store(DraftRequest $request)
    {
        $validated = $request->validated();

        dd($validated);
    }
}

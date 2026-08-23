<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function create()
    {
        return Inertia::render('groups/create');
    }

    public function store(GroupRequest $request)
    {
        $validated = $request->validated();

        $validated['group_uuid'] = Str::uuid();

        $group = Group::create($validated);

        $user = User::with('groups')->find(Auth::user()->id);

        $user->groups()->sync($group);

        return redirect()->to(route('dashboard'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SplashController extends Controller
{
    public function index()
    {
        return Inertia::render('splash', [
            'users' => User::with('groups')->where('id', Auth::user()->id)->get()
        ]);
    }
}

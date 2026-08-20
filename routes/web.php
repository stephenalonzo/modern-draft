<?php

use App\Http\Controllers\CoachController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\SplashController;
use App\Http\Controllers\TradeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/select-group', [SplashController::class, 'index'])->name('select-group');

    // Players HTTP Methods
    Route::get('/players', [PlayerController::class, 'index'])->name('playersIndex');
    Route::get('/players/{player}/edit', [PlayerController::class, 'edit'])->name('playersEdit');
    Route::put('/players/{player}/update', [PlayerController::class, 'update'])->name('playersUpdate');
    Route::delete('/players/{player}/delete', [PlayerController::class, 'destroy'])->name('playersDelete');
    Route::get('/players/create', [PlayerController::class, 'create'])->name('playersCreate');
    Route::post('/players/store', [PlayerController::class, 'store'])->name('playersStore');
    // Team View
    Route::get('/teams', [PlayerController::class, 'teamView'])->name('teamsIndex');
    // Trade
    Route::get('/trade', [TradeController::class, 'index'])->name('tradesIndex');
    Route::put('/trade/confirmed', [TradeController::class, 'update'])->name('tradesConfirm');

    // Coaches HTTP Methods
    Route::get('/coaches', [CoachController::class, 'index'])->name('coachesIndex');
    Route::get('/coaches/{coach}/edit', [CoachController::class, 'edit'])->name('coachesEdit');
    Route::put('/coaches/{coach}/update', [CoachController::class, 'update'])->name('coachesUpdate');
    Route::get('/coaches/create', [CoachController::class, 'create'])->name('coachesCreate');
    Route::post('/coaches/store', [CoachController::class, 'store'])->name('coachesStore');

    // Drafts HTTP Methods
    Route::get('/draft', [DraftController::class, 'index'])->name('draftsIndex');
    Route::get('/draft/create', [DraftController::class, 'create'])->name('draftsCreate');
    Route::get('/draft/create/order', [DraftController::class, 'draftOrder'])->name('draftOrder');
    Route::post('/draft/store', [DraftController::class, 'store'])->name('draftsStore');
    Route::post('/draft/store/order', [DraftController::class, 'draftOrderStore'])->name('draftOrderStore');
    Route::post('/draft/{draft:draft_id}/pick', [DraftController::class, 'draftPick'])->name('draftPick');
    Route::get('/draft/{draft:draft_id}', [DraftController::class, 'show'])->name('draftsShow');
    Route::put('/draft/{draft:draft_id}/start', [DraftController::class, 'startDraft'])->name('draftStart');
    Route::put('/draft/{draft:draft_id}/end', [DraftController::class, 'endDraft'])->name('draftEnd');
});

require __DIR__ . '/settings.php';

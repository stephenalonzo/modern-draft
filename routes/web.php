<?php

use App\Http\Controllers\CoachController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\SplashController;
use App\Http\Controllers\TradeController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'auth/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Group HTTP Methods
    Route::get('/select-group', [SplashController::class, 'index'])->name('select-group');
    Route::get('/group/create', [GroupController::class, 'create'])->name('groupsCreate');
    Route::post('/group/store', [GroupController::class, 'store'])->name('groupsStore');

    Route::middleware(['group_exists'])->group(function () {
        Route::get('/dashboard/{group:group_uuid}', [DashboardController::class, 'index'])->name('dashboard');

        // Players HTTP Methods
        Route::get('/players/{group:group_uuid}', [PlayerController::class, 'index'])->name('playersIndex');
        Route::get('/players/{player}/{group:group_uuid}/edit', [PlayerController::class, 'edit'])->name('playersEdit');
        Route::put('/players/{player}/update', [PlayerController::class, 'update'])->name('playersUpdate');
        Route::delete('/players/{player}/delete', [PlayerController::class, 'destroy'])->name('playersDelete');
        Route::get('/players/{group:group_uuid}/create', [PlayerController::class, 'create'])->name('playersCreate');
        Route::post('/players/{group:group_uuid}/store', [PlayerController::class, 'store'])->name('playersStore');
        // Team View
        Route::get('/teams/{group:group_uuid}', [PlayerController::class, 'teamView'])->name('teamsIndex');
        // Trade
        Route::get('/trade/{group:group_uuid}', [TradeController::class, 'index'])->name('tradesIndex');
        Route::put('/trade/{group:group_uuid}/confirmed', [TradeController::class, 'update'])->name('tradesConfirm');

        // Coaches HTTP Methods
        Route::get('/coaches/{group:group_uuid}', [CoachController::class, 'index'])->name('coachesIndex');
        Route::get('/coaches/{group:group_uuid}/create', [CoachController::class, 'create'])->name('coachesCreate');
        Route::get('/coaches/{coach}/{group:group_uuid}/edit', [CoachController::class, 'edit'])->name('coachesEdit');
        Route::put('/coaches/{coach}/{group:group_uuid}/update', [CoachController::class, 'update'])->name('coachesUpdate');
        Route::post('/coaches/{group:group_uuid}/store', [CoachController::class, 'store'])->name('coachesStore');

        // Drafts HTTP Methods
        Route::get('/draft/{group:group_uuid}', [DraftController::class, 'index'])->name('draftsIndex');
        Route::get('/draft/{group:group_uuid}/create', [DraftController::class, 'create'])->name('draftsCreate');
        Route::post('/draft/{group:group_uuid}/store', [DraftController::class, 'store'])->name('draftsStore');
        Route::get('/draft/{group:group_uuid}/create/order', [DraftController::class, 'draftOrder'])->name('draftOrder');
        Route::post('/draft/{group:group_uuid}/store/order', [DraftController::class, 'draftOrderStore'])->name('draftOrderStore');
        Route::post('/draft/{draft:draft_id}/{group:group_uuid}/pick', [DraftController::class, 'draftPick'])->name('draftPick');
        Route::get('/draft/{draft:draft_id}/{group:group_uuid}', [DraftController::class, 'show'])->name('draftsShow');
        Route::put('/draft/{draft:draft_id}/{group:group_uuid}/start', [DraftController::class, 'startDraft'])->name('draftStart');
        Route::put('/draft/{draft:draft_id}/{group:group_uuid}/end', [DraftController::class, 'endDraft'])->name('draftEnd');
    });
});

require __DIR__ . '/settings.php';

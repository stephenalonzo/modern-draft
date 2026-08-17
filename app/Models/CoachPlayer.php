<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoachPlayer extends Model
{
    public $table = 'coach_player';

    protected $fillable = ['coach_id', 'player_id'];
}

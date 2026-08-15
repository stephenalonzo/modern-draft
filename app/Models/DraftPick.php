<?php

namespace App\Models;

use App\Models\Draft;
use Illuminate\Database\Eloquent\Model;

class DraftPick extends Model
{
    protected $fillable = ['draft_id', 'player_first_name', 'player_last_name', 'coach'];

    public function draft()
    {
        return $this->belongsTo(Draft::class);
    }
}

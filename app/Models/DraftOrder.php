<?php

namespace App\Models;

use App\Models\Draft;
use Illuminate\Database\Eloquent\Model;

class DraftOrder extends Model
{
    protected $fillable = ['draft_id', 'coach_first_name', 'coach_last_name'];

    public function draft()
    {
        return $this->belongsTo(Draft::class);
    }
}

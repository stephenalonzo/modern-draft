<?php

namespace App\Models;

use App\Models\Draft;
use Illuminate\Database\Eloquent\Model;

class DraftOrder extends Model
{
    protected $fillable = ['draft_id', 'coach'];

    public function draft()
    {
        return $this->belongsTo(Draft::class);
    }
}

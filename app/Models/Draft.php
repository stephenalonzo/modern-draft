<?php

namespace App\Models;

use App\Models\DraftOrder;
use App\Models\DraftPick;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    protected $fillable = ['draft_id', 'draft_start', 'draft_status', 'draft_order', 'auto_pick', 'group_uuid'];

    public function draftOrder()
    {
        return $this->hasMany(DraftOrder::class);
    }

    public function draftPicks()
    {
        return $this->hasMany(DraftPick::class);
    }
}

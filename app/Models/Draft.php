<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    protected $fillable = ['draft_start', 'draft_order', 'auto_pick'];
}

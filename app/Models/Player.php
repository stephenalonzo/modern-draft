<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['first_name', 'last_name', 'comments', 'group_uuid'];

    public function coaches()
    {
        return $this->belongsToMany(Coach::class);
    }
}

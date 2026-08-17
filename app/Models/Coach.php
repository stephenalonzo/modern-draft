<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    protected $fillable = ['first_name', 'last_name'];

    public function players()
    {
        return $this->belongsToMany(Player::class);
    }
}

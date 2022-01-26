<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'book',
        'bookLink'
    ];
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
}
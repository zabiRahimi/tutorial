<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InternalLinks extends Model
{
    use HasFactory;
    protected $fillable = [
        'book_id',
        'lesson_id',
        'lesson_section_id',
        'book2_id',
        'lesson2_id',
        'lesson_section2_id',
        'title'
    ];

    public $timestamps = false;
}

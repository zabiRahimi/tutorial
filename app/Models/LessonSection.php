<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonSection extends Model
{
    use HasFactory;
    protected $fillable = [
        'lesson_id',
        'ordering',
        'lesson_section',
        'des',
    ];

    public function links()
    {
        return $this->hasMany(Link::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}



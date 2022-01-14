<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable=[
        'book_id',
        'lesson',
        'lessonLink'
    ];
    public function lesson_sections()
    {
        return $this->hasMany(LessonSection::class);
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}

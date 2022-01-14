<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonType extends Model
{
    use HasFactory;
    protected $fillable=[
        'book_type_id',
        'lesson',
        'lessonLink'
    ];
    public function words()
    {
        return $this->hasMany(Word::class);
    }
    
    public function bookType()
    {
        return $this->belongsTo(BookType::class);
    }
}

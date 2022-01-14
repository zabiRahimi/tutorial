<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;
    protected $fillable=[
        'lesson_type_id',
        'wordLink',
        'word',
        'mean',
        'pronounceEn',
        'pronounceFa'
    ];
    public function sentences()
    {
        return $this->hasMany(Sentence::class);
    }
    public function lessonType()
    {
        return $this->belongsTo(LessonType::class);
    }
}

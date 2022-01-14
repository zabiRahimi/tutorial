<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookType extends Model
{
    use HasFactory;
    protected $fillable = [
        'book',
        'bookLink'
    ];
    public function lesson_types()
    {
        return $this->hasMany(LessonType::class);
    }
}

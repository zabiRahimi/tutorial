<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    protected $fillable = [
        'book',
        'link'
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function lesson_sections(){
        return $this->hasManyThrough(LessonSection::class,Lesson::class);
    }

    public function links(){
        return $this->hasManyThrough(Link::class,LessonSection::class,Lesson::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookType extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
    protected $fillable = [
        'book',
        'bookLink'
    ];
    public function lesson_types()
    {
        return $this->hasMany(LessonType::class);
    }

    public function words(){
        return $this->hasManyThrough(Word::class,LessonType::class);
    }

    public function sentences(){
        return $this->hasManyDeep(Sentence::class,[LessonType::class,Word::class]);
    }
}

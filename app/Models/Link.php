<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        
                'lesson_section_id',
                'has_link_id',
            ];
            
            public $timestamps = false;
        
            public function lesson_section()
            {
                return $this->belongsTo(LessonSection::class);
            }
}

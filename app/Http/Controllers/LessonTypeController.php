<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\LessonType;

class LessonTypeController extends Controller
{
    public function saveLesson(Request $request)
    {
        $this->lessonValidator($request->all())->validate();
        $lesson=LessonType::create(
            [
                'book_type_id' => $request->book_id,
                'lesson'=> $request->lesson,
                'lessonLink'=> $request->lessonLink,
            ]
            );
        return response()->json(['lesson_id'=>$lesson->id],200);
    }

    public function lessonValidator(array $data)
    {
        $book_id=$data['book_id'];
        return Validator::make($data, [
            'book_id' => [ 'required', 'numeric' ,'exists:book_types,id' ],
            'lesson' => [ 'required', 'string', 'min:2' ,
            Rule::unique('lesson_types')->where(function ($query) use($book_id){
                return $query->where('book_type_id',$book_id);
            }) ],
            'lessonLink' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lesson_types')->where(function ($query) use($book_id){
                return $query->where('book_type_id',$book_id);
            }) ],
        ]);
    }

    public function getLessons(Request $request,  $book_id)
    {
        $lessons=LessonType::where('book_type_id' , $book_id)->get();
        return response()->json(['lessons'=>$lessons],200);

    }
}
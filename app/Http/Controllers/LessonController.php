<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Lesson;

class LessonController extends Controller
{
    public function saveLesson(Request $request)
    {
        $this->lessonValidator($request->all())->validate();
        $lesson=Lesson::create(
            [
                'book_id' => $request->book_id,
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
            'book_id' => [ 'required', 'numeric' ,'exists:books,id' ],
            'lesson' => [ 'required', 'string', 'min:2' ,
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            }) ],
            'lessonLink' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            }) ],
        ]);
    }

    public function getLessons(Request $request,  $book_id)
    {
        $lessons=Lesson::where('book_id' , $book_id)->withCount('lesson_sections')->get();

        $countLessons=$lessons->count();
        
        $countLessonSections=0;//جهت ذخیره تعداد بخش ها

        // دریافت تعداد بخش ها
        foreach ($lessons as $lesson) {

            $countLessonSections += $lesson->lesson_sections_count;
        }
        
        return response()->json(['lessons'=>$lessons,'countlessons'=>$countLessons,'countLessonSections'=>$countLessonSections],200);

    }
}

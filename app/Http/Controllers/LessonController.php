<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Lesson;

class LessonController extends Controller
{
    public function getAllLessons(int $book_id)
    {
        $lessons=Lesson::where('book_id' , $book_id)->get();

        //دریافت مشخصات کتاب در درس ها
        foreach ($lessons as $lesson) {
            $lesson->book;
        }
        // جوین کردن جدول بخش ها به جدول درس ها
        $lessons->load('lesson_sections');
        return response()->json(['lessons'=>$lessons],200);
    }

    public function getOneLesson(int $id)
    {
        $lesson= Lesson::find($id)->withCount('lesson_sections')->get();

        $lessonSecCount=$lesson[0]->lesson_section_count;

        return response()->json(['lessonSecCount'=>$lessonSecCount],200);
    }


    public function saveLesson(Request $request)
    {
        $this->lessonValidator($request->all())->validate();
        $lesson=Lesson::create(
            [
                'book_id' => $request->book_id,
                'lesson'=> $request->lesson,
                'link'=> $request->link,
            ]
            );
        return response()->json(['id'=>$lesson->id],200);
    }
    

    public function lessonValidator(array $data)
    {
        $book_id=$data['book_id'];
        return Validator::make($data, [
            'book_id' => [ 'required', 'numeric' ,'exists:books,id' ],
            'lesson' => [ 'required', 'min:2' ,
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            }) ],
            'link' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            }) ],
        ]);
    }

    public function editLesson(Request $request, int $id)
    {
        $this->lessonEditValidator($request->all(),$id)->validate();
        $lesson = Lesson::find($id);

        $lesson->lesson = $request->lesson;
        $lesson->link = $request->link;

        $lesson->save();
    }

    private function lessonEditValidator(array $data,$id)
    {
        $book_id=$data['book_id'];
        return Validator::make($data, [
            'book_id' => [ 'required', 'numeric' ,'exists:books,id' ],
            'lesson' => [ 'required', 'min:2' ,
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            })->ignore($id) ],
            'link' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lessons')->where(function ($query) use($book_id){
                return $query->where('book_id',$book_id);
            })->ignore($id) ],
        ]);

        // return Validator::make($data, [
        //     'lesson' => ['required', 'min:2', Rule::unique('lessons','lesson')->ignore($lesson_id)],
        //     'lessonLink' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('lessons','lessonLink')->ignore($lesson_id)],
        // ]);
    }

    public function deleteLesson(int $id)
    {
        Lesson::find($id)->delete();
    }
}

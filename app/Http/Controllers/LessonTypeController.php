<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\LessonType;

class LessonTypeController extends Controller
{
    public function getAllLessonTypes( int $book_id)
    {
        $lessons=LessonType::where('book_type_id' , $book_id)->with('words')->get();
        $lessonCount=$lessons->count();
        return response()->json(['lessons'=>$lessons,'lessonCount'=>$lessonCount],200);
    }

    public function getOneLessonType(int $lesson_id)
    {
        $lesson=LessonType::where('id',$lesson_id)->withCount('words')->withCount('sentences')->get();
        $wordCount=$lesson[0]->words_count;
        $sentenceCount=$lesson[0]->sentences_count;
        return response()->json(['wordCount'=>$wordCount, 'sentenceCount'=>$sentenceCount],200);
    }

    public function saveLessonType(Request $request)
    {
        $this->lessonValidator($request->all())->validate();
        $lesson=LessonType::create(
            [
                'book_type_id' => $request->book_id,
                'lesson'=> $request->lesson,
                'link'=> $request->link,
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
            'link' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lesson_types')->where(function ($query) use($book_id){
                return $query->where('book_type_id',$book_id);
            }) ],
        ]);
    }

   

    public function editLessonType(Request $request, int $id)
    {
        $this->lessonEditValidator($request->all(),$id)->validate();
        $lesson = LessonType::find($id);

        $lesson->lesson = $request->lesson;
        $lesson->link = $request->link;

        $lesson->save();
    }

    private function lessonEditValidator(array $data,$id)
    {
        $book_id=$data['book_id'];
        return Validator::make($data, [
            'book_id' => [ 'required', 'numeric' ,'exists:book_types,id' ],
            'lesson' => [ 'required', 'min:2' ,
            Rule::unique('lesson_types')->where(function ($query) use($book_id){
                return $query->where('book_type_id',$book_id);
            })->ignore($id) ],
            'link' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('lesson_types')->where(function ($query) use($book_id){
                return $query->where('book_type_id',$book_id);
            })->ignore($id) ],
        ]);
       
    }

    public function deleteLessonType( int $id)
    {
        LessonType::find($id)->delete();
    }
}

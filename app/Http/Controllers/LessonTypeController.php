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
        return response()->json(['lessonTypes'=>$lessons,'lessonTypeCount'=>$lessonCount],200);
    }

    public function getOneLessonType(int $lesson_id)
    {
        $lessonType=LessonType::where('id',$lesson_id)->withCount('words')->withCount('sentences')->get();
        $wordTypeCount=$lessonType[0]->words_count;
        $sentenceTypeCount=$lessonType[0]->sentences_count;
        return response()->json(['wordTypeCount'=>$wordTypeCount, 'sentenceTypeCount'=>$sentenceTypeCount],200);
    }

    public function saveLessonType(Request $request)
    {
        $this->lessonValidator($request->all())->validate();
        $lesson=LessonType::create(
            [
                'book_type_id' => $request->book_id,
                'lesson'=> $request->lesson,
                'lessonLink'=> $request->lessonLink,
            ]
            );
        return response()->json(['lessonType_id'=>$lesson->id],200);
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

   

    public function editLessonType(Request $request, int $lesson_id)
    {
        $this->lessonEditValidator($request->all(),$lesson_id)->validate();
        $lesson = LessonType::find($lesson_id);

        $lesson->lesson = $request->lesson;
        $lesson->lessonLink = $request->lessonLink;

        $lesson->save();
    }

    private function lessonEditValidator(array $data,$lesson_id)
    {
        return Validator::make($data, [
            'lesson' => ['required', 'min:2', Rule::unique('lesson_types','lesson')->ignore($lesson_id)],
            'lessonLink' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('lesson_types','lessonLink')->ignore($lesson_id)],
        ]);
    }

    public function deleteLessonType( int $lesson_id)
    {
        LessonType::find($lesson_id)->delete();
    }
}

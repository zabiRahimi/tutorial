<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\LessonSection;

class LessonSectionController extends Controller
{
    public function saveLessonSection(Request $request)
    {
        $this->lessonSecValidator($request->all())->validate();
        $lesson=LessonSection::create(
            [
                'lesson_id' => $request->lesson_id,
                'lesson_section'=> $request->lesson_section,
                'des'=> $request->des
            ]
            );
        return response()->json();
    }

    protected function lessonSecValidator(array $data)
    {
        $lesson_id=$data['lesson_id']?$data['lesson_id']:'';
        return Validator::make($data, [
            'lesson_id' => [ 'required', 'numeric' ,'exists:lessons,id' ],
            'lesson_section' => [ 'required', 'string', 'min:2' ,
            Rule::unique('lesson_sections')->where(function ($query) use($lesson_id){
                return $query->where('lesson_id',$lesson_id);
            }) ],
            'des'=>['required', 'string', 'min:12'],
        ]);
    }

    public function getLessonSection(Request $request,  $lesson_id)
    {
        $lessonSection=LessonSection::where('lesson_id' , $lesson_id)->get();
        return response()->json(['lessonSection'=>$lessonSection],200);

    }
}

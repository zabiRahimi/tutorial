<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\LessonSection;

class LessonSectionController extends Controller
{

    public function getAllLessonSections($lesson_id)
    {
        $lessonSections=LessonSection::where('lesson_id' , $lesson_id)->get();

        return response()->json(['lessonSections'=>$lessonSections],200);
    }

    public function saveLessonSection(Request $request)
    {
        $this->lessonSecValidator($request->all())->validate();
        $lessonSec=LessonSection::create(
            [
                'lesson_id' => $request->lesson_id,
                'lesson_section'=> $request->lesson_section,
                'des'=> $request->des
            ]
            );
        return response()->json(['lessonSec_id'=>$lessonSec->id],200);
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

    public function editLessonSection(Request $request, int $lessonSec_id)
    {
        $this->lessonSecEditValidator($request->all(),$lessonSec_id)->validate();
        $lessonSec = LessonSection::find($lessonSec_id);

        $lessonSec->lesson_section = $request->lesson_section;
        $lessonSec->des = $request->des;

        $lessonSec->save();
    }

    private function lessonSecEditValidator(array $data,$lessonSec_id)
    {

        $lesson_id=$data['lesson_id']?$data['lesson_id']:'';
        return Validator::make($data, [
            'lesson_id' => [ 'required', 'numeric' ,'exists:lessons,id' ],
            'lesson_section' => [ 'required', 'string', 'min:2' ,
            Rule::unique('lesson_sections')->where(function ($query) use($lesson_id){
                return $query->where('lesson_id',$lesson_id);
            })->ignore($lessonSec_id) ],
            'des'=>['required', 'string', 'min:12'],
        ]);
    }

    public function deleteLessonSection(Request $request, int $lessonSec_id)
    {
        LessonSection::find($lessonSec_id)->delete();
    }
}

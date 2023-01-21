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

        $lessonSections = LessonSection::where('lesson_id', $lesson_id)->orderBy('ordering')->get();
        foreach($lessonSections as $lessonSection){
            $lessonSection->lesson->book;
        }
        return response()->json(['lessonSections' => $lessonSections], 200);

    }
    

    public function saveLessonSection(Request $request)
    {
        $this->lessonSecValidator($request->all())->validate();
        $lessonSec = LessonSection::create(
            [
                'lesson_id' => $request->lesson_id,
                'ordering' => $request->ordering,
                'lesson_section' => $request->lesson_section,
                'des' => $request->des
            ]
        );
        if ($request->updateOrdering) {
            $this->updateOrdering($request->lesson_id, $lessonSec->id, $request->ordering);
        }
        return response()->json(['lessonSec_id' => $lessonSec->id, 'ordering' =>$request->ordering], 200);
    }

    protected function lessonSecValidator(array $data)
    {
        $lesson_id = $data['lesson_id'] ? $data['lesson_id'] : '';
        return Validator::make($data, [
            'lesson_id' => ['required', 'numeric', 'exists:lessons,id'],
            'updateOrdering' => ['required', 'boolean'],
            'ordering' => [
                'required', 'numeric'
            ],
            'lesson_section' => [
                'required', 'string', 'min:2',
                Rule::unique('lesson_sections')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_id', $lesson_id);
                })
            ],
            'des' => ['required', 'string', 'min:12'],
        ]);
    }

    public function editLessonSection(Request $request, int $lessonSec_id)
    {
        $this->lessonSecEditValidator($request->all(), $lessonSec_id)->validate();
        $lessonSec = LessonSection::find($lessonSec_id);

        $lessonSec->ordering=$request->ordering;
        $lessonSec->lesson_section = $request->lesson_section;
        $lessonSec->des = $request->des;

        $lessonSec->save();

        if ($request->updateOrdering) {
            $this->updateOrdering($request->lesson_id, $lessonSec_id, $request->ordering);
        }
    }

    private function lessonSecEditValidator(array $data, $lessonSec_id)
    {

        $lesson_id = $data['lesson_id'] ? $data['lesson_id'] : '';
        return Validator::make($data, [
            'lesson_id' => ['required', 'numeric', 'exists:lessons,id'],
            'updateOrdering' => ['required', 'boolean'],
            'ordering' => [
                'required', 'numeric'
            ],
            'lesson_section' => [
                'required', 'string', 'min:2',
                Rule::unique('lesson_sections')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_id', $lesson_id);
                })->ignore($lessonSec_id)
            ],
            'des' => ['required', 'string', 'min:12'],
        ]);
    }

    public function deleteLessonSection(Request $request, int $lessonSec_id)
    {
        LessonSection::find($lessonSec_id)->delete();
    }

    /**
     * هرگاه کاربر اوردرینگ یا ترتیب بخش ها را تغییر داد لازم است که
     * اوردرینگ همه بخشها آپدیت شود
     *
     * @param [type] $lesson_id
     * @param [type] $id
     * @param [type] $ordering
     * @return void
     */
    public function updateOrdering($lesson_id, $id, $ordering)
    {
        
        $lessonSections = LessonSection::where('lesson_id', $lesson_id)->orderBy('ordering')->get();
        foreach ($lessonSections as $lessonSec) {
            if ($lessonSec->ordering < $ordering or $lessonSec->id == $id ) {
                continue;
                // echo "The number is:  <br>";
                // $out1 = new \Symfony\Component\Console\Output\ConsoleOutput();
                // $out1->writeln("Hello from Terminal");
            }
            $lessonSec2 = LessonSection::find($lessonSec->id);
            $lessonSec2->ordering = $lessonSec->ordering + 1;
            $lessonSec2->save();
        }
    }
}
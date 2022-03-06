<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Word;

class WordController extends Controller
{
    public function getAllWordTypes(int $lesson_id)
    {
        $words = Word::where('lesson_type_id', $lesson_id)->get();
        $wordCount = $words->count();
        return response()->json(['words' => $words, 'wordCount' => $wordCount], 200);
    }

    public function getOneWordType(int $id)
    {
        $Word = Word::find($id)->withCount('sentences')->get();
        $sentenceCount = $Word[0]->sentences_count;
        return response()->json(['sentenceCount' => $sentenceCount], 200);
    }

    public function saveWordType(Request $request)
    {
        $this->wordValidator($request->all())->validate();
        $word = Word::create(
            [
                'lesson_type_id' => $request->lesson_id,
                'link' => $request->link,
                'word' => $request->word,
                'mean' => $request->mean,
                'pronounceEn' => $request->pronounceEn,
                'pronounceFa' => $request->pronounceFa,
            ]
        );
        return response()->json(['id' => $word->id], 200);
    }

    public function wordValidator(array $data)
    {
        $lesson_id = $data['lesson_id'];
        return Validator::make($data, [
            'lesson_id' => ['required', 'numeric', 'exists:lesson_types,id'],
            'link' => [
                'required',
                'regex:/^[A-Za-z0-9-]+$/',
                Rule::unique('words')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_type_id', $lesson_id);
                })
            ],
            'word' => [
                'required', 'string',
                Rule::unique('words')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_type_id', $lesson_id);
                })
            ],
            'mean' => ['nullable', 'string'],
            'pronounceEn' => ['nullable', 'string'],
            'pronounceFa' => ['nullable', 'string'],


        ]);
    }

    public function editWordType(Request $request, int $id)
    {
        $this->wordEditValidator($request->all(), $id)->validate();
        $word = Word::find($id);

        $word->word = $request->word;
        $word->link = $request->link;
        $word->mean=$request->mean;
        $word->pronounceEn=$request->pronounceEn;
        $word->pronounceFa=$request->pronounceFa;

        $word->save();
    }

    private function wordEditValidator(array $data, $id)
    {
        $lesson_id = $data['lesson_id'];

        return Validator::make($data, [
            'lesson_id' => ['required', 'numeric', 'exists:lesson_types,id'],
            'link' => [
                'required',
                'regex:/^[A-Za-z0-9-]+$/',
                Rule::unique('words')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_type_id', $lesson_id);
                })->ignore($id)
            ],
            'word' => [
                'required', 'string',
                Rule::unique('words')->where(function ($query) use ($lesson_id) {
                    return $query->where('lesson_type_id', $lesson_id);
                })->ignore($id)
            ],
            'mean' => ['nullable', 'string'],
            'pronounceEn' => ['nullable', 'string'],
            'pronounceFa' => ['nullable', 'string'],
        ]);
    }

    public function deleteWordType(int $id)
    {
        Word::find($id)->delete();
    }
}

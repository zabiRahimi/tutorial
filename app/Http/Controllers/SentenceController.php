<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Sentence;

class SentenceController extends Controller
{
    public function saveSentence(Request $request)
    {
        $this->sentenceValidator($request->all())->validate();
        $sentence = Sentence::create(
            [
                'word_id' => $request->word_id,
                'sentence' => $request->sentence,
                'mean' => $request->mean,
                'pronounceEn' => $request->pronounceEn,
                'pronounceFa' => $request->pronounceFa,
            ]
        );
        return response()->json(['sentence_id' => $sentence->id], 200);
    }

    public function sentenceValidator(array $data)
    {
        $word_id = $data['word_id'];
        return Validator::make($data, [
            'word_id' => ['required', 'numeric', 'exists:words,id'],
            'sentence' => [
                'required', 'string', 'min:2',
                Rule::unique('sentences')->where(function ($query) use ($word_id) {
                    return $query->where('word_id', $word_id);
                })
            ],
            'mean' => ['nullable', 'string'],
            'pronounceEn' => ['nullable', 'string'],
            'pronounceFa' => ['nullable', 'string'],
        ]);
    }

    public function getSentences(Request $request, int $word_id)
    {
        $sentences = Sentence::where('word_id', $word_id)->get();
        return response()->json(['sentences' => $sentences], 200);
    }
}

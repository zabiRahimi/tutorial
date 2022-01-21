<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Word;

class WordController extends Controller
{
    public function saveWord(Request $request)
    {
        $this->wordValidator($request->all())->validate();
        $word=Word::create(
            [
                'lesson_type_id' => $request->lesson_id,
                'wordLink'=> $request->wordLink,
                'word'=> $request->word,
                'mean'=> $request->mean,
                'pronounceEn'=> $request->pronounceEn,
                'pronounceFa'=> $request->pronounceFa,
            ]
            );
        return response()->json(['word_id'=>$word->id],200);
    }

    public function wordValidator(array $data)
    {
        $lesson_id=$data['lesson_id'];
        return Validator::make($data, [
            'lesson_id' => [ 'required', 'numeric' ,'exists:lesson_types,id' ],
            'wordLink' => [ 'required', 'min:2' ,
            'regex:/^[A-Za-z0-9-]+$/',
            Rule::unique('words')->where(function ($query) use($lesson_id){
                return $query->where('lesson_type_id',$lesson_id);
            }) ],
            'word' => [ 'required', 'string', 'min:2' ,
            Rule::unique('words')->where(function ($query) use($lesson_id){
                return $query->where('lesson_type_id',$lesson_id);
            }) ],
            'mean' => [ 'nullable', 'string'  ],
            'pronounceEn' => [ 'nullable', 'string'  ],
            'pronounceFa' => [ 'nullable', 'string'  ],

            
        ]);
    }

    public function getWords(Request $request, int $lesson_id)
    {
        $words=Word::where('lesson_type_id' , $lesson_id)->get();
        return response()->json(['words'=>$words],200);

    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\BookType;


class BookTypeController extends Controller
{
    

    public function getAllBookTypes()
    {
        $books=BookType::all();
        //توسط این دستور رابطه بین جدول پدر و فرزند برقرار می شود
        //یعنی جدول فرزند با پدر جوین می‌شود
        $books->load('lesson_types');
        return response()->json(['books'=>$books],200);

    }

    public function getOneBookType(int $id)
    {
        $book=BookType::find($id)->withCount('lesson_types')->withCount('words')->withCount('sentences')->get();

        $lessonCount=$book[0]->lesson_types_count;
        $wordCount=$book[0]->words_count;
        $sentenceCount=$book[0]->sentences_count;

        return response()->json(['book'=>$book,'lessonCount'=>$lessonCount,'wordCount'=>$wordCount,'sentenceCount'=>$sentenceCount],200);
    }


    public function saveBookType(Request $request)
    {
        $this->bookValidator($request->all())->validate();
        $book=BookType::create(
            [
                'book'=> $request->book,
                'link'=> $request->link
            ]
            );
        return response()->json(['book_id'=>$book->id],200);
    }

    public function bookValidator(array $data)
    {
        return Validator::make($data, [
            'book' => [ 'required', 'string', 'min:2' ,'unique:book_types,book' ],
            'link' => [ 'required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2' ,'unique:book_types,link' ],
        ]);
    }

    public function editBookType(Request $request, int $id)
    {
        $this->bookEditValidator($request->all(),$id)->validate();
        $book = BookType::find($id);

        $book->book = $request->book;
        $book->link = $request->link;

        $book->save();
    }

    private function bookEditValidator(array $data,$id)
    {
        return Validator::make($data, [
            'book' => ['required', 'min:2', Rule::unique('book_types','book')->ignore($id)],
            'link' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('book_types','link')->ignore($id)],
        ]);
    }

    public function deleteBookType(int $id)
    {
        BookType::find($id)->delete();
    }
}

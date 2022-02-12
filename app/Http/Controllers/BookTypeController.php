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
        $bookTypes=BookType::all();
        //توسط این دستور رابطه بین جدول پدر و فرزند برقرار می شود
        //یعنی جدول فرزند با پدر جوین می‌شود
        $bookTypes->load('lesson_types');
        return response()->json(['bookTypes'=>$bookTypes],200);

    }

    public function getOneBookType(int $id)
    {
        $bookType=BookType::where('id',$id)->withCount('lesson_types')->withCount('words')->withCount('sentences')->get();

        $lessonCount=0;
        $wordCount=0;
        $sentenceCount=0;

        foreach($bookType as $book){
            $lessonCount += $book->lesson_types_count;
            $wordCount +=$book -> words_count ;
            $sentenceCount += $book-> sentences_count;
        }

        return response()->json(['bookType'=>$bookType,'lessonCount'=>$lessonCount,'wordCount'=>$wordCount,'sentenceCount'=>$sentenceCount],200);
    }


    public function saveBook(Request $request)
    {
        $this->bookValidator($request->all())->validate();
        $book=BookType::create(
            [
                'book'=> $request->book,
                'bookLink'=> $request->bookLink
            ]
            );
        return response()->json(['book_id'=>$book->id],200);
    }

    public function bookValidator(array $data)
    {
        return Validator::make($data, [
            'book' => [ 'required', 'alpha_dash', 'min:2' ,'unique:book_types,book' ],
            'bookLink' => [ 'required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2' ,'unique:book_types,bookLink' ],
        ]);
    }

    public function editBookType(Request $request, int $book_id)
    {
        $this->bookEditValidator($request->all(),$book_id)->validate();
        $book = BookType::find($book_id);

        $book->book = $request->book;
        $book->bookLink = $request->bookLink;

        $book->save();
    }

    private function bookEditValidator(array $data,$book_id)
    {
        return Validator::make($data, [
            'book' => ['required', 'min:2', Rule::unique('book_types','book')->ignore($book_id)],
            'bookLink' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('book_types','bookLink')->ignore($book_id)],
        ]);
    }

    public function deleteBookType(int $book_id)
    {
        BookType::find($book_id)->delete();
    }
}

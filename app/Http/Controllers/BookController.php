<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Book;
class BookController extends Controller
{
    public function getBook()
    {
        $book=Book::all();
        //توسط این دستور رابطه بین جدول پدر و فرزند برقرار می شود
        //یعنی جدول فرزند با پدر جوین می‌شود
        $book->load('lessons');
        return response()->json(['book'=>$book],200);

    }


    public function saveBook(Request $request)
    {
        $this->bookValidator($request->all())->validate();
        $book=Book::create(
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
            'book' => [ 'required', 'alpha_dash', 'min:2' ,'unique:books,book' ],
            'bookLink' => [ 'required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2' ,'unique:books,bookLink' ],
        ]);
    }
}

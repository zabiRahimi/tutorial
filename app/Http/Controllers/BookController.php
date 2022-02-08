<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


use App\Models\Book;

class BookController extends Controller
{
    public function getBooks()
    {
        $books = Book::all();
        //توسط این دستور رابطه بین جدول پدر و فرزند برقرار می شود
        //یعنی جدول فرزند با پدر جوین می‌شود
        $books->load('lessons');

        return response()->json(['books' => $books], 200);
    }


    public function saveBook(Request $request)
    {
        $this->bookValidator($request->all())->validate();
        $book = Book::create(
            [
                'book' => $request->book,
                'bookLink' => $request->bookLink
            ]
        );
        return response()->json(['book_id' => $book->id], 200);
    }

    public function bookValidator(array $data)
    {


        return Validator::make($data, [
            'book' => ['required', 'min:2', 'unique:books,book'],
            'bookLink' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', 'unique:books,bookLink'],
        ]);
    }

    public function editBook(Request $request, int $book_id)
    {
        $this->bookEditValidator($request->all(),$book_id)->validate();
        $book = Book::find($book_id);

        $book->book = $request->book;
        $book->bookLink = $request->bookLink;

        $book->save();
    }

    private function bookEditValidator(array $data,$book_id)
    {
        return Validator::make($data, [
            'book' => ['required', 'min:2', Rule::unique('books','book')->ignore($book_id)],
            'bookLink' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('books','bookLink')->ignore($book_id)],
        ]);
    }

    public function deleteBook(Request $request, int $book_id)
    {
        Book::find($book_id)->delete();
    }
}

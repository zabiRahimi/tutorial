<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\Book;

class BookController extends Controller
{
    public function getAllBooks()
    {
        $books = Book::all();

        //توسط این دستور رابطه بین جدول پدر و فرزند برقرار می شود
        //یعنی جدول فرزند با پدر جوین می‌شود
        $books->load('lessons');

        return response()->json(['books' => $books], 200);
    }

    public function getOneBook(int $id)
    {
        $book=Book::find($id)->withCount('lessons')->withCount('lesson_sections')->get();

        $lessonCount=$book[0]->lessons_count;
        $lessonSecCount=$book[0]->lesson_sections_count;

        return response()->json(['book'=>$book,'lessonCount'=>$lessonCount,'lessonSecCount'=>$lessonSecCount],200);
    }

    public function saveBook(Request $request)
    {
        $this->bookValidator($request->all())->validate();
        $book = Book::create(
            [
                'book' => $request->book,
                'link' => $request->link
            ]
        );
        return response()->json(['id' => $book->id], 200);
    }

    public function bookValidator(array $data)
    {
        return Validator::make($data, [
            'book' => ['required', 'min:2', 'unique:books,book'],
            'link' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', 'unique:books,link'],
        ]);
    }

    public function editBook(Request $request, int $id)
    {
        $this->bookEditValidator($request->all(),$id)->validate();
        $book = Book::find($id);

        $book->book = $request->book;
        $book->link = $request->link;

        $book->save();
    }

    private function bookEditValidator(array $data,$id)
    {
        return Validator::make($data, [
            'book' => ['required', 'min:2', Rule::unique('books','book')->ignore($id)],
            'link' => ['required', 'regex:/^[A-Za-z0-9-]+$/', 'min:2', Rule::unique('books','link')->ignore($id)],
        ]);
    }

    public function deleteBook(Request $request, int $id)
    {
        Book::find($id)->delete();
    }
}

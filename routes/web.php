<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/saveBook', [App\Http\Controllers\BookController::class, 'saveBook']);
Route::get('/getAllBooks', [App\Http\Controllers\BookController::class, 'getAllBooks']);
Route::get('/getOneBook/{book_id}', [App\Http\Controllers\BookController::class, 'getOneBook']);
Route::put('/editBook/{book_id}', [App\Http\Controllers\BookController::class, 'editBook']);
Route::delete('/deleteBook/{book_id}', [App\Http\Controllers\BookController::class, 'deleteBook']);


Route::post('/saveLesson', [App\Http\Controllers\LessonController::class, 'saveLesson']);
Route::get('/getAllLessons/{book_id}', [App\Http\Controllers\LessonController::class, 'getAllLessons']);
Route::get('/getOneLesson/{lesson_id}', [App\Http\Controllers\LessonController::class, 'getOneLesson']);
Route::put('/editLesson/{lesson_id}', [App\Http\Controllers\LessonController::class, 'editLesson']);
Route::delete('/deleteLesson/{lesson_id}', [App\Http\Controllers\LessonController::class, 'deleteLesson']);

Route::post('/saveLessonSection', [App\Http\Controllers\LessonSectionController::class, 'saveLessonSection']);
Route::get('/getAllLessonSections/{lesson_id}', [App\Http\Controllers\LessonSectionController::class, 'getAllLessonSections']);
Route::get('/getOneLessonSection/{id}', [App\Http\Controllers\LessonSectionController::class, 'getOneLessonSection']);
Route::put('/editLessonSection/{lessonSec_id}', [App\Http\Controllers\LessonSectionController::class, 'editLessonSection']);
Route::delete('/deleteLessonSection/{lessonSec_id}', [App\Http\Controllers\LessonSectionController::class, 'deleteLessonSection']);

Route::post('/saveLink', [App\Http\Controllers\LinkController::class, 'saveLink']);
Route::get('/getHasLinks/{has_link_id}', [App\Http\Controllers\LinkController::class, 'getHasLinks']);
// Route::get('/getOneLessonSection/{lessonSec_id}', [App\Http\Controllers\LinkController::class, 'getOneLessonSection']);
// Route::put('/editLessonSection/{lessonSec_id}', [App\Http\Controllers\LinkController::class, 'editLessonSection']);
 Route::delete('/deleteLink/{lesson_section_id}/{has_link_id}', [App\Http\Controllers\LinkController::class, 'deleteLink']);

// type spell translate
Route::post('/saveBookType', [App\Http\Controllers\BookTypeController::class, 'saveBookType']);
Route::get('/getAllBookTypes', [App\Http\Controllers\BookTypeController::class, 'getAllBookTypes']);
Route::get('/getOneBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'getOneBookType']);
Route::put('/editBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'editBookType']);
Route::delete('/deleteBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'deleteBookType']);

Route::post('/saveLessonType', [App\Http\Controllers\LessonTypeController::class, 'saveLessonType']);
Route::get('/getAllLessonTypes/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'getAllLessonTypes']);
Route::get('/getOneLessonType/{lesson_id}', [App\Http\Controllers\LessonTypeController::class, 'getOneLessonType']);
Route::put('/editLessonType/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'editLessonType']);
Route::delete('/deleteLessonType/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'deleteLessonType']);

Route::post('/saveWordType', [App\Http\Controllers\WordController::class, 'saveWordType']);
Route::get('/getAllWordTypes/{lesson_id}', [App\Http\Controllers\WordController::class, 'getAllWordTypes']);
Route::get('/getOneWordType/{word_id}', [App\Http\Controllers\WordController::class, 'getOneWordType']);
Route::put('/editWordType/{word_id}', [App\Http\Controllers\WordController::class, 'editWordType']);
Route::delete('/deleteWordType/{word_id}', [App\Http\Controllers\WordController::class, 'deleteWordType']);

Route::post('/saveSentenceType', [App\Http\Controllers\SentenceController::class, 'saveSentenceType']);
Route::get('/getAllSentenceTypes/{word_id}', [App\Http\Controllers\SentenceController::class, 'getAllSentenceTypes']);
Route::get('/getOneSentenceType/{sentence_id}', [App\Http\Controllers\SentenceController::class, 'getOneSentenceType']);
Route::put('/editSentenceType/{sentence_id}', [App\Http\Controllers\SentenceController::class, 'editSentenceType']);
Route::delete('/deleteSentenceType/{sentence_id}', [App\Http\Controllers\SentenceController::class, 'deleteSentenceType']);

Route::get('/{any?}', function () {
    return view('home'); // or wherever your React app is bootstrapped.
})->where('any', '.*');

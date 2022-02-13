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

// Route::get('/', function () {
//     return view('home');
// });


Route::post('/saveBook', [App\Http\Controllers\BookController::class, 'saveBook']);
Route::get('/getBooks', [App\Http\Controllers\BookController::class, 'getBooks']);
Route::put('/editBook/{book_id}', [App\Http\Controllers\BookController::class, 'editBook']);
Route::delete('/deleteBook/{book_id}', [App\Http\Controllers\BookController::class, 'deleteBook']);


Route::post('/saveLesson', [App\Http\Controllers\LessonController::class, 'saveLesson']);
Route::get('/getLessons/{book_id}', [App\Http\Controllers\LessonController::class, 'getLessons']);
Route::put('/editLesson/{lesson_id}', [App\Http\Controllers\LessonController::class, 'editLesson']);
Route::delete('/deleteLesson/{lesson_id}', [App\Http\Controllers\LessonController::class, 'deleteLesson']);

Route::post('/saveLessonSection', [App\Http\Controllers\LessonSectionController::class, 'saveLessonSection']);
Route::get('/getLessonSections/{lesson_id}', [App\Http\Controllers\LessonSectionController::class, 'getLessonSections']);
Route::put('/editLessonSection/{lessonSec_id}', [App\Http\Controllers\LessonSectionController::class, 'editLessonSection']);
Route::delete('/deleteLessonSection/{lessonSec_id}', [App\Http\Controllers\LessonSectionController::class, 'deleteLessonSection']);

// type spell translate
Route::post('/saveBookType', [App\Http\Controllers\BookTypeController::class, 'saveBook']);
Route::get('/getAllBookTypes', [App\Http\Controllers\BookTypeController::class, 'getAllBookTypes']);
Route::get('/getOneBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'getOneBookType']);
Route::put('/editBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'editBookType']);
Route::delete('/deleteBookType/{book_id}', [App\Http\Controllers\BookTypeController::class, 'deleteBookType']);

Route::post('/saveLessonType', [App\Http\Controllers\LessonTypeController::class, 'saveLessonType']);
Route::get('/getAllLessonTypes/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'getAllLessonTypes']);
Route::get('/getOneLessonType/{lesson_id}', [App\Http\Controllers\LessonTypeController::class, 'getOneLessonType']);
Route::put('/editLessonType/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'editLessonType']);
Route::delete('/deleteLessonType/{book_id}', [App\Http\Controllers\LessonTypeController::class, 'deleteLessonType']);

Route::post('/saveWord', [App\Http\Controllers\WordController::class, 'saveWord']);
Route::get('/getWords/{lesson_id}', [App\Http\Controllers\WordController::class, 'getWords']);

Route::post('/saveSentence', [App\Http\Controllers\SentenceController::class, 'saveSentence']);
Route::get('/getSentences/{word_id}', [App\Http\Controllers\SentenceController::class, 'getSentences']);

Route::get('/{any?}', function () {
    return view('home'); // or wherever your React app is bootstrapped.
})->where('any', '.*');
// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

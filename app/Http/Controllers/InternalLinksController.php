<?php

namespace App\Http\Controllers;

use App\Models\InternalLinks;
use Illuminate\Http\Request;

class InternalLinksController extends Controller
{
    /**
     * دریافت لینک های مربوط به یک بخش از درس
     *
     * @param [type] $book_id
     * @param [type] $lesson_id
     * @param [type] $lessonSec_id
     * @return void
     */
    public function getHasLinks($book_id, $lesson_id, $lessonSec_id)
    {
        $allLinks = InternalLinks::where('book_id', $book_id)->where('lesson_id', $lesson_id)->where('lesson_section_id', $lessonSec_id)->get();

        return response()->json(['allLinks' => $allLinks], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InternalLinks  $internalLinks
     * @return \Illuminate\Http\Response
     */
    public function show(InternalLinks $internalLinks)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InternalLinks  $internalLinks
     * @return \Illuminate\Http\Response
     */
    public function edit(InternalLinks $internalLinks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InternalLinks  $internalLinks
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InternalLinks $internalLinks)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InternalLinks  $internalLinks
     * @return \Illuminate\Http\Response
     */
    public function destroy(InternalLinks $internalLinks)
    {
        //
    }
}

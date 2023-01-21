<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Link;


class LinkController extends Controller
{
    /**
     * دریافت لینک های مربوط به یک بخش از درس
     *
     * @param [type] $book_id
     * @param [type] $lesson_id
     * @param [type] $lessonSec_id
     * @return void
     */
    public function getHasLinks(int $has_link_id)
    {
        $allLinks = link::where('has_link_id', $has_link_id)->get();
        foreach ($allLinks as $allLink) {
            $allLink->lesson_section->lesson->book;
        }
        return response()->json(['allLinks' => $allLinks], 200);
    }

    public function saveLink(Request $request)
    {

        $link = link::create(
            [

                'lesson_section_id' => $request->lesson_section_id,
                'has_link_id' => $request->has_link_id,

            ]
        );

        /**
         * جهت لینک متقابل
         */
        link::create(
            [

                'lesson_section_id' => $request->has_link_id,
                'has_link_id' => $request->lesson_section_id,

            ]
        );
        return response()->json(['link' => $link], 200);
    }

     public function deleteLink( int $lesson_section_id , int $has_link_id)
    {
        Link::where('lesson_section_id',$lesson_section_id)->where('has_link_id',$has_link_id)->delete();

        //جهت حذف لینک متقابل
        Link::where('lesson_section_id',$has_link_id)->where('has_link_id',$lesson_section_id)->delete();
    }
    
}

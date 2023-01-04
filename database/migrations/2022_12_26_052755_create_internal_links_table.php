<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternalLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internal_links', function (Blueprint $table) {
            $table->id();
            
            $table-> foreignId('book_id')->constrained()->onUpdate('cascade')->onDelete('cascade')->comment('کتابی که قرار است در آن لینک ایجاد شود');
            $table-> foreignId('lesson_id')->constrained()->onUpdate('cascade')->onDelete('cascade')->comment('درسی که قرار است در آن لینک ایجاد شود');
            $table-> foreignId('lesson_section_id')->constrained()->onUpdate('cascade')->onDelete('cascade')->comment('بخشی که قرار است در آن لینک ایجاد شود');
            $table-> foreignId('book2_id')->constrained('books')->onUpdate('cascade')->onDelete('cascade')->comment('کتابی که قرار است به آن لینک شود');
            $table-> foreignId('lesson2_id')->constrained('lessons')->onUpdate('cascade')->onDelete('cascade')->comment('درسی که قرار است به آن لینک شود');
            $table-> foreignId('lesson_section2_id')->constrained('lesson_sections')->onUpdate('cascade')->onDelete('cascade')->comment('بخشی که قرار است که به آن لینک شود');
            $table-> string('title')->comment(' تیتر بخشی که به آن لینک شده است');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('internal_links');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lesson_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_type_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('lesson' ,15)->index();
            $table->string('lessonLink' ,15)->comment('این کلمه برای استفاده در لینک است. نباید حاوی فضای خالی باشد.');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lesson_types');
    }
}

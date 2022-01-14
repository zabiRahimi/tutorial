<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSentencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sentences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('word_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->text('sentence')->index();
            $table->text('mean')->nullable()->comment('معنی');
            $table->text('pronounceEn')->nullable()->comment('تلفظ به انگلیسی');
            $table->text('pronounceFa')->nullable()->comment('تلفظ به فارسی');
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
        Schema::dropIfExists('sentences');
    }
}

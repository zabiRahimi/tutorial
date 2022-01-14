<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_type_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('wordLink')->comment('استفاده در آدرس');
            $table->string('word',70)->index();
            $table->string('mean',70)->nullable()->comment('معنی');
            $table->string('pronounceEn',70)->nullable()->comment('تلفظ به انگلیسی');
            $table->string('pronounceFa',100)->nullable()->comment('تلفظ به فارسی');
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
        Schema::dropIfExists('words');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_section_id')->comment('شناسه بخشی که به آن لینک شده')->constrained()->onUpdate('cascade')->onDelete('cascade')->comment('بخشی که قرار است در آن لینک ایجاد شود');
            $table->integer('has_link_id')->comment('شناسه بخشی که لینک در آن ایجاد شده');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('links');
    }
}

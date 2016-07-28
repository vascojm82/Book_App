<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Book extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book', function (Blueprint $table) {
        $table->increments('bookId');
        $table->string('ISBN');
        $table->string('name');
        $table->string('details');
        $table->string('category');
        $table->string('author');
        $table->string('publish_date');
        $table->integer('on_hand');
        $table->integer('on_loan');
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('book');
    }
}

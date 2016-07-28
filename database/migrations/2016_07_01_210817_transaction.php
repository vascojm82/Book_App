<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Transaction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          Schema::create('transaction', function(Blueprint $table){
              $table->increments('transactionId');
              $table->integer('bookId')->unsigned();
              $table->foreign('bookId')->references('bookId')->on('book');
              $table->string('transaction_type');
              $table->date('transaction_date');
              $table->date('issue_date');
              $table->date('expected_return_date');
              $table->date('return_date');
          });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('transaction');
    }
}

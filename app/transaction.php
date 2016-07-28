<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class transaction extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
     protected $table = 'transaction';
     protected $primaryKey = 'transactionId';
     public $timestamps = false;

     protected $fillable = ['bookId', 'transaction_type', 'transaction_date', 'issue_date', 'expected_return_date' ,'return_date'];
}

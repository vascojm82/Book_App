<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class book extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'book';
    protected $primaryKey = 'bookId';
    public $timestamps = false;

    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['ISBN', 'name', 'details', 'category', 'author', 'publish_date', 'on_hand', 'on_loan'];
}

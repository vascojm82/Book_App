<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


// Route::get('/testretrieve', 'booksController@testRetrieve');
//
// Route::get('/testupdate', 'booksController@testUpdate');
//
// Route::get('/testdelete', 'booksController@testDelete');
//
// Route::get('/testsave', 'transactionController@testSave');
//
// Route::get('/testupdate', 'transactionController@testUpdate');

Route::get('/', 'booksController@home');

Route::get('/book/count', 'booksController@count');

Route::get('/transaction/count', 'transactionController@count');

Route::resource('/book','booksController');       //Does all routes for you: index,store,create,destroy,update,show,edit
                                                  //To see all routes:  php artisan route:list

Route::resource('/transaction', 'transactionController');

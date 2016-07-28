<?php

namespace App\Http\Controllers;

use Yajra\Datatables\Facades\Datatables;

use App\Book;

use Illuminate\Http\Request;

use App\Http\Requests;

class booksController extends Controller
{
      //Home Page
      public function home(){
          return view('index');
      }

      //Retrieve count of all records in book table
      public function count(){
          return Book::count();
      }

      //Retrieve all book records, pagination done by Datatables on the server side (Yajra library),
      //on request made by JQuery DataTables plugin (5 records @ time) on the client side.
      public function index(){
          $tbl =  Book::select(array(
            'bookId', 'ISBN', 'name', 'details', 'category', 'author', 'publish_date', 'on_hand', 'on_loan'
          ));

          return Datatables::of($tbl)->make(true);
      }

      //Retrieve single book record based on bookId
      public function show($bookId){
          return Book::find($bookId)->toJson();
      }

      //Save new book record to database
      public function store(Request $request){
          $book = Book::create($request->all());  //Mass assignment.  'create' makes a new book object with all the values of the POST request,
                                                  //inserts the contents of that object to the database table pertaining to the object's model,
                                                  //in our case the book table, then returns this object to you.
          return $book->toJson();
      }

      //Retrieve single book record by bookId to be edited
      public function edit($bookId){
          $book = Book::find($bookId);

          return $book->toJson();
      }

      //Update single book record based on bookId
      public function update(Request $book)
      {
          $newBook = Book::find($book->bookId);
          $newBook->ISBN         = $book->ISBN;
          $newBook->name         = $book->name;
          $newBook->details      = $book->details;
          $newBook->category     = $book->category;
          $newBook->author       = $book->author;
          $newBook->publish_date = $book->publish_date;
          $newBook->on_hand      = $book->on_hand;
          $newBook->on_loan      = $book->on_loan;
          $newBook->save();

          return Response()->json(['sms'=>'Update Successfull']);
      }

      //Delete single record from book table
      public function destroy(Request $request){
          Book::destroy($request->bookId);

          return Response()->json(['sms'=>'Delete Successfull']);
      }












      // public function testRetrieve(){
      //     return view('test.AJAX_book_index');
      // }
      //
      // public function testSave(){
      //     return view('test.AJAX_test_save');
      // }
      //
      // public function testUpdate(){
      //     return view('test.AJAX_test_update');
      // }
      //
      // public function testDelete(){
      //     return view('test.AJAX_test_delete');
      // }


}

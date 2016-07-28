<?php

namespace App\Http\Controllers;

use Yajra\Datatables\Facades\Datatables;

use App\Transaction;

use Illuminate\Http\Request;

use App\Http\Requests;

class transactionController extends Controller
{
      //Retrieve count of all records in transaction table
      public function count(){
          return Transaction::count();
      }

      //Retrieve all transaction records paginated to 10 records per page
      public function index(){
        $tbl =  Transaction::select(array(
          'transactionId', 'bookId', 'transaction_type', 'transaction_date', 'issue_date', 'expected_return_date', 'return_date'
        ));

        return Datatables::of($tbl)->make(true);
      }

      //Retrieve single transaction record based on transactionId
      public function show($transactionId){
          return Transaction::find($transactionId)->toJson();
      }

      //Save new book record to database
      public function store(Request $request){
          $transaction = Transaction::create($request->all());    //Mass assignment.  'create' makes a new transaction object with all the values of the POST request,
                                                                  //inserts the contents of that object to the database table pertaining to the object's model,
                                                                  //in our case the transaction table, then returns this object to you.
          return $transaction->toJson();
      }

      //Retrieve single transaction record by transactionId to be edited
      public function edit($transactionId){
          $transaction = Transaction::find($transactionId);

          return $transaction->toJson();
      }

      //Update single transaction record based on transactionId
      public function update(Request $transaction)
      {
          $newTransaction = Transaction::find($transaction->transactionId);
          $newTransaction->transaction_type   = $transaction->transaction_type;
          $newTransaction->return_date        = $transaction->return_date;
          $newTransaction->save();

          return Response()->json(['sms'=>'Update Successfull']);
      }




      public function testSave(){
          return view('test.AJAX_transaction_save');
      }
      //
      // public function testUpdate(){
      //     return view('test.AJAX_transaction_update');
      // }
}

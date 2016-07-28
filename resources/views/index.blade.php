@extends('layout')

@section('tables')

      <!--- Book Table --->
      <div id="bookTable" class="col-xs-6">
            <div class="table-responsive">
                <table id="booksTable" class="table table-striped">
                      <caption class="captions">Books</caption>
                      <thead>
                        <tr>
                            <th>BookID</th>
                            <th>ISBN</th>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Publish Date</th>
                            <th>On Hand</th>
                            <th>On Loan</th>
                        </tr>
                    </thead>
                </table>

                <div class="text-center">
                    <div class="btn-group">
                        <button id="btn_book_add"type="button" class="btn btn-default" onclick="book_add()">Add</button>
                        <button id="btn_book_edit" type="button" class="btn btn-default disabled" onclick="book_edit()">Edit</button>
                        <button id="btn_book_delete" type="button" class="btn btn-default confirm disabled" onclick="book_delete()">Delete</button>
                    </div>
                </div>
              </div>
      </div>

      <!--- Transaction Table --->
      <div id="transactionTable" class="col-xs-6">
              <div class="table-responsive">
                  <table id="transactionsTable" class="table table-striped">
                    <caption class="captions">Transactions</caption>
                    <thead>
                        <tr>
                            <th>TransactionID</th>
                            <th>BookID</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Issue Date</th>
                            <th>Expected Return Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                  </table>

                  <div class="text-center">
                      <div class="btn-group">
                          <button id="btn_transaction_add"type="button" class="btn btn-default" onclick="transaction_add()">Add</button>
                          <button id="btn_transaction_edit" type="button" class="btn btn-default disabled" onclick="transaction_edit()">Edit</button>
                      </div>
                  </div>

              </div>
      </div>

      <div id="form_Book"></div>
      <div id="form_Transaction"></div>

       <script type="text/javascript" src="resources/assets/JS/Book_AJAX/Book_Populate_Table.js"></script>
       <script type="text/javascript" src="resources/assets/JS/transaction_AJAX/Transaction_Populate_Table.js"></script>
       <script type="text/javascript" src="resources/assets/JS/Book_AJAX/Book_Table_operations.js"></script>
       <script type="text/javascript" src="resources/assets/JS/transaction_AJAX/Transaction_Table_operations.js"></script>
       <script type="text/javascript">
            $('#form_Book').load('/resources/assets/HTML/Modals/book_form_modal.html');
            $('#form_Transaction').load('resources/assets/HTML/Modals/transaction_form_modal.html');
       </script>

@endsection

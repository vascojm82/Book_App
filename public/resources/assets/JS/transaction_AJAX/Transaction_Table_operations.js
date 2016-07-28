var trans_route = "http://localhost:8000/transaction",
    trans_op = '',
    trans_type = '',
    book_record = '',
    transaction_inputs,
    raw,
    eventObject;

function watch(){
      transaction_inputs = $('#transaction_form .transaction_input');     //Array of DOM elements with class .transaction_input inside of transaction form
      raw = transaction_inputs.get(0);                                    //First DOM element in the array
      eventObject = $._data(raw, 'events');                               //Object with events attached to 'raw' DOM element

      //Checking if 'raw' has any events attached to it
      if(eventObject != undefined && eventObject.change != undefined){
          console.log('Transaction Onblur event already present');
      }
      else{
          console.log("Binding Transaction Onblur");

          //Binding blur event handler to all input elements in the form
          transaction_inputs.blur(function() {
                if (validateInputs(transaction_inputs)) {
                    $('#transactionForm_Submit').prop('disabled', false);      //Enable Submit button
                }
          });
      }
}

//Add transaction book_record to `transaction` table and change on_loan qty in `book` table
function transaction_add(){
      trans_op='add';

      //Display Modal;
      $('#transaction_form_modal').modal("show");

      $('#transactionForm_BookId').closest('.form-group').removeClass('hidden');
      $('#transactionForm_Issue_date').closest('.form-group').removeClass('hidden');
      $('#transactionForm_label_type').closest('.form-group').removeClass('hidden');
      $('#transactionForm_label_type').html('issue');
      $('.transaction_edit').addClass('hidden');
      $('#transactionForm_Return_date').addClass('validated');
      $('#transactionForm_label_BookId').closest('.form-group').addClass('hidden');
      $('#transactionForm_label_Issue_date').closest('.form-group').addClass('hidden');
      $('#transactionForm_label_ERD').closest('.form-group').addClass('hidden');
      $('#transactionForm_ERD').closest('.form-group').removeClass('hidden');
      $('#transactionForm_ERD').removeClass('validated');
      $('#transactionForm_BookId').removeAttr('disabled');
      $('#transactionForm_Issue_date').removeAttr('disabled');
      $('#transactionForm_ERD').removeAttr('disabled');
      $('#transactionForm_Type').removeAttr('disabled');

      watch();

      //Submit operation
      $('#transaction_form').on('submit', function(e) {
              var save_BookID        = $('#transactionForm_BookId').val(),
                  save_Issue_date    = $('#transactionForm_Issue_date').val(),
                  save_ERD           = $('#transactionForm_ERD').val(),
                  save_return_date   = $('#transactionForm_Return_date').val();

                  //Inserting New record in `transaction` table
                  $.ajax({
                          headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                              },
                          url: trans_route,
                          type: 'POST',
                          data: {
                                  'bookId': save_BookID,
                                  'transaction_type': 'issue',
                                  'transaction_date': save_Issue_date,
                                  'issue_date': save_Issue_date,
                                  'expected_return_date': save_ERD,
                                  'return_date': save_return_date
                                  },
                          success: function(data){
                                $('#btn_transaction_edit').addClass('disabled');          //Disable form edit button
                                //Adding 1 to on_loan qty in the book table
                                $.ajax({
                                        headers: {
                                              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        url: book_route + '/' + save_BookID,
                                        type: 'POST',
                                        data: {
                                              '_method': 'PUT',
                                              'bookId': book_record.bookId,
                                              'ISBN': book_record.ISBN,
                                              'name': book_record.name,
                                              'details': book_record.details,
                                              'category': book_record.category,
                                              'author': book_record.author,
                                              'publish_date': book_record.publish_date,
                                              'on_hand': book_record.on_hand,
                                              'on_loan': (book_record.on_loan + 1)
                                        },
                                        success: function(data){
                                              console.log('On Loan qty modified, added one!');
                                        },
                                        error: function(){
                                              console.log('Failed to modifiy on loan qty!');
                                        }
                                });
                          },
                          error: function(){
                              console.log('Failed to add new transaction!');
                          }
                    });
            });
};

function transaction_edit(){
      var transaction_Id = transaction_table.cell('.selected', 0).data(),
          transaction_book_ID = transaction_table.cell('.selected', 1).data(),
          transaction_type = transaction_table.cell('.selected', 2).data(),
          transaction_date = transaction_table.cell('.selected', 3).data(),
          transaction_issue_date = transaction_table.cell('.selected', 4).data(),
          transaction_expected_return_date = transaction_table.cell('.selected', 5).data(),
          transaction_return_date = transaction_table.cell('.selected', 6).data(),
          issue_date = $('#transactionForm_Issue_date'),
          expected_return_date = $('#transactionForm_ERD'),
          return_date = $('#transactionForm_Return_date').val();

      if ($('#btn_transaction_edit').hasClass("disabled")) {
            event.stopPropagation();
      } else {
            //Retrieving Book Record associated with transaction
            $.ajax({
                  headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                      },
                  url: book_route + '/' + transaction_book_ID,
                  type: 'GET',
                  data:{},
                  success: function(data){
                        book_record = JSON.parse(data);
                  },
                  error: function(){
                    console.log('Failed to fetch book record');
                  }
            });

            $('#transactionForm_transactionId').closest('.form-group').removeClass('hidden');
            $('#transactionForm_Return_date').removeClass('hidden');
            $('#transactionForm_Type').addClass('validated');
            $('#transactionForm_Type').closest('.form-group').addClass('hidden');
            $('#transactionForm_label_type').closest('.form-group').removeClass('hidden');
            $('#transactionForm_BookId').closest('.form-group').addClass('hidden');
            $('#transactionForm_BookId').addClass('validated');
            $('#transactionForm_label_BookId').closest('.form-group').removeClass('hidden');
            $('#transactionForm_Issue_date').closest('.form-group').addClass('hidden');
            $('#transactionForm_Issue_date').addClass('validated');
            $('#transactionForm_label_Issue_date').closest('.form-group').removeClass('hidden');
            $('#transactionForm_Return_date').addClass('validated');
            $('#transactionForm_label_ERD').closest('.form-group').removeClass('hidden');
            $('#transactionForm_ERD').closest('.form-group').addClass('hidden');
            $('#transactionForm_ERD').addClass('validated');
            $('#transactionForm_Return_date').closest('.form-group').removeClass('hidden');
            $('#transactionForm_Return_date').removeClass('validated');
            $('#transactionForm_transactionId').html(transaction_Id);
            $('#transactionForm_label_type').html('return');
            $('#transactionForm_label_BookId').html(transaction_book_ID);
            $('#transactionForm_label_Issue_date').html(transaction_issue_date);
            $('#transactionForm_label_ERD').html(transaction_expected_return_date);

            if(!transaction_return_date || transaction_return_date == '0000-00-00')
            {
                      $('#transaction_form_modal').modal("show");
                      $('#transaction_form_transactionId_cannot_edit').addClass('hidden');
                      issue_date.closest('.form-group').removeClass('has-success').removeClass('has-error');
                      expected_return_date.closest('.form-group').removeClass('has-success').removeClass('has-error');
                      expected_return_date.removeAttr('disabled');
              }
              else if(transaction_return_date)
              {
                      $.alert({
                            title:'Warning',
                            content: 'Cannot edit records with a return date.',
                            animation: 'rotate',
                            closeAnimation: 'right',
                            confirmButton: 'Close'
                      });
                }

              watch();

              //Submit operation
              $('#transaction_form').on('submit', function(e) {
                      var return_Date = $('#transactionForm_Return_date').val();

                      $.ajax({
                                  headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                      },
                                  url: trans_route + '/' + transaction_Id,
                                  type: 'POST',
                                  data: {
                                          '_method': 'PUT',
                                          'transactionId': transaction_Id,
                                          'bookId': transaction_book_ID,
                                          'transaction_type': 'return',
                                          'transaction_date': transaction_date,
                                          'issue_date': transaction_issue_date,
                                          'expected_return_date': transaction_expected_return_date,
                                          'return_date': return_Date
                                        },
                                  success: function(data){
                                        console.log('Return date added to transaction record!');
                                        if(book_record.on_loan > 0)
                                        {
                                              //Subtracting 1 to on_loan qty in the book table
                                              $.ajax({
                                                      headers: {
                                                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                      },
                                                      url: book_route + '/' + transaction_book_ID,
                                                      type: 'POST',
                                                      data: {
                                                            '_method': 'PUT',
                                                            'bookId':book_record.bookId,
                                                            'ISBN': book_record.ISBN,
                                                            'name': book_record.name,
                                                            'details': book_record.details,
                                                            'category': book_record.category,
                                                            'author':book_record.author,
                                                            'publish_date': book_record.publish_date,
                                                            'on_hand': book_record.on_hand,
                                                            'on_loan': (book_record.on_loan - 1)
                                                        },
                                                        success: function(data){
                                                              console.log('On Loan qty modified, subtracted one!');
                                                        },
                                                        error: function(){
                                                              console.log('Failed to modifiy on loan qty!');
                                                        }
                                                  });
                                        }
                                  },
                                  error: function(){
                                    console.log('Failed to modify transaction record');
                                  }
                      });
                });
            }
};

//Validate bookId input, search in `book` table for that book to exist,
//check for bounds depending on number of books loaned, stock on hand and
//whether the operation is either issue or return
function validate_book_Id(){
      var transaction_book_ID = $('#transactionForm_BookId'),
          type = $('#transactionForm_Type'),
          issue_date = $('#transactionForm_Issue_date'),
          expected_return_date = $('#transactionForm_ERD'),
          book_ID_regX = /^[0-9]\d*$/;                           //Only positive integer numbers

      /******************************************
        BookId valid, if it's a positive integer
      *******************************************/
      if(book_ID_regX.test(transaction_book_ID.val())){

              //Search in DB for book record specified by bookId
              $.ajax({
                    headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                    url: book_route + '/' + transaction_book_ID.val(),
                    type: 'GET',
                    data:{},
                    success: function(data){

                          /*********************************
                            BOOK FOUND !
                          *********************************/

                          console.log('Requested Book Found!');

                          //Saving found record for future use
                          book_record = JSON.parse(data);

                          //Checking if we are loaning more books than we have in stock
                          if( (book_record.on_loan+1) > book_record.on_hand)
                          {
                                  /**BAD: We are above stock qty's**/

                                  console.log('All books with ISBN # ' + book_record.ISBN  + ' are curently loaned.');

                                  //Enable loan error message, All books loaned already
                                  $('#transaction_form_bookId_invalid').html('All books with ISBN # ' + book_record.ISBN  + ' are curently loaned.').removeClass('hidden');

                                  // Add errors highlight
                                  transaction_book_ID.closest('.form-group').removeClass('has-success').addClass('has-error');
                                  transaction_book_ID.removeClass('validated');                             //Flagging input text as NOT been validated
                                  issue_date.prop('disabled','disabled');                                   //Disable issue date field
                                  expected_return_date.prop('disabled','disabled');                         //Disable expected return date field
                                  issue_date.closest('.form-group').removeClass('has-error').removeClass('has-success');
                                  expected_return_date.closest('.form-group').removeClass('has-error').removeClass('has-success');
                                  $('#transaction_form_erd_invalid').addClass('hidden');                     //Hiding expected return date error message
                                  $('#transaction_form_bookId_not_found').addClass('hidden');
                            }
                            else
                            {
                                  /**GOOD: We are within stock bounds**/

                                  transaction_book_ID.closest('.form-group').addClass('has-success').removeClass('has-error');
                                  transaction_book_ID.addClass('validated');                                //Flagging input text as been validated
                                  $('#transaction_form_bookId_invalid').html('').addClass('hidden');        //Hiding bookId error message
                                  issue_date.removeAttr("disabled");                                        //Enable issue date field
                                  expected_return_date.removeAttr("disabled");                              //Enable expected return date field
                                  $('#transaction_form_bookId_invalid').html('').addClass('hidden');
                                  $('#transaction_form_bookId_not_found').addClass('hidden');
                            }
                    },
                    error: function(){

                          /*********************************
                            BOOK NOT FOUND !
                          *********************************/

                          console.log('Failed to find requested bookId!');

                          transaction_book_ID.closest('.form-group').removeClass('has-success').addClass('has-error');      //Add errors highlight
                          transaction_book_ID.removeClass('validated');                                                     //Flagging input text as NOT been validated
                          transaction_book_ID.focus();
                          $('#transaction_form_bookId_invalid').html('').addClass('hidden');                                //Hiding bookId invalid error message
                          $('#transaction_form_bookId_not_found').removeClass('hidden');                                    //Hiding bookId not found error message
                          type.closest('.form-group').removeClass('has-error').removeClass('has-success');                  //Remove error or success highlight
                          issue_date.closest('.form-group').removeClass('has-error').removeClass('has-success');            //Remove error or success highlight
                          expected_return_date.closest('.form-group').removeClass('has-error').removeClass('has-success');  //Remove error or success highlight
                          issue_date.prop('disabled','disabled');                                                           //Disable issue date field
                          expected_return_date.prop('disabled','disabled');                                                 //Disable expected return date field
                          book_record = '';
                    }
              });
        }else{

                /******************************************
                  INVALID bookId NOT A POSITIVE INTEGER !
                *******************************************/

                transaction_book_ID.closest('.form-group').removeClass('has-success').addClass('has-error');                // Add errors highlight
                transaction_book_ID.removeClass('validated');                                                               //Flagging input text as NOT been validated
        }
}

//Validate appropriate date & format entered, generate expected return date (15 days from day of issue)
function validate_issue_date(){
      var issue_date = $('#transactionForm_Issue_date'),
          expected_return_date = $('#transactionForm_ERD');

      // Check if there is an entered value for issue_date
      if(!issue_date.val()) {
            // Add errors highlight
            issue_date.closest('.form-group').removeClass('has-success').addClass('has-error');
            issue_date.removeClass('validated');                                                     //Flagging input text as NOT been validated
      } else {
            // Remove the errors highlight
            issue_date.closest('.form-group').removeClass('has-error').addClass('has-success');
            issue_date.addClass('validated');                                                         //Flagging input text as been validated

            //Generating expected return date 15 days in the future
            expected_return_date.val(new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 15)).toJSON().slice(0,10));
      }
}


//Validate appropriate date & format entered, allow user to override expected return date,
//check if issue date is greater than expected return date
function validate_expected_return_date(){
      var expected_return_date = $('#transactionForm_ERD')
          issue_date = $('#transactionForm_Issue_date'),
          issue = new Date(issue_date.val()),
          erd = new Date(expected_return_date.val());

       if(expected_return_date.val() == '')
       {
            expected_return_date.closest('.form-group').removeClass('has-success').addClass('has-error');
            expected_return_date.removeClass('validated');                                              //Flagging input text as NOT been validated
       }
       else if( !expected_return_date.val() || (erd < issue) ) {
            // Add errors highlight
            expected_return_date.closest('.form-group').removeClass('has-success').addClass('has-error');
            expected_return_date.removeClass('validated');                                              //Flagging input text as NOT been validated
            $('#transaction_form_erd_invalid').removeClass('hidden');                                   //Showing expected return date error message
       }
       else
       {
            // Remove the errors highlight
            expected_return_date.closest('.form-group').removeClass('has-error').addClass('has-success');
            expected_return_date.addClass('validated');                                                  //Flagging input text as been validated
            $('#transaction_form_erd_invalid').addClass('hidden');                                       //Hiding expected return date error message
      }
}

function validate_return_date(){
      var return_date = $('#transactionForm_Return_date');

      // Check if there is an entered value for return_date
      if(!return_date.val()) {
            // Add errors highlight
            return_date.closest('.form-group').removeClass('has-success').addClass('has-error');
            return_date.removeClass('validated');                                                     //Flagging input text as NOT been validated
      } else {
            // Remove the errors highlight
            return_date.closest('.form-group').removeClass('has-error').addClass('has-success');
            return_date.addClass('validated');                                                         //Flagging input text as been validated
      }
}

//Sets everything to default values on close of popup form
function transaction_form_close(){
        var bookID     = $('#transactionForm_BookId'),
            type       = $('#transactionForm_Type'),
            issue_date = $('#transactionForm_Issue_date'),
            expected_return_date = $('#transactionForm_ERD'),
            return_date = $('#transactionForm_Return_date');

        //Setting found book_record to empty
        book_record = '';

        //Enabling fields
        bookID.removeAttr("disabled");
        issue_date.removeAttr("disabled");
        expected_return_date.removeAttr("disabled");
        return_date.removeAttr("disabled");


        // Remove the errors highlight
        bookID.closest('.form-group').removeClass('has-error').removeClass('has-success');
        type.closest('.form-group').removeClass('has-error').removeClass('has-success');
        issue_date.closest('.form-group').removeClass('has-error').removeClass('has-success');
        expected_return_date.closest('.form-group').removeClass('has-error').removeClass('has-success');
        return_date.closest('.form-group').removeClass('has-error').removeClass('has-success');

        //Remove validated class
        bookID.removeClass('validated');
        type.removeClass('validated');
        issue_date.removeClass('validated');
        expected_return_date.removeClass('validated');
        $('#transactionForm_Return_date').removeClass('validated');

        //Set all values back to default
        bookID.val('');
        type.val('');
        issue_date.val('');
        expected_return_date.val('');
        return_date.val('');

        $('#transactionForm_Submit').prop('disabled', true);                            //Disable Submit button
        $('#transaction_form_erd_invalid').addClass('hidden');                          //Hiding expected return date error message
        $('#transaction_form_bookId_invalid').html('').addClass('hidden');              //Hiding bookId invalid error message
        $('#transaction_form_bookId_not_found').addClass('hidden');                     //Hiding bookId not found error message
        //return_date.addClass('hidden');
        $('#transaction_form_transac_Id_cannot_edit').addClass('hidden');
        $('#transactionForm_Return_date').removeClass('hidden');
        $('#transactionForm_BookId').closest('.form-group').addClass('hidden');
        $('#transactionForm_BookId').closest('.form-group').removeClass('hidden');
        $('#transactionForm_Issue_date').closest('.form-group').removeClass('hidden');
}

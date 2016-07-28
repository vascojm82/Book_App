var book_route = "http://localhost:8000/book";
var book_op = '';

function book_delete(){
    var on_loan = book_table.cell('.selected', 8).data();

    if ($('#btn_book_delete').hasClass("disabled")) {
          event.stopPropagation();
    } else {
            if( (bookId > 0) && (on_loan == 0) ){
                    $.confirm({
                          animation: 'rotateY',
                          closeAnimation: 'rotateYR',
                          title: 'Confirmation required',
                          content: 'Are you sure you want to delete this row?',
                          confirmButton: 'Yes',
                          cancelButton: 'No',
                          confirm: function(){
                                    $.ajax({
                                          headers: {
                                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                              },
                                          url: book_route + '/' + bookId,
                                          type: 'POST',
                                          data:{ _method: 'DELETE',
                                                 'bookId': bookId },
                                          success: function(data){
                                                book_table.rows('.selected').remove().draw();
                                                $('#btn_book_edit').addClass('disabled');
                                                $('#btn_book_delete').addClass('disabled');
                                          },
                                          error: function(){
                                            console.log('Failed to Delete!');
                                          }
                                    });
                              },
                              cancel: function(){
                                    return;
                              }
                        });
                }
                else{
                    $.alert({
                          title:'Warning',
                          content: 'Cannot delete record with loaned items.',
                          animation: 'rotate',
                          closeAnimation: 'right',
                          confirmButton: 'Close'
                    });
                }
          }
};

function book_add(){
      book_op='add';

      //Display Modal;
      $('#book_form_modal').modal("show");
      $('.book_edit').addClass('hidden');
      $('.book_edit').addClass('loan');

      var book_inputs = $('#book_form .book_input');     //Array of DOM elements with class .book_input inside of book form
      var raw = book_inputs.get(0);                      //First DOM element in the array
      var eventObject = $._data(raw, 'events');          //Object with events attached to 'raw' DOM element

      //Checking if 'raw' has any events attached to it
      if(eventObject != undefined && eventObject.change != undefined){
          console.log('Book Onblur event already present');
      }
      else{
          console.log("Binding Book Onblur");

          //Binding blur event handler to all input elements in the form
          book_inputs.blur(function() {
                if (validateInputs(book_inputs)) {
                    $('#bookForm_Submit').prop('disabled', false);      //Enable Submit button
                }
          });
      }

      //Submit operation
      $('#book_form').on('submit', function(e) {
              var save_ISBN         = $('#bookForm_ISBN').val(),
                  save_Name         = $('#bookForm_Name').val(),
                  save_Details      = $('#bookForm_Details').val(),
                  save_Category     = $('#bookForm_Category').val(),
                  save_Author       = $('#bookForm_Author').val(),
                  save_Publish_date = $('#bookForm_Publish_date').val(),
                  save_On_hand      = $('#bookForm_On_hand').val();

                  $.ajax({
                          headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                              },
                          url: book_route,
                          type: 'POST',
                          data: {
                                  'ISBN':save_ISBN,
                                  'name':save_Name,
                                  'details': save_Details,
                                  'category':save_Category,
                                  'author':save_Author,
                                  'publish_date': save_Publish_date,
                                  'on_hand': save_On_hand,
                                  'on_loan': 0
                                  },
                          success: function(data){
                                $('#btn_book_edit').addClass('disabled');
                                $('#btn_book_delete').addClass('disabled');
                                console.log('Success!');
                          },
                          error: function(){
                              console.log('Failed!');
                          }
                    });
            });
      }


function book_edit(){
    book_op='edit';

    if ($('#btn_book_edit').hasClass("disabled")) {
          event.stopPropagation();
    } else {
         var bookId = book_table.cell('.selected', 0).data(),
             ISBN = book_table.cell('.selected', 1).data(),
             name = book_table.cell('.selected', 2).data(),
             details = book_table.cell('.selected', 3).data(),
             category = book_table.cell('.selected', 4).data(),
             author = book_table.cell('.selected', 5).data(),
             publish_date = book_table.cell('.selected', 6).data(),
             on_hand = book_table.cell('.selected', 7).data(),
             on_loan = book_table.cell('.selected', 8).data();

          //Displaying Modal Form, making BookID and on_loan visible
          $('#book_form_modal').modal("show");
          $('.book_edit').removeClass('hidden');
          $('#bookForm_On_loan').removeAttr('disabled');

          //Setting all text fields in the form to selected row data
          $('#bookForm_BookID').html(bookId);
          $('#bookForm_ISBN').val(ISBN).attr('disabled', 'true');
          $('#bookForm_Name').val(name).attr('disabled', 'true');
          $('#bookForm_Details').val(details).attr('disabled', 'true');
          $('#bookForm_Category').val(category).attr('disabled', 'true');
          $('#bookForm_Author').val(author).attr('disabled', 'true');
          $('#bookForm_Publish_date').val(publish_date).attr('disabled', 'true');
          $('#bookForm_On_hand').val(on_hand);
          $('#bookForm_On_loan').val(on_loan).attr('disabled', 'true');

          var book_inputs = $('#book_form .book_input');     //Array of DOM elements with class .book_input inside of book form
          var raw = book_inputs.get(0);                      //First DOM element in the array
          var eventObject = $._data(raw, 'events');          //Object with events attached to 'raw' DOM element

          //Checking if 'raw' has any events attached to it
          if(eventObject != undefined && eventObject.change != undefined){
              console.log('Book Onblur event already present');
          }
          else{
              console.log("Binding Book Onblur");

              //Binding blur event handler to all input elements in the form
              book_inputs.blur(function() {
                    if (validateInputs(book_inputs)) {
                        $('#bookForm_Submit').prop('disabled', false);      //Enable Submit button
                    }
              });
          }

          //Submit operation
          $('#book_form').on('submit', function(e) {
            $.ajax({
                        headers: {
                              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                        url: book_route + '/' + bookId,
                        type: 'POST',
                        data: {
                                '_method': 'PUT',
                                'bookId':bookId,
                                'ISBN': $('#bookForm_ISBN').val(),
                                'name': $('#bookForm_Name').val(),
                                'details': $('#bookForm_Details').val(),
                                'category': $('#bookForm_Category').val(),
                                'author':$('#bookForm_Author').val(),
                                'publish_date': $('#bookForm_Publish_date').val(),
                                'on_hand': $('#bookForm_On_hand').val(),
                                'on_loan': $('#bookForm_On_loan').val()
                              },
                        success: function(data){
                              console.log('Success!');
                              $('#btn_book_edit').addClass('disabled');
                              $('#btn_book_delete').addClass('disabled');
                              $('#bookForm_ISBN').removeAttr('disabled');
                              $('#bookForm_Name').removeAttr('disabled');
                              $('#bookForm_Details').removeAttr('disabled');
                              $('#bookForm_Category').removeAttr('disabled');
                              $('#bookForm_Author').removeAttr('disabled');
                              $('#bookForm_Publish_date').removeAttr('disabled');
                        },
                        error: function(){
                          console.log('Failed!');
                        }
                  });
          });
    }
}

function validate_ISBN(){
      var ISBN = $('#bookForm_ISBN'),
          ISBN_regX = /^(97(8|9))?\d{9}(\d|X)$/;

      // Check if there is an entered value for ISBN and if value is correct
      if(!ISBN.val() || !ISBN_regX.test(ISBN.val())) {
            // Add errors highlight
            ISBN.closest('.form-group').removeClass('has-success').addClass('has-error');
            ISBN.removeClass('validated');
      } else {
            // Remove the errors highlight
            ISBN.closest('.form-group').removeClass('has-error').addClass('has-success');
            ISBN.addClass('validated');
      }
}

function validate_name(){
      var name = $('#bookForm_Name'),
          misc_regX = /^[a-zA-Z0-9\#\&\.\:\+\,\' ]+$/;

      // Check if there is an entered value for name and if value is correct
      if(!name.val() || !misc_regX.test(name.val())) {
            // Add errors highlight
            name.closest('.form-group').removeClass('has-success').addClass('has-error');
            name.removeClass('validated');
      } else {
            // Remove the errors highlight
            name.closest('.form-group').removeClass('has-error').addClass('has-success');
            name.addClass('validated');
      }
}

function validate_details(){
      var details = $('#bookForm_Details');

      // Check if there is an entered value for details
      if(!details.val()) {
            // Add errors highlight
            details.closest('.form-group').removeClass('has-success').addClass('has-error');
            details.removeClass('validated');
      } else {
            // Remove the errors highlight
            details.closest('.form-group').removeClass('has-error').addClass('has-success');
            details.addClass('validated');
      }
}

function validate_category(){
      var category = $('#bookForm_Category'),
          misc_regX = /^[a-zA-Z ]+$/;

      // Check if there is an entered value for category and if value is correct
      if(!category.val() || !misc_regX.test(category.val())) {
            // Add errors highlight
            category.closest('.form-group').removeClass('has-success').addClass('has-error');
            category.removeClass('validated');
      } else {
            // Remove the errors highlight
            category.closest('.form-group').removeClass('has-error').addClass('has-success');
            category.addClass('validated');
      }
}

function validate_author(){
      var author = $('#bookForm_Author'),
          misc_regX = /^[a-zA-Z\#\&\.\:\+\,\' ]+$/;

      // Check if there is an entered value for author and if value is correct
      if(!author.val() || !misc_regX.test(author.val())) {
            // Add errors highlight
            author.closest('.form-group').removeClass('has-success').addClass('has-error');
            author.removeClass('validated');
        } else {
            // Remove the errors highlight
            author.closest('.form-group').removeClass('has-error').addClass('has-success');
            author.addClass('validated');
        }
}

function validate_publish_date(){
      var publish_date = $('#bookForm_Publish_date');

      // Check if there is an entered value for publish_date
      if(!publish_date.val()) {
            // Add errors highlight
            publish_date.closest('.form-group').removeClass('has-success').addClass('has-error');
            publish_date.removeClass('validated');
      } else {
            // Remove the errors highlight
            publish_date.closest('.form-group').removeClass('has-error').addClass('has-success');
            publish_date.addClass('validated');
      }
}

function validate_on_hand(){
      var on_hand = $('#bookForm_On_hand'),
          on_loan = $('#bookForm_On_loan'),
          on_hand_invalid_input = $('#bookForm_on_hand_invalid'),
          ISBN = $('#bookForm_ISBN'),
          name = $('#bookForm_Name'),
          details = $('#bookForm_Details'),
          category = $('#bookForm_Category'),
          author = $('#bookForm_Author'),
          publish_date = $('#bookForm_Publish_date');

          on_loan.addClass('validated');

      // Check if there is an entered value for on_hand and if value is correct
      if( (on_hand.val() <= 0) || (on_hand.val() < on_loan.val()) ) {
            // Add errors highlight
            on_hand.closest('.form-group').removeClass('has-success').addClass('has-error');
            on_hand.removeClass('validated');

            if(book_op === 'edit')
            {
                on_hand_invalid_input.removeClass('hidden');
                ISBN.closest('.form-group').removeClass('has-success');
                ISBN.removeClass('validated');
                name.closest('.form-group').removeClass('has-success');
                name.removeClass('validated');
                details.closest('.form-group').removeClass('has-success');
                details.removeClass('validated');
                category.closest('.form-group').removeClass('has-success');
                category.removeClass('validated');
                author.closest('.form-group').removeClass('has-success');
                author.removeClass('validated');
                publish_date.closest('.form-group').removeClass('has-success');
                publish_date.removeClass('validated');
                on_loan.closest('.form-group').removeClass('has-success');
                on_loan.removeClass('validated');
            }

      } else if( (on_hand > 0) || (on_hand >= on_loan) ) {
            // Remove the errors highlight
            on_hand.closest('.form-group').removeClass('has-error').addClass('has-success');
            on_hand.addClass('validated');
            on_hand_invalid_input.addClass('hidden');

            if(book_op === 'edit'){
                  //Validating all other entries
                  validate_ISBN();
                  validate_name();
                  validate_details();
                  validate_category();
                  validate_author();
                  validate_publish_date();
                  validate_on_loan();
             }
      }
      else {
            return;
      }
}

function validate_on_loan(){
        var on_loan = $('#bookForm_On_loan'),
            on_loan_regX = /^[0-9]\d*$/;

        if($('.loan').hasClass('hidden')){
              return;
        }

        // Check if there is an entered value for on_loan and if value is correct
        if(!on_loan_regX.test(on_loan.val()) ) {
              // Add errors highlight
              on_loan.closest('.form-group').removeClass('has-success').addClass('has-error');
              on_loan.removeClass('validated');
        } else {
              // Remove the errors highlight
              on_loan.closest('.form-group').removeClass('has-error').addClass('has-success');
              on_loan.addClass('validated');
        }
}

//Checks for all form inputs to be filled and valid
function validateInputs(inputs) {
      var validForm = true;

      inputs.each(function(index) {
          var input = $(this);
          if(!input.hasClass('validated')){
              if(input.hasClass('book_input'))
                  $("#bookForm_Submit").prop('disabled', true);
              else
                  $("#transactionForm_Submit").prop('disabled', true);

              validForm = false;
          }
      });
      return validForm;
}

//Sets everything to default values on close
function book_form_close(){
    var ISBN = $('#bookForm_ISBN'),
        name = $('#bookForm_Name'),
        details = $('#bookForm_Details'),
        category = $('#bookForm_Category'),
        author = $('#bookForm_Author'),
        publish_date = $('#bookForm_Publish_date'),
        on_hand = $('#bookForm_On_hand'),
        on_loan = $('#bookForm_On_loan'),
        on_hand_invalid_input = $('#bookForm_on_hand_invalid');

        // Remove the errors highlight
        ISBN.closest('.form-group').removeClass('has-error').removeClass('has-success');
        name.closest('.form-group').removeClass('has-error').removeClass('has-success');
        details.closest('.form-group').removeClass('has-error').removeClass('has-success');
        category.closest('.form-group').removeClass('has-error').removeClass('has-success');
        author.closest('.form-group').removeClass('has-error').removeClass('has-success');
        publish_date.closest('.form-group').removeClass('has-error').removeClass('has-success');
        on_hand.closest('.form-group').removeClass('has-error').removeClass('has-success');
        on_loan.closest('.form-group').removeClass('has-error').removeClass('has-success');

        //Remove validated class
        ISBN.removeClass('validated');
        name.removeClass('validated');
        details.removeClass('validated');
        category.removeClass('validated');
        author.removeClass('validated');
        publish_date.removeClass('validated');
        on_hand.removeClass('validated');
        on_loan.removeClass('validated');

        //Remove disabled
        $('#bookForm_ISBN').removeAttr('disabled');
        $('#bookForm_Name').removeAttr('disabled');
        $('#bookForm_Details').removeAttr('disabled');
        $('#bookForm_Category').removeAttr('disabled');
        $('#bookForm_Author').removeAttr('disabled');
        $('#bookForm_Publish_date').removeAttr('disabled');

        on_hand_invalid_input.addClass('hidden');

        //Set all values back to default
        ISBN.val('');
        name.val('');
        details.val('');
        category.val('');
        author.val('');
        publish_date.val('');
        on_hand.val('');
        on_loan.val('');

        $('#bookForm_Submit').prop('disabled', true);   //Disable Submit button
}

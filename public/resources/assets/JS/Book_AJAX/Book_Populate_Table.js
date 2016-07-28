var book_table = $('#booksTable').DataTable({
              "order": [[ 0, "desc" ]],
              "responsive": true,
              "pageLength": 5,
              "bLengthChange": false,
              "bFilter":false,
              "processing": true,
              "serverSide": false,
              "fnDrawCallback": function() {      //Selects pagination buttons under table
                          $('a:not([aria-controls="transactionsTable"])').on( 'click', function(){
                                       $("#booksTable .selected").removeClass('selected');
                          });
               },
              "ajax": "http://localhost:8000/book",   //'{!! route('book.index') !!}',
              "columns": [
                  {data: 'bookId'},
                  {data: 'ISBN'},
                  {data: 'name'},
                  {data: 'details'},
                  {data: 'category'},
                  {data: 'author'},
                  {data: 'publish_date'},
                  {data: 'on_hand'},
                  {data: 'on_loan'}
              ]
          });

  //Adding onClick event to select and deselect a row in the book table, saving the row index
  $("#booksTable tbody").on( 'click', 'tr', function () {
          if(!($(this).hasClass('selected'))){
                $(this).addClass('selected').siblings().removeClass('selected');
                book_row_index = $(this).closest('tr').index();
                bookId = book_table.cell('.selected', 0).data();
                $('#btn_book_edit').removeClass('disabled');
                $('#btn_book_delete').removeClass('disabled');
                console.log(book_row_index);
                console.log(bookId);
          }
          else {
                $(this).removeClass('selected');
                book_row_index = '';
                bookId = '';
                $('#btn_book_edit').addClass('disabled');
                $('#btn_book_delete').addClass('disabled');
          }
   });

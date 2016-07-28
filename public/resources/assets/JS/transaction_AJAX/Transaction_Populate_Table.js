var transaction_table = $('#transactionsTable').DataTable({
                "order": [[ 0, "desc" ]],
                "responsive": true,
                "pageLength": 5,
                "bLengthChange": false,
                "bFilter":false,
                "processing": true,
                "serverSide": false,
                "fnDrawCallback": function() {      //Selects pagination buttons under table
                            $('a:not([aria-controls="booksTable"])').on( 'click', function(){
                                         $("#transactionsTable .selected").removeClass('selected');
                            });
                 },
                "ajax": "http://localhost:8000/transaction",   //'{!! route('transaction.index') !!}',
                "columns": [
                    {data: 'transactionId'},
                    {data: 'bookId'},
                    {data: 'transaction_type'},
                    {data: 'transaction_date'},
                    {data: 'issue_date'},
                    {data: 'expected_return_date'},
                    {data: 'return_date'}
                ]
});

//Adding onClick event to select and deselect a row in the transaction table, saving the row index
$("#transactionsTable tbody").on( 'click', 'tr', function () {
        if(!($(this).hasClass('selected'))){
              $(this).addClass('selected').siblings().removeClass('selected');
              transaction_row_index = $(this).closest('tr').index();
              $('#btn_transaction_edit').removeClass('disabled');
              console.log(transaction_row_index);
        }
        else {
              $(this).removeClass('selected');
              transaction_row_index = '';
              $('#btn_transaction_edit').addClass('disabled');
            }
 });

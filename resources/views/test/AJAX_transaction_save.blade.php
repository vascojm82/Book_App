<html>
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>AJAX Test</title>
        <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
        <script type="text/javascript">
            function test()
            {
                var test = "http://localhost:8000/transaction";
                var today = new Date().toJSON().slice(0,10);
                var expectedReturnDate = new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 15)).toJSON().slice(0,10);

                $.ajax({
                      headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                          },
                      url: test,
                      type: 'POST',
                      data: {
                              'bookId':'1',
                              'transaction_type':'issue',
                              'transaction_date': today,
                              'issue_date': today,
                              'expected_return_date': expectedReturnDate
                              },
                      success: function(data){
                            console.log(data);
                            $('span').html("Success");
                      },
                      error: function(){
                        console.log('Failed!');
                      }
                });
            }
        </script>
    </head>
    <body onload="test()">
        <p>Result: <span></span></p>
    </body>

</html>

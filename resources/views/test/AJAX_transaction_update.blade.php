<html>
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>AJAX Test</title>
        <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
        <script type="text/javascript">
            function test()
            {
                var test = "http://localhost:8000/transaction";
                var transactionId = 2;

                $.ajax({
                      headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                          },
                      url: test + '/' + transactionId,
                      type: 'POST',
                      data: {
                              '_method': 'PUT',
                              'transactionId':transactionId,
                              'transaction_type':'return',
                              'return_date':'2016-07-17'
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

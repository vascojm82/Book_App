<!DOCTYPE html>
<html>
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>AJAX Test</title>
        <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
        <script type="text/javascript">
            function test()
            {
                var test = "http://localhost:8000/book";

                $.ajax({
                      headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                          },
                      url: test,
                      type: 'POST',
                      data: {
                              'ISBN':'564634538',
                              'name':'rtdfgdfgtion',
                              'details': 'dfgdfgdfgerence',
                              'category':'IT',
                              'author':'Memo Sauceda',
                              'publish_date': '2014-04-01',
                              'on_hand': 5,
                              'on_loan': 0
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

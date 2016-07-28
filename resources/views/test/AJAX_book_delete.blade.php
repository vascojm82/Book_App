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
                var bookId = 29;

                $.ajax({
                      headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                          },
                      url: test + '/' + bookId,
                      type: 'POST',
                      data:{ _method: 'DELETE',
                             'bookId': bookId },
                      success: function(data){
                            console.log(data);
                            $('span').html("Deleted");
                      },
                      error: function(){
                        console.log('Failed to Delete!');
                      }
                });
            }
        </script>
    </head>
    <body onload="test()">
        <p>Result: <span></span></p>
    </body>

</html>

<html>
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>AJAX Test</title>
        <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
        <script type="text/javascript">
            function test()
            {
                var test = "http://localhost:8000/book";
                var bookId = 43;

                $.ajax({
                      headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                          },
                      url: test + '/' + bookId,
                      type: 'POST',
                      data: {
                              '_method': 'PUT',
                              'bookId':bookId,
                              'ISBN':'1890774960',
                              'name':'Murachs SQL Server 2016 for Developers	',
                              'details': 'Learn SQL Server 2016',
                              'category':'IT',
                              'author':'Joel Murach',
                              'publish_date': '2016-06-30',
                              'on_hand': 5,
                              'on_loan': 2
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

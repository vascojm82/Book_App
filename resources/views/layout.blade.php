<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="resources/assets/JS/jquery.min.js"></script>
        <script src="resources/assets/JS/jquery-confirm.min.js"></script>
        <link rel="stylesheet" href="resources/assets/JS/jquery-confirm.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.6/dt-1.10.12/b-1.2.1/b-colvis-1.2.1/cr-1.3.2/fh-3.1.2/r-2.1.0/se-1.2.0/datatables.css"/>
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.6/dt-1.10.12/b-1.2.1/b-colvis-1.2.1/cr-1.3.2/fh-3.1.2/r-2.1.0/se-1.2.0/datatables.js"></script>
        <link rel="stylesheet" href="resources/assets/CSS/main.css" />
        <title>Book App</title>
    </head>
    <body>
        <div class="container-fluid">
              <div class="applicationheader">
                  <div>
                      <h1 class="title">Book Transactions</h1>
                  </div>
              </div>
              <div>
                  <div class="col-md-5" id="books">
                        <h3 class="table_title">Books</h3>
                  </div>

                  <div class="col-md-1" id="triangle-right"></div>

                  <div class="col-md-6" id="transactions">
                        <h3 class="table_title">Transactions</h3>
                  </div>
              </div>
              <div>

                      @yield('tables')

              </div>
        </div>
        <div class="panel-footer text-center"><h5>For Demo Purposes Only</h5></div>
    </body>
</html>

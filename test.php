<?php
      public function testApp()
      {
          echo '<h2>Testing Post</h2>';

          $response = $this->call('POST','/',['ISBN'=>'9781890774912', 'name'=>'Murachs JQuery 2nd Edition', 'details'=> 'Good Hands on introduction to JQuery', 'category'=>'IT', 'author'=>'Zak Rubalcaba', 'publish_date'=> '2015-09-01', 'on_hand'=> 4, 'on_loan'=> 0]);
          $this->assertEquals(200, $response->status());

          echo $response->status();
      }

      testApp();
 ?>

<?php

  #remove before deployment####################################
  header('Access-Control-Allow-Origin: *');                   #
  header('Access-Control-Allow-Methods: GET, POST');          #
  header("Access-Control-Allow-Headers: X-Requested-With");   #
  #############################################################

  $phpj = require(__DIR__.'/phpj/phpj.php');
  $request = $phpj('services')('request')();
  echo $phpj('services')('router')($request, $phpj);

?>
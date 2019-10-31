<?php
  require_once(__DIR__.'/crudDB_PDO.class.php');
  $CONFIG = require_once(__DIR__.'/../../phpj.config.php');
  return new CrudDB_PDO(
    $CONFIG['SERVER_NAME'],
    $CONFIG['DB_USERNAME'],
    $CONFIG['DB_PASSWORD'],
    $CONFIG['DB_NAME']
  );
?>
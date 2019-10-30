 <?php

  return function($input, $schema) {
    require_once(__DIR__.'/validator.class.php');
    $validator = new Validator($input, $schema);
    return $validator->validate();
  }
?>
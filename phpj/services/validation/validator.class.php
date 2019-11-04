<?php
  class Validator {

    function __construct() { }

    private function validateLeafNode($input, $schema, $path) {
      $regexes = [
        'email' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
        'alpha' => '/^[a-zA-Z]*$/',
        'numeric' => '/^[0-9]*$/',
        'alphaNumeric' => '/^[a-zA-Z0-9]*$/',
        'alphaNumericSpaces' => '/^[a-zA-Z0-9 ]*$/',
        'commonWriting' => '/^[A-Za-z0-9 -_.,?!"()\'\/$&]*$/',
        'password' => '/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/'
      ];
      $errors = [];
      if (isset($schema['min-length'])) {
        if (strlen($input) < $schema['min-length']) {
          array_push($errors, $path.' Must be at least '.$schema['min-length']." characters long.");
        }
      }
      if (isset($schema['max-length'])) {
        if (strlen($input) > $schema['max-length']) {
          array_push($errors, $path.' Cannot exceed '.$schema['max-length']." characters long.");
        }
      }
      if (isset($schema['isEmail'])) {
        if (!preg_match($regexes['email'], $input)) {
          array_push($errors, $path.' must be a valid email.');
        }
      }
      if (isset($schema['isAlpha'])) {
        if (!preg_match($regexes['alpha'], $input)) {
          array_push($errors, $path.' can only contain alphabetical characters.');
        }
      }
      if (isset($schema['isNumeric'])) {
        if (!preg_match($regexes['numeric'], $input)) {
          array_push($errors, $path.' can only contain numerical characters.');
        }
      }
      if (isset($schema['isAlphaNumeric'])) {
        if (!preg_match($regexes['alphaNumeric'], $input)) {
          array_push($errors, $path.' can only contain alphanumeric characters.');
        }
      }
      if (isset($schema['isAlphaNumericSpaces'])) {
        if (!preg_match($regexes['alphaNumericSpaces'], $input)) {
          array_push($errors, $path.' can only contain alphanumeric characters and spaces.');
        }
      }
      if (isset($schema['isCommonWriting'])) {
        if (!preg_match($regexes['commonWriting'], $input)) {
          array_push($errors, $path.' can only contain common writing characters and punctuation.');
        }
      }
      if (isset($schema['isPassword'])) {
        if (!preg_match($regexes['password'], $input)) {
          array_push($errors, $path.'. Password must contain at least one number, and one uppercase, lowercase, and special character.');
        }
      }
      if (isset($schema['regex'])) {
        if (!preg_match($schema['regex'], $input)) {
          array_push($errors, $path.' did not match format.');
        }
      }
      if (isset($schema['min'])) {
        if ($input < $schema['min']) {
          array_push($errors, $path.' must be at least '.$schema['min'].".");
        }
      }
      if (isset($schema['max'])) {
        if ($input > $schema['max']) {
          array_push($errors, $path.' cannot exceed '.$schema['max'].".");
        }
      }
      return $errors;
    }

    private function validateTree($input, $schema, $path) {
      $errors = [];
      foreach($schema as $key => $value) {
        if (isset($input[$key])) {
          if (gettype($schema[$key]['type']) === 'array') {
            if (gettype($input[$key]) === 'array' && !$this->isAssoc($input[$key])) {
              foreach($input[$key] as $i => $item) {
                $errors = array_merge($errors, $this->validateTree($item, $schema[$key]['type'], $path.$key.'['.$i.']->'));
              }
            } else {
              $errors = array_merge($errors, $this->validateTree($input[$key], $schema[$key]['type'], $path.$key.'->'));
            }
          } else {
          
            if ($schema[$key]['type'] === gettype($input[$key])) {
              if (in_array($schema[$key]['type'], ['boolean', 'integer', 'double', 'string'])) {
                $errors = array_merge($errors, $this->validateLeafNode($input[$key], $schema[$key], $path.$key ));
              } else {
                array_push($errors, 'Unsupported type at '.$path.$key);
              }
            } else {
              if (gettype($input[$key]) === 'array') {
                foreach($input[$key] as $i => $item) {
                  $errors = array_merge($errors, $this->validateLeafNode($item, $schema[$key], $path.$key.'['.$i.']'));
                }
              } else {
                array_push($errors, 'Type missmatch at '.$path.$key);
              }
            }
          
          }
        } else {
          if (isset($schema[$key]['required']) && $schema[$key]['required']) {
            array_push($errors, 'Required paramater missing at '.$path.$key);
          }
        }
      }
      return $errors;
    }
    
    private function isAssoc(array $arr) {
      if (array() === $arr) return false;
      return array_keys($arr) !== range(0, count($arr) - 1);
    }

    public function validate($data, $schema) {
      if (isset($data) && isset($schema)) {
        return $this->validateLeafNode($data, $schema, 'root->');
      } else {
        return ['validator not properly initialized'];
      }
    }

  }
?>
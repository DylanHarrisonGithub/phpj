<?php
  return function() {
    
    // route
    $route = ltrim(rtrim(strtok(str_replace('/', '-', substr($_SERVER['REQUEST_URI'], strpos($_SERVER['REQUEST_URI'], '.php/') + 5)), '?'), '-'), '-');
    
    // token
    $token = null;
    if (isset($_COOKIE['myPhpjApp'])) {
      $cookie = json_decode($_COOKIE['myPhpjApp'], true);
      if (isset($cookie['token'])) {
        $token = $cookie['token'];
      }
    } 
    if (!isset($token)) {
      $headers = getallheaders();
      if (isset($headers['token'])) $token = $headers['token'];
      if (!isset($token) && isset($headers['TOKEN'])) $token = $headers['TOKEN'];
      if (!isset($token) && isset($headers['auth'])) $token = $headers['auth'];
      if (!isset($token) && isset($headers['AUTH'])) $token = $headers['AUTH'];
      if (!isset($token) && isset($headers['authorization'])) $token = $headers['authorization'];
      if (!isset($token) && isset($headers['AUTHORIZATION'])) $token = $headers['AUTHORIZATION'];
      if (!isset($token) && isset($headers['authentication'])) $token = $headers['authentication'];
      if (!isset($token) && isset($headers['AUTHENTICATION'])) $token = $headers['AUTHENTICATION'];
      if (!isset($token) && isset($headers['bearer'])) $token = $headers['bearer'];
      if (!isset($token) && isset($headers['BEARER'])) $token = $headers['BEARER'];
    }

    // params
    $params = [];
    if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
      $params = $_GET;
    } else {
      if(!empty($_POST)) {
        // when using application/x-www-form-urlencoded or multipart/form-data as the HTTP Content-Type in the request
        // NOTE: if this is the case and $_POST is empty, check the variables_order in php.ini! - it must contain the letter P
        $params = $_POST;
      } else {
        // when using application/json as the HTTP Content-Type in the request 
        $temp_params = json_decode(file_get_contents('php://input'), true);
        if(json_last_error() == JSON_ERROR_NONE) {
          $params = $temp_params;
        }
      }
    }

    // files
    $files = null;
    if (!empty($_FILES)) $params['files'] = $_FILES;

    return [
      'method' => $_SERVER['REQUEST_METHOD'],
      'route' => $route,
      'params' => $params,
      'token' => $token
    ];
    
  }
?>
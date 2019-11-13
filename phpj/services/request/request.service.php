<?php
  return function() {
    $body = [];
    if(!empty($_POST))
    {
        // when using application/x-www-form-urlencoded or multipart/form-data as the HTTP Content-Type in the request
        // NOTE: if this is the case and $_POST is empty, check the variables_order in php.ini! - it must contain the letter P
        $body = $_POST;
    } else {
      // when using application/json as the HTTP Content-Type in the request 
      $post = json_decode(file_get_contents('php://input'), true);
      if(json_last_error() == JSON_ERROR_NONE)
      {
          $body = $post;
      }
    }

    $route = null;
    $params = [];
    $token = null;
    $files = null;
    if (isset($body['route'])) $route = $body['route'];
    if (isset($body['params'])) $params = $body['params'];
    if (isset($body['token'])) $token = $body['token'];
    if (!empty($_FILES)) $files = $_FILES;
    if (!$route) { // get requests
      echo json_encode([
        'fullURI' => $_SERVER['REQUEST_URI'],
        'basename' => basename($_SERVER['REQUEST_URI']),
        'headers' => getallheaders()
      ]);
    } 
    return [
      'route' => $route,
      'params' => array_merge(array_merge($params, getallheaders()), ['getshit' => basename($_SERVER['REQUEST_URI'])]),
      'token' => $token,
      'files' => $files
    ];
  }
?>
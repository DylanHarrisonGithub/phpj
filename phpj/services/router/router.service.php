<?php
  return function($request, $phpj) {
    if (isset($request['route'])) {
      if (isset($phpj['routes'][$request['route']])) {

        // validation layer
        $validationErrors = $phpj['services']['validation'](
          $request['params'],
          $phpj['routes'][$request['route']]['schema']
        );
        
        if (count($validationErrors) == 0) {

          // authentication layer
          if (in_array('guest', $phpj['routes'][$request['route']]['privelege'])) {
            return $phpj['routes'][$request['route']]['route']($request['params'], $phpj);
          } else {
            if (!is_null($request['token'])) {
              if ($phpj['services']['authentication']['verifyToken'](
                $request['token'], 
                $phpj['config']['SERVER_SECRET']
              )) {
                if (in_array($request['token']['privelege'], $phpj['routes'][$request['route']]['privelege'])) {
                  return $phpj['routes'][$request['route']]['route']($request['params'], $phpj);
                } else {
                  http_response_code(403); // Forbidden
                  header('Content-Type: application/json');
                  return json_encode([
                    'success' => false,
                    'message' => 'Provided authentication does not have privelege to access route.'
                  ]);
                }
              } else {
                http_response_code(401); // Unauthorized
                header('Content-Type: application/json');
                return json_encode([
                  'success' => false,
                  'message' => 'Provided authentication was not valid.'
                ]);
              }
            } else {
              http_response_code(401); // Unauthorized
              header('Content-Type: application/json');
              return json_encode([
                'success' => false,
                'message' => 'Authentication was not provided for protected route.'
              ]);
            }
          }
        } else {
          http_response_code(400); // Bad Request
          header('Content-Type: application/json');
          return json_encode([
            'success' => false,
            'message' => 'Validation failed for route parameters.',
            'route' => $validationErrors
          ]);
        }
      } else {
        http_response_code(404); // Not Found
        header('Content-Type: application/json');
        return json_encode([
          'success' => false,
          'message' => 'Provided route does not exist.',
          'route' => $request['route']
        ]);
      }
    } else {
      http_response_code(400); // Bad Request
      header('Content-Type: application/json');
      return json_encode([
        'success' => false,
        'message' => 'Route was not provided.'
      ]);
    }
  }
?>
<?php
  return function($request, $phpj) {
    if (isset($request['route'])) {
      try {
        $route = $phpj('routes')($request['route']);
      } catch (Exception $e) {
        http_response_code(404); // Not Found
        header('Content-Type: application/json');
        return json_encode([
          'success' => false,
          'message' => 'Provided route does not exist.',
          'route' => $request['route']
        ]);
      }
      if (in_array(strtoupper($request['method']), $route('method'))) {
        if (!in_array('guest', $route('privelege'))) {
          if (!is_null($request['token'])) { 
            if ($phpj('services')('authentication')['verifyToken'](
              $request['token'], 
              $phpj('config')['SERVER_SECRET']
            )) {
              if (isset($request['token']['privelege']) && in_array($request['token']['privelege'], $route('privelege'))) {

                $validationErrors = $phpj('services')('validation')(
                  $request['params'],
                  $route('schema')
                );

                if (count($validationErrors) == 0) {

                  return $route('route')($request, $phpj);

                } else {
                  http_response_code(400); // Bad Request
                  header('Content-Type: application/json');
                  return json_encode([
                    'success' => false,
                    'message' => 'Validation failed for route parameters.',
                    'Errors' => $validationErrors
                  ]);
                }

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
        } else {

          $validationErrors = $phpj('services')('validation')(
            $request['params'],
            $route('schema')
          );

          if (count($validationErrors) == 0) {
            return $route('route')($request, $phpj);
          } else {
            http_response_code(400); // Bad Request
            header('Content-Type: application/json');
            return json_encode([
              'success' => false,
              'message' => 'Validation failed for route parameters.',
              'Errors' => $validationErrors
            ]);
          }

        }
      } else {
        http_response_code(405); // Not Allowed
        header('Content-Type: application/json');
        return json_encode([
          'success' => false,
          'message' => 'Method not allowed.',
          'allowed' => $phpj['routes'][$request['route']]['method']
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
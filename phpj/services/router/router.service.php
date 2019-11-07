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
                  return [
                    'success' => false,
                    'message' => 'Provided authentication does not have privelege to access route.'
                  ];
                }
              } else {
                return [
                  'success' => false,
                  'message' => 'Provided authentication was not valid.'
                ];
              }
            } else {
              return [
                'success' => false,
                'message' => 'Authentication was not provided for protected route.'
              ];
            }
          }
        } else {
          return [
            'success' => false,
            'message' => 'Validation failed for route parameters.',
            'route' => $validationErrors
          ];
        }
      } else {
        return [
          'success' => false,
          'message' => 'Provided route does not exist.',
          'route' => $request['route']
        ];
      }
    } else {
      return [
        'success' => false,
        'message' => 'Route was not provided.'
      ];
    }
  }
?>
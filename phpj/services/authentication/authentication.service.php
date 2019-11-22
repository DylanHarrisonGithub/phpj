<?php

  return [
    'generateToken' => function($user, $SERVER_SECRET) {
      
      $token = [];
      foreach ($user as $key => $value) {
        if ($key !== 'signature') {
          $token[$key] = $value;
        }
      }
      if (!isset($token['timestamp'])) $token['timestamp'] = time();
      if (!isset($token['privelege'])) $token['privelege'] = 'guest';
      
      // tokens are unique up to permutation
      ksort($token);
      
      $payload = '';
      foreach ($token as $value) {
        $payload .= $value;
      }
      $token['signature'] = password_hash($payload.$SERVER_SECRET, PASSWORD_DEFAULT);

      return $token;

    },
    'verifyToken' => function($token, $SERVER_SECRET) {

      if (isset($token['signature'])) {

        ksort($token);
        $payload = '';
        
        foreach ($token as $key => $value) {
          if ($key !== 'signature') {
            $payload .= $value;
          }
        }
        
        if (password_verify($payload.$SERVER_SECRET, $token['signature'])) {
          return true;
        }

      }
      
      return false;

    }
  ];
  
?>
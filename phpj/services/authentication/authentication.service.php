<?php

  return [
    'generateToken' => function($user, $SERVER_SECRET) {
      if (
        isset($user['id']) &&
        isset($user['username']) &&
        isset($user['email'])
      ) {
        $now = time();
        $privelege = isset($user['privelege']) ? $user['privelege'] : 'guest';
        return [
          'id' => $user['id'],
          'username' => $user['username'],
          'email' => $user['email'],
          'privelege' => $privelege,
          'timestamp' => $now,
          'signature' => password_hash(
            $user['id']
            .$user['username']
            .$user['email']
            .$privelege
            .$now
            .$SERVER_SECRET,
            PASSWORD_DEFAULT
          )
        ];
      } 
      return null;
    },
    'verifyToken' => function($token, $SERVER_SECRET) {
      if (
        isset($token['id']) &&
        isset($token['username']) &&
        isset($token['email']) &&
        isset($token['privelege']) &&
        isset($token['timestamp']) &&
        isset($token['signature'])
      ) {
        if (password_verify(
          $token['id'].$token['username'].$token['email'].$token['privelege'].$token['timestamp'].$SERVER_SECRET,
          $token['signature']
        )) {
          return true;
        }
      }
      return false;
    }
  ];
  
?>

<?php

// Automatically generated template

	return function($params, $phpj) {

		http_response_code(200);
		header('Content-Type: application/json');
		return json_encode([
			'success' => true,
			'message' => 'Login was successful',
			'token' => $phpj['services']['authentication']['generateToken'](
				[
					'id' => 'abcdefg1',
					'username' => $params['username'],
					'email' => 'someemail@gmail.com',
					'privelege' => 'admin'
				],
				$phpj['config']['SERVER_SECRET']
			),
			'cookie' => $_COOKIE
		]);

	}

?>


<?php

// Automatically generated template

	return function($params, $phpj) {

		http_response_code(200);
		header('Content-type: application/json');
		return json_encode([
			'success' => true,
			'message' => 'User registered successfully',
			'token' => $phpj['services']['authentication']['generateToken']([
					'email' => $params['params']['email'],
					'privelege' => 'user'
				],
				$phpj['config']['SERVER_SECRET']
			)
		]);

	}

?>

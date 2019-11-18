<?php
	return function($params, $phpj) {
		$token = $phpj['services']['authentication']['generateToken'](
			array_merge(['id' => 0], $params),
			$phpj['config']['SERVER_SECRET']
		);
		if ($token) {
			return json_encode([
				'success' => true,
				'message' => 'New user registered successfully.',
				'token' => $token
			]);
		} else {
			return json_encode([
				'success' => false,
				'message' => 'Could not register because the server failed to authenticate the user.'
			]);
		}
	}
?>

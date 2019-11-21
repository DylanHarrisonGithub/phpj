
<?php

// Automatically generated template

	return function($params, $phpj) {

		http_response_code(200);
		header('Content-Type: application/json');
		return json_encode([
			'cookie' => json_decode($_COOKIE['myPhpjApp'])
		]);

	}

?>

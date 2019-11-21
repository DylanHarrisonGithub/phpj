
<?php

// Automatically generated template

	return function($params, $phpj) {

		http_response_code(200);
		header('Content-Type: application/json');
		return json_encode([
			'success' => move_uploaded_file(
				$params['files']['file']['tmp_name'],
				$phpj['config']['ROOT_DIR'].'/uploads/'.$params['files']['file']['name']
			),
			'fileneame' => $params['files']['file']['name']
		]);
	}

?>

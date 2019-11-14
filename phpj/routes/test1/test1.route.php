<?php
	return function($params, $phpj) {
		return json_encode([
			'success' => true,
			'message' => 'the route works.',
			'params' => $params
		]);
	}
?>

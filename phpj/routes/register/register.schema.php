<?php
	return [
		'username' => [
			'required' => true,
			'type' => 'string',
			'min-length' => 5,
			'max-length' => 30
		],
		'email' => [
			'required' => true,
			'type' => 'string',
			'min-length' => 5,
			'max-length' => 30
		],
		'password' => [
			'required' => true,
			'type' => 'string',
			'min-length' => 5,
			'max-length' => 30
		],
	];
?>

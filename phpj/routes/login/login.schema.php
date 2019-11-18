<?php
	return [
		'username' => [
			'required' => true,
			'type' => 'string',
			'max-length' => 30,
			'min-length' => 4,
			'isAlphaNumeric' => true
		],
		'password' => [
			'required' => true,
			'type' => 'string',
			'max-length' => 30,
			'min-length' => 8,
			'isPassword' => true
		]
	];
?>

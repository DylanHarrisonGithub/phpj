<?php
  return [
    'upload' => [
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/upload/upload.schema.php'),
			'route' => require(__DIR__.'/upload/upload.route.php')
		],
    'register' => [
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/register/register.schema.php'),
			'route' => require(__DIR__.'/register/register.route.php')
		],
    'login' => [
			'privelege' => ["guest","user","admin"],
			'schema' => require(__DIR__.'/login/login.schema.php'),
			'route' => require(__DIR__.'/login/login.route.php')
		],
    'test1' => [
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/test1/test1.schema.php'),
			'route' => require(__DIR__.'/test1/test1.route.php')
		],
  ];
?>
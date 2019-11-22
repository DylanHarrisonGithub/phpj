<?php
  return [
    'user-register' => [
			'method' => ["POST"],
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/user-register/user-register.schema.php'),
			'route' => require(__DIR__.'/user-register/user-register.route.php')
		],
    'register' => [
			'method' => ['GET'],
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/register/register.schema.php'),
			'route' => require(__DIR__.'/register/register.route.php')
		],
    'login' => [
			'method' => ['GET'],
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/login/login.schema.php'),
			'route' => require(__DIR__.'/login/login.route.php')
		],
    'home' => [
			'method' => ['GET'],
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/home/home.schema.php'),
			'route' => require(__DIR__.'/home/home.route.php')
		],
  ];
?>
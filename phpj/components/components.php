<?php
  return [
    'login' => [
			'template' => require(__DIR__.'/login/login.template.php'),
			'schema' => require(__DIR__.'/login/login.schema.php')
		],
    'register' => [
			'template' => require(__DIR__.'/register/register.template.php'),
			'schema' => require(__DIR__.'/register/register.schema.php')
		],
    'home' => [
			'template' => require(__DIR__.'/home/home.template.php'),
			'schema' => require(__DIR__.'/home/home.schema.php')
		],
    'navbar' => [
			'template' => require(__DIR__.'/navbar/navbar.template.php'),
			'schema' => require(__DIR__.'/navbar/navbar.schema.php')
		],
    'app-main' => [
			'template' => require(__DIR__.'/app-main/app-main.template.php'),
			'schema' => require(__DIR__.'/app-main/app-main.schema.php')
		],
    'phpjdemo' => [
      'template' => require(__DIR__.'/phpjdemo/phpjdemo.template.php'),
      'schema' => require(__DIR__.'/phpjdemo/phpjdemo.schema.php')
    ]
  ];
?>

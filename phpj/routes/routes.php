<?php
  return [
    'test1' => [
			'privelege' => ['guest'],
			'schema' => require(__DIR__.'/test1/test1.schema.php'),
			'route' => require(__DIR__.'/test1/test1.route.php')
		],
  ];
?>
<?php
	return function($route) {
    switch($route) {
			case 'test': return function($part) {
        switch($part) {
					case 'method': return ["PUT"]; break;
					case 'privelege': return ['guest']; break;
					case 'schema': return require(__DIR__.'/test/test.schema.php'); break;
					case 'route': return require(__DIR__.'/test/test.route.php'); break;
					default: throw new Exception("PHPJ route '{$route}', part '{$part}' not supported."); break;
				}
			}; break;
			case 'home': return function($part) {
				switch($part) {
					case 'method': return ['GET']; break;
					case 'privelege': return ['guest']; break;
					case 'schema': return require(__DIR__.'/home/home.schema.php'); break;
					case 'route': return require(__DIR__.'/home/home.route.php'); break;
					default: throw new Exception("PHPJ route '{$route}', part '{$part}' not supported."); break;
				}
			}; break;
      default: throw new Exception("PHPJ route '{$route}' not supported."); break;
    }
  };
?>
<?php
  return function($service) {
    switch($service) {
			case 'directory': return require(__DIR__.'/directory/directory.service.php'); break;
			case 'file': return require(__DIR__.'/file/file.service.php'); break;
			case 'request': return require(__DIR__.'/request/request.service.php'); break;
			case 'router': return require(__DIR__.'/router/router.service.php'); break;
			case 'crudDB': return require(__DIR__.'/crudDB/crudDB.service.php'); break;
			case 'authentication': return require(__DIR__.'/authentication/authentication.service.php'); break;
			case 'validation': return require(__DIR__.'/validation/validation.service.php'); break;
			case 'directory': return require(__DIR__.'/directory/directory.service.php'); break;
      default: throw new Exception("PHPJ service '{$service}' not supported."); break;
    }
  };
?>
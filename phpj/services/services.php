<?php
  return [
    'directory' => require(__DIR__.'/directory/directory.service.php'),
    'file' => require(__DIR__.'/file/file.service.php'),
    'request' => require(__DIR__.'/request/request.service.php'),
    'router' => require(__DIR__.'/router/router.service.php'),
    'crudDB' => require(__DIR__.'/crudDB/crudDB.service.php'),
    'authentication' => require(__DIR__.'/authentication/authentication.service.php'),
    'validation' => require(__DIR__.'/validation/validation.service.php'),
    'render' => require(__DIR__.'/render/render.service.php')
  ];
?>
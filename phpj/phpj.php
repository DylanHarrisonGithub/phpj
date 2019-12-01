<?php
  return function($module) {
    switch($module) {
      case 'components': return require(__DIR__.'/components/components.php'); break;
      case 'routes': return require(__DIR__.'/routes/routes.php'); break;
      case 'services': return require(__DIR__.'/services/services.php'); break;
      case 'config': return require(__DIR__.'/phpj.config.php'); break;
      default: throw new Exception("PHPJ module '{$module}' not supported."); break;
    }
  };
?>
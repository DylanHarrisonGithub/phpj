<?php
	return function($component) {
    switch($component) {
			case 'App-Main': return require(__DIR__.'/App-Main/App-Main.template.php'); break;
      default: throw new Exception("PHPJ component '{$component}' not supported."); break;
    }
  };
?>

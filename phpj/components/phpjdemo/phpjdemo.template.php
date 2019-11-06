
	  <?php

		// Automatically generated template

		return function($params, $phpj) {

		  $validationErrs = $phpj['services']['validation']->validate(
				$params,
				require(__DIR__.'/phpjdemo.schema.php')
		  );
		  
		  $html = "";
		  if (count($validationErrs) > 0) {
			ob_start(); ?>
			  <h1 class="theme-alert text-center"><?php echo var_dump($validationErrs) ?></h1>
			<?php
			$html .= ob_get_clean();
			ob_flush();
		  } else {
			ob_start(); ?>
			  
			  <div phpjcomponent="phpjdemo">
				
					<h1 class="phpjdemocomponent-h1">PHPJ Demo Component</h1>
					<div class="phpjdemocomponent-h-center">
						<a href="https://github.com/DylanHarrisonGithub/phpj" class="phpjdemocomponent-button">Github</a>
					</div>
				
				</div>

			<?php
			$html .= ob_get_clean();
			ob_flush();
		  }
		  return $html;
		};

	  ?>
	  
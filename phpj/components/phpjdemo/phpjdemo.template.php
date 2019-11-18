
	  <?php

		// Automatically generated template

		return function($params, $phpj) {
			ob_start(); ?>
			  
			  <div phpjcomponent="phpjdemo">
				
					<h1 class="phpjdemocomponent-h1">PHPJ Demo Component</h1>
					<div class="phpjdemocomponent-h-center">
						<a href="https://github.com/DylanHarrisonGithub/phpj" class="phpjdemocomponent-button">Github</a>
					</div>
				
				</div>
				<!-- event.target.files -->
				<input id="fileupload" name="myfile" type="file" onchange="phpj.services.http.upload('upload', event.target.files.item(0)).then(res => console.log(res)).catch(err => console.log(err))"/>
			<?php
			$html = ob_get_clean();
			ob_flush();
		  return $html;
		};

	  ?>
	  
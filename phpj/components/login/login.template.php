<?php

// Automatically generated template

	return function($params, $phpj) {
		ob_start(); ?>
			
			<div phpjcomponent="login" class="app-card">
			
				<h1 style="text-align: center">Login</h1>
				<hr/>
				<label for="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" required>

				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required>
					
				<button type="submit">Login</button>
				<label>
					<input type="checkbox" checked="checked" name="remember"> Remember me
				</label>

				<div class="container" style="background-color:#f1f1f1">
					<button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
					<span class="psw">Forgot <a href="#">password?</a></span>
				</div>
				
			</div>

		<?php
		$html = ob_get_clean();
		ob_flush();
		return $html;
	};

?>
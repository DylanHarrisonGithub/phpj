
<?php

// Automatically generated template

	return function($params, $phpj) {
		ob_start(); ?>
			
			<div phpjcomponent="register" class="app-card">
			
				<div class="container">
					<h1>Register</h1>
					<p>Please fill in this form to create an account.</p>
					<hr>

					<label for="email"><b>Email</b></label>
					<input type="text" placeholder="Enter Email" name="email" required #email>

					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" required #password>

					<label for="psw-repeat"><b>Repeat Password</b></label>
					<input type="password" placeholder="Repeat Password" name="psw-repeat" required #password2>
					<hr>
					<p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

					<button type="submit" class="registerbtn" #submit>Register</button>

					<div class="container signin">
						<p>Already have an account? <a href="login">Sign in</a>.</p>
					</div>
				</div>

			</div>

		<?php
		$html = ob_get_clean();
		ob_flush();
		return $html;
	};

?>

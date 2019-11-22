<?php

	return function($params, $phpj) {
		$privelege = 'guest';
		if (isset($params['token'])) {
			if ($phpj['services']['authentication']['verifyToken'](
				$params['token'], 
				$phpj['config']['SERVER_SECRET']
			)) {
				if (isset($params['token']['privelege'])) {
					$privelege = $params['token']['privelege'];
				}
			}
		}
		ob_start(); ?>

			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
				<script type="text/javascript" src="./phpj/engine/phpj.js"></script>
				<link rel="stylesheet" href="./components.style.css">
			</head>
			<body>
				<?php echo $privelege ?>
				<div phpjcomponent="app-main">
					<?php echo $phpj['components']['navbar']['template']([
						'left' => [
							'home' => ['privelege' => ['guest', 'user', 'admin'], 'href' => 'home'],
							'portfolio' => ['privelege' => ['guest', 'user', 'admin'], 'href' => 'portfolio'],
							'resume' => ['privelege' => ['guest', 'user', 'admin'], 'href' => 'resume'],
							'blog' => ['privelege' => ['guest', 'user', 'admin'], 'href' => 'blog'],
						],
						'right' => [
							'login' => ['privelege' => ['guest'], 'href' => 'login'],
							'register' => ['privelege' => ['guest', 'user', 'admin'], 'href' => 'register'],
							'logout' => ['privelege' => ['user', 'admin'], 'href' => 'logout'],
							'admin' => ['privelege' => ['user', 'admin'], 'href' => 'admin'],
						],
						'privelege' => $privelege,
						'params' => $params
					], $phpj); ?>
					<div class="app-row">
						<div class="app-panel-left">
							<div class="app-card">hello</div>
						</div>
						<div class="app-panel-right">
							<?php if (isset($phpj['components'][$params['route']])): ?>
								<?php echo $phpj['components'][$params['route']]['template']($params, $phpj); ?>
							<?php endif; ?>
						</div>
					</div>
					
				</div>
			</body>
			</html>

		<?php
		$html = ob_get_clean();
		ob_flush();
		return $html;
	};

?>
	  
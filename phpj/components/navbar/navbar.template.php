<?php
	return function($params, $phpj) {
		ob_start(); ?>
			
			<div phpjcomponent="navbar" class="app-card">
				<ul class="navbar-ul-left">
					<?php foreach ($params['left'] as $key => $value): ?>
						<?php if (in_array($params['privelege'], $value['privelege'])): ?>
							<li class="navbar-li"><a class="navbar-a" href="<?php echo $value['href'] ?>"><?php echo $key; ?></a></li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
				<ul class="navbar-ul-right">
					<?php foreach ($params['right'] as $key => $value): ?>
						<?php if (in_array($params['privelege'], $value['privelege'])): ?>
							<li class="navbar-li"><a class="navbar-a" href="<?php echo $value['href'] ?>"><?php echo $key; ?></a></li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
			</div>

		<?php
		$html = ob_get_clean();
		ob_flush();
		return $html;
	};

?>
	  
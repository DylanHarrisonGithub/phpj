<?php
	return function($params, $phpj) {
		http_response_code(200); // OK
		header('Content-Type: text/html');
		ob_start(); ?>
			<div>
				<h1>Greetings</h1>
				<ul>
					<li>hello</li>
					<li>aloha</li>
					<li>salut</li>
					<li>conichiwa</li>
				</ul>
			</div>
		<?php
		$html = ob_get_clean();
		ob_flush();
		return $html;
		//return json_encode([
		//	'success' => true,
		//	'message' => 'the route works.',
		//	'params' => $params
		//]);
	}
?>

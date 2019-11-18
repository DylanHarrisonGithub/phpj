<?php
	return [
		'exists' => function($path) { return is_dir(realpath(__DIR__.'/../../../').'/'.$path); },
		'create' => function($path) { 
			
			if (!is_dir(realpath(__DIR__.'/../../../').'/'.$path)) {
				mkdir(realpath(__DIR__.'/../../../').'/'.$path, 0777, true);
				if (is_dir(realpath(__DIR__.'/../../../').'/'.$path)) {
					return [
						'success' => true,
						'message' => "Directory {$path} successfully created."
					];
				} else {
					return [
						'success' => false,
						'message' => "Could not create directory {$path} because of system failure."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not create directory {$path} because it already exists."
				];
			}

		},
		'read' => function($path) {

			if (is_dir(realpath(__DIR__.'/../../../').'/'.$path)) {
				return [
					'success' => true,
					'message' => 'Directory read successfully.',
					'content' => scandir(realpath(__DIR__.'/../../../').'/'.$path)
				];
			} else {
				return [
					'success' => false,
					'message' => "Could not read directory {$path} because it does not exist."
				];
			}

		},
		'delete' => function($path) {
			$deleteDir = function($dir, $me) {
				$objects = scandir($dir);
				foreach ($objects as $object) {
					if ($object != "." && $object != "..") {
						if (filetype($dir."/".$object) == "dir") {
							$me($dir."/".$object, $me);
							rmdir($dir."/".$object);
						} else { 
							unlink($dir."/".$object);
						}
					}
				}
			};

			if (is_dir(realpath(__DIR__.'/../../../').'/'.$path)) {
				$deleteDir(realpath(__DIR__.'/../../../').'/'.$path, $deleteDir);
				rmdir(realpath(__DIR__.'/../../../').'/'.$path);
				if (!is_dir(realpath(__DIR__.'/../../../').'/'.$path)) {
					return [
						'success' => true,
						'message' => "Directory {$path} was deleted successfully."
					];
				} else {
					return [
						'success' => false,
						'message' => "Could not delete directory {$path} because of system failure."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not delete directory {$path} because it does not exist."
				];
			}
		}
	];
?>

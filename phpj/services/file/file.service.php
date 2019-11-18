<?php
	return [
		'exists' => function($filename) { return realpath(__DIR__.'/../../../'.$filename) != false; },
		'create' => function($filename, $content = '') {

			$basedir = realpath(__DIR__.'/../../../').'/';
			$relativepath = dirname($filename).'/';
			if ($relativepath === './') $relativepath = "/";
			$basefilename = str_replace($relativepath, "", $filename);

			if (file_exists($basedir.$relativepath)) {
				if (!file_exists($basedir.$filename)) {
					$fh = fopen($basedir.$filename, "w");
					if ($fh !== false) {
						if (strlen($content) > 0) {
							fwrite($fh, $content);
						}
						fclose($fh);
						return [
							'success' => true,
							'message' => "File {$filename} created."
						];
					} else {
						return [
							'success' => false,
							'message' => "Could not create file {$filename} because of system failure."
						];
					}
				} else {
					return [
						'success' => false,
						'message' => "Could not create file {$basefilename} because {$filename} already exists."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not create file {$basefilename} because directory {$relativepath} does not exist."
				];
			}

		},
		'read' => function($filename) {

			$basedir = realpath(__DIR__.'/../../../').'/';
			$relativepath = dirname($filename).'/';
			if ($relativepath === './') $relativepath = "/";
			$basefilename = str_replace($relativepath, "", $filename);

			if (file_exists($basedir.$relativepath)) {
				if (file_exists($basedir.$filename)) {
					$fh = fopen($basedir.$filename, "r");
					if ($fh !== false) {
						$content = fread($fh, filesize(realpath(__DIR__.'/../../../'.$filename)));
						fclose($fh);
						return [
							'success' => true,
							'message' => "File {$filename} was read successfully.",
							'content' => $content
						];
					} else {
						return [
							'success' => false,
							'message' => "Could not read file {$filename} because of system failure."
						];
					}
				} else {
					return [
						'success' => false,
						'message' => "Could not read file {$filename} because it does not exist."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not read file {$basefilename} because directory {$relativepath} does not exist."
				]; 
			}

		},
		'update' => function($filename, $content) {

			$basedir = realpath(__DIR__.'/../../../').'/';
			$relativepath = dirname($filename).'/';
			if ($relativepath === './') $relativepath = "/";
			$basefilename = str_replace($relativepath, "", $filename);

			if (file_exists($basedir.$relativepath)) {
				if (file_exists($basedir.$filename)) {
					$fh = fopen($basedir.$filename, "a");
					if ($fh !== false) {
						fwrite($fh, "\n".$content);
						fclose($fh);
						return [
							'success' => true,
							'message' => "File {$filename} was updated successfully."
						];
					} else {
						return [
							'success' => false,
							'message' => "Could not update file {$filename} because of system failure."
						];
					}
				} else {
					return [
						'success' => false,
						'message' => "Could not update file {$filename} because it does not exist."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not update file {$basefilename} because directory {$relativepath} does not exist."
				]; 
			}
			
		},
		'delete' => function($filename) {

			$basedir = realpath(__DIR__.'/../../../').'/';
			$relativepath = dirname($filename).'/';
			if ($relativepath === './') $relativepath = "/";
			$basefilename = str_replace($relativepath, "", $filename);

			if (file_exists($basedir.$relativepath)) {
				if (file_exists($basedir.$filename)) {
					$success = unlink($basedir.$filename);
					if ($success) {
						return [
							'success' => true,
							'message' => "File {$filename} was deleted successfully."
						];
					} else {
						return [
							'success' => false,
							'message' => "Could not delete file {$filename} because of system failure."
						];
					}
				} else {
					return [
						'success' => false,
						'message' => "Could not delete file {$filename} because it does not exist."
					];
				}
			} else {
				return [
					'success' => false,
					'message' => "Could not delete file {$basefilename} because directory {$relativepath} does not exist."
				]; 
			}		

		},
	];

?>

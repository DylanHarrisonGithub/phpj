const exec = require('child_process').exec;
const fs = require('fs');

const [,, ... args] = process.argv;

var compilingJS = false;
var compilingCSS = false;

function _runScript(script, i, res) {
	exec(script[i], (error, stdout, stderr) => {
		if (error) {
			console.log('Error: ', error);
		} else {
			console.log( `stderr: ${stderr.toString()}` );
			console.log( `stdout: ${stdout.toString()}` );
			i++;
			if (script.length > i) {
				_runScript(script, i, res);
			} else {
				res('resolved');
			}
		}
	});
}
function runScript(script) {
	return new Promise((res, rej) => {
		_runScript(script, 0, res);
	});
}

const createDir = (dirPath) => {
  fs.mkdirSync(process.cwd() + dirPath, { recursive: true}, (error) => {
    if (error) {
      console.error('Error creating directory: ', error);
    } else {
      // console.log('directory created');
    }
  });
}

const createFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, error => {
    if (error) {
      console.error('An error occured creating file: ', error);
    } else {
      console.log('created file: ', filePath);
    }
  });
}

const writeLine = (filePath, lineNumber, text) => {
  let data = fs.readFileSync(filePath).toString().split("\n");
  data.splice(lineNumber, 0, text);
  fs.writeFile(filePath, data.join("\n"), function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('modified file: ', filePath);
    }
  });
}

const getSubDirs = (path) => {
	return fs.readdirSync(path, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
}

const moveFile = (oldPath, newPath, callback) => {
  fs.rename(oldPath, newPath, err => {
    if (err) {
      console.log(`An error occured moving file: ${oldPath}`, err);
    } else {
      console.log(`Moved file ${oldPath} to ${newPath}.`);
    }
  });
}
let templates = {};
if (args.length > 2) {
	templates = {
	  component: `

	  // Automatically generated template

	  module.exports = class ${args[2].charAt(0).toUpperCase() + args[2].substring(2)}{

		constructor(stateID, params) {

		  //
		  // Initialize component here..
		  //

		}

	  }
	  `,
	  schema: `
	  <?php
		
		// Automatically generated template

		return [

		  //
		  // Component params schema here..
		  //

		];
	  ?>
	  `,
	  template: `
	  <?php

		// Automatically generated template

		return function($params, $components) {

		  $validator = require(__DIR__.'/../../services/validation/validation.service.php');
		  $validationErrs = $validator->validate(
				$params,
				require(__DIR__.'/` + args[2] + `.schema.php')
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
			  
			  <div phpjcomponent="${args[2]}">
				
				${args[2]} component
				<!--
				  //
				  // PHP template code here..
				  //
				-->

			  </div>

			<?php
			$html .= ob_get_clean();
			ob_flush();
		  }
		  return $html;
		};

	  ?>
	  `
	,
	route: {
		route: `
<?php

// Automatically generated template

	return function($params) {

		//
		// Route logic here..
		//

	}

?>
`,
		scheema: `
<?php

// Automatically generated template

	return [

		//
		// Route params schema here..
		//

	];
?>
`
		}	
	}
}

if (args.length > 0) {
	if (args.length == 1) {
		if (args[0].toLowerCase() === 'watch') {
			console.log('watching project..');
			fs.watch('./', {'recursive': true}, (event, filename) => {
				if (filename && filename.length > 2 && compilingJS === false) {
					if (filename.substr(filename.length - 3) === ".js") {
						if (filename !== "phpj\engine\phpj.js") {			
							compilingJS = true;
							console.log('javascript change detected: ', event, filename);
							runScript([`node node_modules/webpack/bin/webpack`]).then(n  => {
								compilingJS = false; 
								console.log('watching project..');
							});
						}
					} else if (filename.substr(filename.length - 4) === ".css") {
						if (filename !== "components.style.css") {
							compilingCSS = true;
							console.log('css change detected: ', event, filename);
							let concat = `
/* phpj generated css */
`;
							getSubDirs('./phpj/components').forEach(subdir => {
								fs.readdirSync('./phpj/components/' + subdir).filter(fname => fname.endsWith('.css')).forEach(stylesheet => {
									concat += `
/* ${stylesheet} */
` + fs.readFileSync('./phpj/components/' + subdir + '/' + stylesheet).toString();
								})
							});
							createFile('./components.style.css', concat);
							compilingCSS = false;
							console.log('watching project..');
						}
					}
				}
			});
		}
	} else if (args.length > 2) {
    if (args[0].toLowerCase() === 'g' || args[0].toLowerCase() === 'generate') {
			if (args[1].toLowerCase() === 'c' || args[1].toLowerCase() === 'component') {
				createDir('/phpj/components/' + args[2]);
				createFile('./phpj/components/' + args[2] + '/' + args[2] + '.component.js', templates.component);
				createFile('./phpj/components/' + args[2] + '/' + args[2] + '.schema.php', templates.schema);
				createFile('./phpj/components/' + args[2] + '/' + args[2] + '.template.php', templates.template);
				createFile('./phpj/components/' + args[2] + '/' + args[2] + '.style.css', "");
				writeLine('./phpj/components/components.php', 2, `    '${args[2]}' => require(__DIR__.'/${args[2]}/${args[2]}.template.php'),`);
				writeLine('./phpj/engine/src/phpj.js', 4, `      ${args[2]}: require('../../components/${args[2]}/${args[2]}.component'),`);
			} else if (args[1].toLowerCase() === 'r' || args[1].toLowerCase() === 'route') {
				createDir('/phpj/routes/' + args[2]);
				createFile('./phpj/routes/' + args[2] + '/' + args[2] + '.route.php', templates.route.route);
				createFile('./phpj/routes/' + args[2] + '/' + args[2] + '.scheema.php', templates.route.scheema);
				writeLine('./phpj/services/router/router.service.php', 2, `    '${args[2]}' => [
					'privelege' => 'guest',
					'schema' => require(__DIR__.'/../../routes/${args[2]}/${args[2]}.scheema.php'),
					'route' => require(__DIR__.'/../../routes/${args[2]}/${args[2]}.template.php')
		],`);
			}
    }
  }
}
const exec = require('child_process').exec;
const fs = require('fs');


const [,, ... args] = process.argv;


let shellScript1 = [
  `echo initializing node project..`,
	`npm init -y`,
	`echo installing webpack. please wait..`,
	`npm install webpack webpack-cli --save-dev`
];
let shellScript2 = [
  `echo creating phpjdemo component`,
  `node phpj-cli generate phpjdemo`,
  `echo start phpj project with node node_modules/webpack/bin/webpack --watch`
];

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
if (args.length > 1) {
	templates = {
	  component: `

	  // Automatically generated template

	  module.exports = class ${args[1].charAt(0).toUpperCase() + args[1].substring(1)}{

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
		  $validationErrs = $validator(
			$params,
			require(__DIR__.'/` + args[1] + `.schema.php')
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
			  
			  <div phpjcomponent="${args[1]}">
				
				${args[1]} component
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
	}	
}


if (args.length > 0) {
  if (args[0].toLowerCase() === 'init' || args[0].toLowerCase() === 'initialize') {
    runScript(shellScript1).then(n => {
      createDir('phpj');
      createDir('/phpj/components');
      createDir('/phpj/engine');
      createDir('/phpj/engine/src');
      createDir('/phpj/layouts');
      createDir('/phpj/services');
      createDir('/phpj/services/render');
      createDir('/phpj/services/validation');
      moveFile('./install/webpack.config.js', './webpack.config.js');
      moveFile('./install/phpj.js', './phpj/engine/src/phpj.js');
      moveFile('./install/engine.js', './phpj/engine/src/engine.js');
      moveFile('./install/components.php', './phpj/components/components.php');
      moveFile('./install/render.service.php', './phpj/services/render/render.service.php');
      moveFile('./install/validation.service.php', './phpj/services/validation/validation.service.php');
      moveFile('./install/validator.class.php', './phpj/services/validation/validator.class.php');
      moveFile('./install/validator.class.php', './phpj/services/validation/validator.class.php');
      moveFile('./install/services.php', './phpj/services/services.php');
      moveFile('./install/index.php', './index.php');
      runScript(shellScript2).then(n => {console.log('setup complete')});
    });
  } else if (args.length > 1) {
    if (args[0].toLowerCase() === 'g' || args[0].toLowerCase() === 'generate') {
      createDir('/phpj/components/' + args[1]);
      createFile('./phpj/components/' + args[1] + '/' + args[1] + '.component.js', templates.component);
      createFile('./phpj/components/' + args[1] + '/' + args[1] + '.schema.php', templates.schema);
      createFile('./phpj/components/' + args[1] + '/' + args[1] + '.template.php', templates.template);
      writeLine('./phpj/components/components.php', 2, `    '${args[1]}' => require(__DIR__.'/${args[1]}/${args[1]}.template.php'),`);
      writeLine('./phpj/engine/src/phpj.js', 4, `      ${args[1]}: require('../../components/${args[1]}/${args[1]}.component'),`);
    }
  }
}
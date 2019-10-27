const exec = require('child_process').exec;
const fs = require('fs');

let shellScript1 = [
  `echo initializing node project..`,
	`npm init -y`,
	`echo installing webpack. please wait..`,
	`npm install webpack webpack-cli --save-dev`
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

const templates = {
  'webpack-config': `
  const path = require('path');

  module.exports = {
    entry: './phpj/scripts/src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'phpj/scripts')
    },
  };
  `
};

runScript(shellScript1).then(n => {
  createDir('phpj');
  createDir('/phpj/components');
  createDir('/phpj/scripts');
  createDir('/phpj/layouts');
  createDir('/phpj/services');
  createFile('webpack.config.js', templates["webpack-config"]);
});
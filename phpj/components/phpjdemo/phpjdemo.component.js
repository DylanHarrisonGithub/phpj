

	  // Automatically generated template

	  module.exports = class Ppjdemo{

		constructor(stateID, params) {

		  //
		  // Initialize component here..
		  //
			phpj.services.http.get('test1', {'val': 'testval'}, {'bearer': 'what up blintz!'}).then(res => console.log(res)).catch(err => console.log(err));
		}

	  }
	  
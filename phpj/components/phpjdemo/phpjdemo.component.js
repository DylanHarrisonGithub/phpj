

	  // Automatically generated template

	  module.exports = class Ppjdemo{

		constructor(stateID, params) {

		  //
		  // Initialize component here..
		  //
			phpj.services.http.get('test12', {'val': 'testval'}, {'bearer': 'test token'}).then(res => console.log(res)).catch(err => console.log(err));
		}

	  }
	  
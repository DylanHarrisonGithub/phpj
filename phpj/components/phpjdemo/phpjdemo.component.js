

	  // Automatically generated template

	  module.exports = class Ppjdemo{

		constructor(stateID, params) {

		  //
		  // Initialize component here..
		  //
			phpj.engine.request('test1', {'val': 'testval'}).then(res => console.log(res)).catch(err => console.log(err));
			console.log(phpj.services.validation.validate(
				{'data': 5}, {
					'data': {
						'required': true,
						'type': 'string'
					}
				} ));
		}

	  }
	  
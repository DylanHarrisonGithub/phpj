

	  // Automatically generated template

	  module.exports = class Ppjdemo{

		constructor(stateID, params) {

		  //
		  // Initialize component here..
		  //
			phpj.services.http.get('test1', {'val': 'testval'}, {'bearer': 'test token'}).then(res => {
				var template = document.createElement('template');
    		res = res.trim(); // Never return a text node of whitespace as the result
				template.innerHTML = res;
				document.body.appendChild(template.content.firstChild);
			}).catch(err => console.log(err));

			phpj.services.http.post('login', {'username': 'myusername', 'password': 'abcDEF123!@#'}).then(res => {
				console.log(res);
			}).catch(err => console.log(err));

			console.log(phpj.services.storage.setItem('token', {
				id: 0,
				username: 'testuser',
				email: 'myemail@mail.com',
				signature: 'asdfjklfheioawhiovnaiose234@#$@#$'
			}));
			console.log(phpj.services.storage.getItem('token'));
		}

	  }
	  
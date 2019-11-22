module.exports = class Rgister{

	constructor(stateID, params) {

		this.inputs = {};

		console.log(phpj.state[stateID]);
		Object.keys(phpj.state[stateID].taggedNodes).forEach(key => {
			if (phpj.state[stateID].taggedNodes[key].tagName === 'INPUT') {
				this.inputs[key] = phpj.state[stateID].taggedNodes[key];
				phpj.state[stateID].taggedNodes[key].addEventListener('input', e => {
					console.log(e.target.value);
				});
			} else {
				phpj.state[stateID].taggedNodes[key].addEventListener('click', e => {
					phpj.services.http.post('user/register', {
						'email': this.inputs['email'].value,
						'password': this.inputs['password'].value
					}).then(res => {
						if (res.success) {
							console.log(phpj.services.storage.setItem('token', res.token));
							window.location.href = 'home';
						}
					}).catch(err => {
						console.log(err);
					});
				});
			}
		});

	}

}

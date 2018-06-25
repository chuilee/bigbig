var keystone = require('keystone');
var User = keystone.list('User');

module.exports = function (done) {
	new User.model({
		name: {
			first: 'admin',
			last: 'User'
		},
		email: 'admin@keystonejs.com',
		password: 'admin',
		isAdmin: false,
		isProtected: false,
		canAccessKeystone: true
	})
	.save(done);
};

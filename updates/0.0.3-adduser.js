var keystone = require('keystone');
var User = keystone.list('User');

module.exports = function (done) {
	new User.model({
		name: {
			first: 'chui',
			last: 'lee'
		},
		email: 'chuilee@keystonejs.com',
		password: 'admin123456',
		isAdmin: false,
		isProtected: false,
		canAccessKeystone: true
	})
	.save(done);
};

var keystone = require('keystone');
var bcrypt = require('bcryptjs');
var User = keystone.list('User');

module.exports = (req, res) => {
	var result = {};
	res.setHeader('Content-Type', 'application/json');
	// res.setHeader('Access-Control-Allow-Credentials', 'true');


	if (!req.body.email || !req.body.password) {
		result.resCode = "4001"; //
		result.resMsg = "用户名或密码不能为空"; //
		return res.send(result);
	}
	User.model.findOne({
		email: req.body.email
	}).exec((err, user) => {
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, success) => {
				if (err) {
					result.resCode = "4000"; //
					result.resMsg = "网络出错"; //
					return res.send(result);
				}
				if (success) { // 密码正确
					result.resCode = "0000"; //
					result.resMsg = "登录成功"; //
					req.session.userinfo = JSON.stringify({
						email: req.body.email,
						password: req.body.password
					}); //

					res.cookie('userinfo', JSON.stringify({
						email: req.body.email,
						password: req.body.password
					}), {
						maxAge: 10 * 60 * 1000,
						domain: 'localhost:3000',
						path: '/',
						secure: false,
					});

					return res.send(result);
				} else {
					result.resCode = "4002"; //
					result.resMsg = "密码不对"; //
					return res.send(result);
				}
			})
		} else {
			result.resCode = "4003"; //
			result.resMsg = "用户名不存在"; //
			return res.send(result);
		}
	})
}

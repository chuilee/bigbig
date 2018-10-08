var keystone = require('keystone');

module.exports = (req, res) => {
	var result = {};
	res.setHeader('Content-Type', 'application/json');
	// console.log((JSON.parse(req.session.userinfo)).email)
	// res.cookie('test', 'test', {maxAge: 60 * 60 * 1000});
	if (req.signedCookies.sid) {
		result.resCode = '0000';
		result.resMsg = req.signedCookies.sid;
		return res.send(result);
	} else {
		result.resCode = '4001';
		result.resMsg = 'cookie不存在或已过期，请重新登录';
		return res.send(result);
	}

}

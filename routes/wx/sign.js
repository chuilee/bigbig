const WxAPI = require('wechat-api');
const COFNIG = require('../../config/wx.config');
const sign = require('../api/sign'); //上面的签名算法

var config = {
	appid: COFNIG.appid,
	appsecret: COFNIG.secret
};
var wxApi = new WxAPI(config.appid, config.appsecret);

wxApi.getAccessToken(function (err, token) {
	console.log(err);
	console.log(token);
});

exports = module.exports = function (req, res) {
	//获取ticket
	wxApi.getTicket((err, result) => {
		if (err) throw new Error(error);
		//签名
		var ret = sign(result.ticket, req.query.url, config.appid);
		res.json(ret);
	});
}

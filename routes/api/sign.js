//随机字符串
var createNonceStr = function () {
	return Math.random().toString(36).substr(2, 15);
};

//时间戳
var createTimestamp = function () {
	return parseInt(new Date().getTime() / 1000) + '';
};

//对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
var raw = function (args) {
	var keys = Object.keys(args);
	keys = keys.sort()
	var newArgs = {};
	keys.forEach(function (key) {
		newArgs[key.toLowerCase()] = args[key];
	});

	var string = '';
	for (var k in newArgs) {
		string += '&' + k + '=' + newArgs[k];
	}
	string = string.substr(1);
	return string;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url, appId) {
	var ret = {
		jsapi_ticket: jsapi_ticket,
		nonceStr: createNonceStr(),
		timestamp: createTimestamp(),
		url: url
	};
	var string = raw(ret);
			jsSHA = require('jssha');
			//对string作sha1签名
			shaObj = new jsSHA(string, 'TEXT');
	ret.signature = shaObj.getHash('SHA-1', 'HEX');
	ret.appId=appId;
	return ret;
};

//暴露sign方法
module.exports = sign;
/*---------------------
作者：isyoungboy
来源：CSDN
原文：https://blog.csdn.net/isyoungboy/article/details/81457568?utm_source=copy
版权声明：本文为博主原创文章，转载请附上博文链接！
*/

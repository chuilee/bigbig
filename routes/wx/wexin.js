const crypto = require('crypto')
const TOKEN = 'paintersphotography'
exports = module.exports = function (req, res) {
	var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var echostr = req.query.echostr;
  var nonce = req.query.nonce;
  var tmpArray = [nonce, timestamp, token];
  tmpArray.sort();
  var tmpStr = tmpArray.join('');
  var shasum = crypto.createHash('sha1');

	shasum.update(tmpStr)

  var shaResult = shasum.digest('hex');
  if (signature == shaResult) {
    //验证成功
    res.send(echostr);
  } else {
    //验证失败
		console.log('not wexin server')
    res.send('not wexin server');
  }
}

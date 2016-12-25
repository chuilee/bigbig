var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {
	Post.model.find({state: 'published'})
		.sort('sortOrder')
		.select({'image.url': 1, 'image.secure_url': 1, name: 1})
		.exec(function(err, result){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(result));
		})
}

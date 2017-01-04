var keystone = require('keystone');
var Post = keystone.list("Post")

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.title = '感官世界';

  // Load the current post
  view.on('init', function (next) {

		var q = Post.model.find({
			state: 'published'
		})
    .sort('-publishedDate')
		.limit(7)
    .populate('author categories');

		q.exec(function (err, result) {
			locals.posts = result;
			next(err);
		});
	});

	view.render('index', {
		section: 'home'
	});

}

var keystone = require('keystone');
var Page = keystone.list('Page');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'pages';
	locals.page = req.params.page

	// Render the view
	view.render('page');

}

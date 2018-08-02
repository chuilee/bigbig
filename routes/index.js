const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
	api: importRoutes('./api'),
	json: importRoutes('./json'),
	wx: importRoutes('./wx'),
	api: importRoutes('./api'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/add-event', routes.views.addEvent);
	app.get('/page/:page', routes.views.page);

	// api
	app.post('/api/event', routes.api.event.post);

	// Downloads
	app.get('/download/users', routes.download.users);

	// JSON
	app.get('/json/gallery', routes.json.gallery);

	// wx
	app.get('/wexin', routes.wx.wexin);

	//File Upload Route
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);
	// ...TO HERE.

}

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
const cors = require('cors'); // 跨域

const corsOptions = {
	origin:[/^http(s*):\/\/127.0.0.1(:\d*)/, /^http(s*):\/\/localhost(:\d*)/],
	methods:['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	alloweHeaders:['Content-Type', 'Authorization']
}

keystone.pre('routes', cors(corsOptions));

keystone.pre('routes', function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

	// Request methods you wish to allow
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST,HEAD');

	// Request headers you wish to allow
	// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

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
	app.post('/api/login/signin', routes.api.login.signin);
	app.get('/api/login/signout', routes.api.login.signout);
	app.get('/api/menu/list', routes.api.menu.list);

	// Downloads
	app.get('/download/users', routes.download.users);

	// JSON
	app.get('/json/gallery', routes.json.gallery);

	// wx
	app.get('/wexin', routes.wx.wexin);
	app.get("/sign", routes.wx.sign);

	//File Upload Route
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);
	// ...TO HERE.

}

require('dotenv').config()

var keystone = require('keystone');
var path = require('path')

keystone.init({

	'name': 'SENSESHOUSE',
	'brand': 'SENSESHOUSE',

	'favicon': 'public/favicon.ico',
	'less': path.join(__dirname, 'public'),
	'static': path.join(__dirname, 'public'),
	'sass': path.join(__dirname, 'public'),
	'sass options': {
		outputStyle: 'compressed'
	},

	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'mongo': process.env.MONGO_URI,

	'session': false, // 暂时关闭 很耗性能
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN,

	'cloudinary config': 'cloudinary://511863381453736:32_WdRsTyMB5NZ1jcoVCBbR2bU8@chuilee',
	'cloudinary folders': true,
	'cloudinary secure': true,
	'cloudinary prefix': 'senselife',

	'wysiwyg cloudinary images': true,
	'wysiwyg additional options': {
		'external_plugins': {
			'uploadimage': '/js/lib/tinymce/plugins/uploadimage/plugin.min.js'
		}
	},

	// 'wysiwyg images': true,
	'wysiwyg menubar': true,
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'users': 'users'
});

keystone.set('routes', require('./routes'));

keystone.start();

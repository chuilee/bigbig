var keystone = require('keystone');
var Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
	label: 'Page'
});

Page.add({
	name: {
		type: String,
		required: true
	},
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true
	},
	image: {
		type: Types.CloudinaryImage
	},
	content: {
		brief: {
			type: Types.Html,
			wysiwyg: true,
			height: 150
		},
		extended: {
			type: Types.Html,
			wysiwyg: true,
			height: 400
		},
	},
});

Page.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Page.defaultColumns = 'name, state|20%';

Page.register();

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	label: 'Post',
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Post.add({
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
	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true
	},
	image: {
		type: Types.CloudinaryImage
	},
	content: {
		brief: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			hidden: true
		},
		extended: {
			type: Types.Html,
			wysiwyg: true,
			height: 400
		},
	},
	images: {
		type: Types.CloudinaryImages
	},
	categories: {
		type: Types.Relationship,
		ref: 'PostCategory',
		many: true
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.relationship({
	path: 'comments',
	ref: 'PostComment',
	refPath: 'post'
});

Post.track = true;
Post.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Post.register();

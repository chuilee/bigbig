var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Product.add({
    title: { type: String, required: true },
    name: { type: Types.Name, initial: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', initial: true },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
});

Product.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Product.register();

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
	label: 'Product',
	nocreate: false,
});

Product.add({
	name: { type: Types.Name, required: true, default: {first: 'chui', last: 'lee'} },
	email: { type: Types.Email, displayGravatar: true },
	phone: { type: String, default: 123123123 },
	message: { type: Types.Textarea },
});

Product.track = true;
Product.defaultSort = '-createdAt';
Product.defaultColumns = 'name, email, enquiryType, createdAt';
Product.register();

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	label: 'Enquiry',
	nocreate: false,
});

Enquiry.add({
	email: { type: Types.Email, required: true, default: 'chui@gmail.com' },
	name: { type: Types.Name, required: true, default: { frist: 'Y', last: 'X'} },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: "Just leaving a message" },
		{ value: 'question', label: "I've got a question" },
		{ value: 'other', label: "Something else..." },
	], required: true, default: 'message' },
	message: { type: Types.Textarea, required: true, default: '1111' },
});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
// Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();

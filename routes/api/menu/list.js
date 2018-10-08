var keystone = require('keystone');
var _ = require('lodash');

module.exports = (req, res) => {
	var result = {};
	var sections = keystone.nav.sections ? _.clone(keystone.nav.sections) : [];
	var orphanedLists = keystone.getOrphanedLists().map(function (list) {
		return _.pick(list, ['key', 'label', 'path']);
	});

	if (orphanedLists.length) {
		var orphanedList = {
			lists: orphanedLists,
			key: 'Other',
			label: 'Other'
		};
		sections.push(orphanedList);
	}

	res.setHeader('Content-Type', 'application/json');
	// res.setHeader('Access-Control-Allow-Credentials', 'true');

	if (sections.length) {
		result.resCode = "0000"; //
		result.resMsg = sections; //
		return res.send(result);
	} else {
		result.resCode = "4001"; //
		result.resMsg = []; //
		return res.send(result);
	}
}

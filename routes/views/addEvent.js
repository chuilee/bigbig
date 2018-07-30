<<<<<<< HEAD
module.exports = function (req, res) {
  res.render('event');
};
=======
var keystone = require('keystone');

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.title = 'SENSELIFE';
    
	view.render('addEvent');
};
>>>>>>> 68eabc8dae96e81708a1255dcaa2fa8df9bc989a

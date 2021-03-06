var keystone = require('keystone');
var Event = keystone.list('Event');

module.exports = function (req, res) {
    var view = new keystone.View(req, res);

    if (!req.body.name || !req.body.startTime || !req.body.endTime) {
    	return res.send('incomplete data set');
    }
    var newEvent = new Event.model(req.body);

    newEvent.save((error) => {
        res.locals.enquirySubmitted = true;
        if (error) res.locals.saveError = true;
        view.render('addEvent');
    });

    // Event.updateItem(newEvent, req.body, (err) => {
    //     res.locals.enquirySubmitted = true;
    //     if (error) res.locals.saveError = true;
    //     view.render('addEvent');
    // });
}

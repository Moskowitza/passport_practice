//Simlply render signup page when asked by our route
var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
}
exports.signin = function(req, res) {
    res.render('signin');
}
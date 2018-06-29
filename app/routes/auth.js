var authController = require('../controllers/authcontroller.js');

//when we hit path /signup, auth controller calls a route, in this one case we just have signup
module.exports = function (app) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
}
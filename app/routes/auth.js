var authController = require('../controllers/authcontroller.js');
// var passport = require('passport');
//when we hit path /signup, auth controller calls a route, in this one case we just have signup
module.exports = function (app, passport) {
    // GET routes to render our handlebar pages
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);

    // POST route to implement passport and sign up a user
    /**Since we need passport, we need to pass it to this method. 
     * We can import passport in this script OR pass it from server.js. NOTE WE TAKE IN APP, Passport as params */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
    ));
    app.get('/dashboard',authController.dashboard);
}
var authController = require('../controllers/authcontroller.js');

//when we hit path /signup, auth controller calls a route, in this one case we just have signup
module.exports = function (app) {
    // GET routes to render our handlebar pages
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);

    // POST route to implement passport and sign up a user
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
));
}
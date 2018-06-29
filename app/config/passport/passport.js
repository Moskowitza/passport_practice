// First, we import bcrypt which we need to secure passwords.
var bCrypt = require('bcrypt-nodejs');

/* Inside this block, we initialize 
1-the passport-local strategy, 
2-and the user model, which will be passed as an argument. */
module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

/*Then we define our custom strategy with our instance of the LocalStrategy */
passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    //in this call back we will handle storing a user's details
    function (req, email, password, done) {
        //we add our hashed password generating function inside the callback function
        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        //Then, using the Sequelize user model we initialized earlier as User, we check to see if the user already exists, and if not we add them
        User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            } else {
                //ELSE make a new user
                //Notice that the values in the data object are gotten from the req.body object which contains the input from our signup form. 
                var userPassword = generateHash(password);
                var data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };
                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }
));
}
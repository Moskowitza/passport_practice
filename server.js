/* The first line assigns the express module to a variable express. 
** We then initialize express and name it a variable: app. 
*/
var express = require('express');
var app = express();

// import the dot-env module to handle environment variables.
var env = require('dotenv').load();

//middleware : import the passport module and the express-session, both of which we need to handle authentication.
var passport   = require('passport');
var session    = require('express-session');
// Then, we import the body-parser module. This extracts the entire body part of an incoming request and exposes it in a format that is easier to work with. In this case, we will use the JSON format.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//AFTER the bodyParser import line we initialize PASSPORT and the express session and passport session and add them both as middleware. We do this by adding these lines some spaces 
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//Route
app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize'); 
});
 
// Make app listen on port 5000. 
app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live on http://localhost:5000");
    else console.log(err)
});
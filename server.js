/* The first line assigns the express module to a variable express. 
** We then initialize express and name it a variable: app. 
*/
var express = require('express');
var app = express();
//middleware : import the passport module and the express-session, both of which we need to handle authentication.
var passport   = require('passport');
var session    = require('express-session');
// Then, we import the body-parser module. This extracts the entire body part of an incoming request and exposes it in a format that is easier to work with. In this case, we will use the JSON format.
var bodyParser = require('body-parser');
// import the dot-env module to handle environment variables.
var env = require('dotenv').load();

//For bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//AFTER the bodyParser import line we initialize PASSPORT and the express session and passport session and add them both as middleware. We do this by adding these lines some spaces 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
var exphbs = require('express-handlebars');
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Models
var models = require("./app/models"); 

//Routes !!!! some problem here moved (app) need to pass passport to our authRoute
var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database REMOVE FORCE TRUE to prevent overwrite of table
models.sequelize.sync({force:true}).then(function() {
    console.log('Nice! Database looks fine') 
  }).catch(function(err) {
      console.log(err, "Something went wrong with the Database Update!")
  });
// Make app listen on port 5000. 
app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live on http://localhost:5000");
    else console.log(err)
});
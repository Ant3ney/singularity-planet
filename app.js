var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/User');
var blogRouts = require('./routs/blogs');
var indexRouts = require('./routs/index');
var middleware = require('./middleware/index.js');
var Category = require('./models/Category');
var categoryRouts = require('./routs/categorys');
var commentRouts = require('./routs/comments');

require('dotenv').config();

mongoose
   .connect(process.env.DATABASEURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   })
   .then(() => {
      console.log('mongoose server is up');
   })
   .catch(err => {
      console.log('Something went wrong in mongodb');
      console.log(err.message);
   });

//setting and getting info
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);
app.use(methodOverride('_method'));

//Passport configuration
app.use(
   require('express-session')({
      secret: 'The singularity blog value',
      resave: false,
      saveUninitialized: false,
   })
);
app.use(passport.initialize());
app.use(passport.session());

//Passport configuration p2
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.isAdmin = middleware.isAdminBool(req);
   next();
});

//Route Configuration
app.use('/category', categoryRouts);
app.use('/:blogId/comment', commentRouts);
app.use(blogRouts);

app.listen(process.env.PORT || 3002, process.env.IP, () => {
   console.log(`Server has started on port: ${process.env.PORT || 3002}`);
});

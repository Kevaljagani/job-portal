const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const readline = require('readline');
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const http = require('http').createServer(app)
const jobs = require('./models/jobs')
const user = require('./models/user')
const MongoDbStore = require('connect-mongo')(session)


//port
const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));



const url = 'mongodb://localhost/local1';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

//temp



let mongooseStore = new MongoDbStore({
	mongooseConnection: connection,
	collection: 'sessions'
})


//session

app.use(session({
	secret: "HEllo",
	resave: false,
	store: mongooseStore,
		saveUninitialized: false,
		cookie: { maxAge: 1000*60*60*24 } //24 hrs

}))




//parse
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//set routes
require('./routes/api')(app)

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/userdashboard', async (req, res, next) => {
	if(req.isAuthenticated()) {
		return next()
	}
	const hello = await jobs.find()
    return res.render('userdashboard', {hello: hello});
})

app.get('/rdashboard', (req, res, next) => {
	if(req.isAuthenticated()) {
		return next()
	}
    res.render('rdashboard');
})

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/admindashboard', async (req, res) => {
	const foo = await user.find()
    return res.render('admindashboard', {foo: foo});
    //res.render('admindashboard');
})

app.get('/edit', async (req, res) => {
    const car = await user.find()
    console.log(car)
    return res.render('edit', {car: car});
})

//passport
var passport = require('passport');
var userProfile;
 
app.use(passport.initialize());
app.use(passport.session());

 
app.get('/register', (req, res) => {
  res.render('register', {user: userProfile});
});
app.get('/error', (req, res) => res.send("error logging in"));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */
 
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '856773102651-s7o93o4cgedtmqraoq4do6q5lenm8i2d.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '8vc09tKTC2pC6cX8hB-1hPP1';

passport.use(new GoogleStrategy({
    clientID: '856773102651-s7o93o4cgedtmqraoq4do6q5lenm8i2d.apps.googleusercontent.com',
    clientSecret: '8vc09tKTC2pC6cX8hB-1hPP1',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  async function(req, res) {

  	/*const hi = await user.find()

	for(var i=0; i<hi.length; i++)
	{
		let validator = hi[i].email;
		console.log(validator)
		if( user.email = validator){
			res.redirect('/userdashboard')
		}
		else{
			res.redirect('/register')
		}
	}*/

  	
    // Successful authentication, redirect success.
   /* if(user.displayName = "Eric A " ){
    	console.log("hello")
    }*//*else{*/

    

    res.redirect('/register');
    /*}*/
  });
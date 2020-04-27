var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

//database settings
const CONNECTION_URL = "mongodb+srv://<username>:<password>@cluster0-nqiiy.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "name_of_database";
var database, collection;


/**
 * Add consumer key, secret, call back url. require passport, passport-twitter and express-session
 */
var TWITTER_CONSUMER_KEY    = "###############################";
var TWITTER_CONSUMER_SECRET = "################################";
var callbackURL             = "http://127.0.0.1:3000/twitter/callback";

var passport = require('passport');
var TwitterStrategy   = require('passport-twitter').Strategy;
var sess              = require('express-session');
var BetterMemoryStore = require('session-memory-store')(sess);

passport.use(new TwitterStrategy({
  consumerKey:    TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL:    callbackURL
},
  function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
));

// Serialize and deserialize user information
passport.serializeUser(function(user, callback){
  callback(null, user);
});
passport.deserializeUser(function(object, callback){
  callback(null, object);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* add session cofig */
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
  name: 'JSESSION',
  secret: 'MYSECRETISVERYSECRET',
  store:  store,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Add route '/'
var info;
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("mycollection");
        console.log("connected to test!");
        collection.find({}).toArray((error,result)=>{
        		if(error){
        			return res.status(500).send(error);
        		}
        		info = result;
        		info = JSON.stringify(info);
        		
        		console.log(info);
        		
        });
       

    });
app.get('/', function(req, res){
	
  res.render('index', {user: req.user, title: "letmesay!");
});

/** Add twitter login and return methoods */
app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect : '/'
}), 
  function(req, res){
    res.redirect('/')
  });

app.get('/twitter/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/data',(request,response)=>{
	collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
        // console.log(result);
    });
});

app.post("/twitter/addpost", (request, response) => {
    collection.insertOne(
    	request.body, 
    	(error, result) => {
		if(error) {
            return response.status(500).send(error);
        }
        // response.send(result.result);
        
        response.redirect('/');

    });
});


module.exports = app;
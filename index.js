// Require packages
require('dotenv').config();
var bodyParser = require('body-parser'); 
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');

// Initialize Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Set up controllers
app.use('/auth', require('./controllers/auth'));
app.use('/main', require('./controllers/main'));
app.use('/contributions', require('./controllers/contributions'));
app.use('/tags', require('./controllers/tags'));
app.use('/visuals', require('./controllers/visuals'));

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res){
	res.render('home');
});


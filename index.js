// Require packages
require('dotenv').config();
var bodyParser = require('body-parser'); 
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');
var request = require('request');



// Initialize Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

//SLIDV Data
// API END POINT: https://liveapi.livestories.com/observation/study/
// Study:
// Locale: US:ST:*:CO:*

app.use(express.static(path.join(__dirname, '/public')));
app.use('/main', require('./controllers/data_collection'));

app.get('/', function(req, res){
	res.render('layout');
// 	request('https://liveapi.livestories.com/observation/study/US.GOV.US.HHS.CDC.YRBSS:17/dimension/US.GOV.US.HHS.CDC.YRBSS:17%3EDEMO:US:RACE/locale/US:ST:*/', function (error, response, body) {
//     	if (!error && response.statusCode == 200) {
//         	//console.log(body) // Print the google web page.
        	
        	
//         	var obj=JSON.parse(body);
// 			var data=JSON.parse(JSON.stringify(obj));

//         	var observations = data.results.observations
//         	console.log('observations', observations)
//         	res.render('home');
//      	}
// })

	
});

app.listen(3000);
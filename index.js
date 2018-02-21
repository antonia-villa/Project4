// Require packages
require('dotenv').config();
var dataCleanse = require('./dataCleanse.js');
var bodyParser = require('body-parser'); 
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path');
var request = require('request');

var json2csv = require('json2csv');
var fs = require('fs');



// Initialize Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

//SLIDV Data
// API END POINT: https://liveapi.livestories.com/observation/study/
// Study:
// Locale: US:ST:*:CO:*

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res){
	
	// res.render('home');

// API Reqyest to retrieve Education Data
	request('https://liveapi.livestories.com/observation/study/ACS:B14001/locale/US:ST:WA:CO:*', function (error, response, body) {
    	if (!error && response.statusCode == 200) {
        	
        	
        	var obj=JSON.parse(body);
			var data=JSON.parse(JSON.stringify(obj));


			var data_attributes = {name: data.results.study.name, description: data.results.study.description}
			var educationLevels = dataCleanse.county_educationLevels(data.results.study.dimensions[0].dimensions)
			var educationData = dataCleanse.county_educationData(data.results.observations, educationLevels)



        	var dataSet = [data_attributes, educationData]

        	res.render('home', {dataSet: dataSet});
      	}
	 })



// API Request to retreive Unemployment Data
	// request('https://liveapi.livestories.com/observation/study/COM.POLICYMAP.US.GOV.US.DOL.BLS.EMPLOYMENT:UNEMPRATE/locale/US:ST:WA,US:ST:WA:CO:*', function (error, response, body) {
 //    	if (!error && response.statusCode == 200) {
 //        	//console.log(body) // Print the google web page.
        	
        	
 //        	var obj=JSON.parse(body);
	// 		var data=JSON.parse(JSON.stringify(obj));
			
	// 		// retrieve data set
	// 		var data_attributes = {name: data.results.study.name, description: data.results.study.description}
 //        	var observations = dataCleanse.county_level(data.results.observations);
 //        	console.log(observations)

 //        	var dataSet = [data_attributes, observations]

 //        	res.render('home', {dataSet: dataSet});
 //     	}
	// })

	// res.render('home')
})

// API Request to retreive all available data sets for easier search in sequel database

	// request('https://liveapi.livestories.com/study/*', function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		var obj=JSON.parse(body);
	// 		var rawdata= JSON.parse(JSON.stringify(obj));

	// 		// Select only applicable data sets
	// 		console.log(rawdata)
	// 		var data = dataCleanse.dataSets(rawdata.results);

	// 		data.forEach(function(item){
	// 			db.datasets.create({
	// 			  dataset_id: item.id,
	// 			  category: item.category,
	// 			  name: item.name
	// 			})
	// 		})
	// }
	// })


app.listen(3000);
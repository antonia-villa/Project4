// Require packages
require('dotenv').config();
var dataCleanse = require('./helpers/dataCleanse.js');
var express = require('express');
var db = require("../models");
var sequelize = require('sequelize')
var router = express.Router();
var request = require('request');


//SLIDV Data
// API END POINT: https://liveapi.livestories.com/observation/study/
// Study:
// Locale: US:ST:*:CO:*


router.get('/home', function(req, res){
	

// 	request('https://liveapi.livestories.com/observation/study/US.GOV.US.HHS.CDC.YRBSS:17/dimension/US.GOV.US.HHS.CDC.YRBSS:17%3EDEMO:US:RACE/locale/US:ST:*/', function (error, response, body) {
//     	if (!error && response.statusCode == 200) {
//         	//console.log(body) // Print the google web page.
        	
        	
//         	var obj=JSON.parse(body);
// 			var data=JSON.parse(JSON.stringify(obj));
// 			console.log('data')
//         	var observations = dataCleanse.state_data(data.results.observations);
//         	console.log('observations', observations)
//         	res.render('main/home');
//      	}
// })


	// One time load of all available data sets into Sequelize database
	// request('https://liveapi.livestories.com/study/*', function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		var obj=JSON.parse(body);
	// 		var rawdata= JSON.parse(JSON.stringify(obj));

	// 		// Select only applicable data sets
	// 		var data = dataCleanse.dataSets(rawdata.results);

	// 		data.forEach(function(item){
	// 			db.datasets.create({
	// 			  dataset_id: item.dataset_id,
	// 			  name: item.name
	// 			})
	// 		})
	// }
	//})
	
})


module.exports = router;
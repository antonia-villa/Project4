// Require packages
require('dotenv').config();
var dataCleanse = require('./helpers/dataCleanse.js');
var express = require('express');
var router = express.Router();
var request = require('request');


//SLIDV Data
// API END POINT: https://liveapi.livestories.com/observation/study/
// Study:
// Locale: US:ST:*:CO:*


router.get('/home', function(req, res){
	

	request('https://liveapi.livestories.com/observation/study/US.GOV.US.HHS.CDC.YRBSS:17/dimension/US.GOV.US.HHS.CDC.YRBSS:17%3EDEMO:US:RACE/locale/US:ST:*/', function (error, response, body) {
    	if (!error && response.statusCode == 200) {
        	//console.log(body) // Print the google web page.
        	
        	
        	var obj=JSON.parse(body);
			var data=JSON.parse(JSON.stringify(obj));
			console.log('data')
        	var observations = dataCleanse.state_data(data.results.observations);
        	console.log('observations', observations)
        	res.render('main/home');
     	}
})

})


module.exports = router;
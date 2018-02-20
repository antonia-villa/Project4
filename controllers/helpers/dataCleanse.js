var county_codes = require('./county_ids.js');

// Format Raw API Data for data visuals
module.exports = {
	// One time use to load all available data sources in SQL database for easier sorting and access
	dataSets: function(data){
		var datasets =[];
  
	    data.forEach(function(item){
	    	// Only include data at county level that include intervals for 2015
	    	      if(item.categories){
			        if(item.categories.length>0){
				    	var category = item.categories[0]
				    }
			      } else {
			        category = ''
			      }

    		if(item.locales.includes("US:ST:CO") && item.intervals.Y1 && item.intervals.Y1[0].includes("Y1:2015")){
      		    var child = {id: item.id, category: category, name: item.name}
      		datasets.push(child)
    	}

  	})
	  return datasets
	},

	state_data: function (data){
	  var state_level =[];
	  var state;
	  
	  data.forEach(function(item){
	      if (Object.keys(item).length >2){
	        state = item.L
	      } else{
	      if(item.I == 'Y1:2015'){
	        var child = {state: state, year:item.I.split(':')[1], value: item.V}
	        state_level.push(child)
	        state = '';
	      }
	      }
	  })
	  return state_level
	},

	county_level: function(data){
		  var county_level =[];
		  var county_code;
		  
		  // Remove beginning of object including dimension data
		  function findStart(element){
		    var size = Object.keys(element).length;
		    return size === 3;
		  }
		  var removeIndex = data.findIndex(findStart)
		  data.splice(0,16)
		  
		  // Loop through data to create new dataset
		  data.forEach(function(item){
		  	// extract county code
		      if (item.L != undefined){
		        county_code = item.L.split(':')[4]
		      } else{
		      		
		      // Select data for year 2015			    
		      if(item.I == 'Y1:2015'){
		      	if(typeof county_code !== "undefined" || county_code === ''){

		      		// Select county data from county reference documentation
		      		var county_object = county_codes.county_codes.find(function(element) {
		          		return element.county_code === county_code;
		        	});

		      		// create object
			      	var child = {county: county_code, county_name: county_object.county_name, county_TR_code: county_object.county_TR_code, year:item.I.split(':')[1], value: item.V}
			        county_level.push(child)
			        county_code = '';
		      	}    
		      }
		      
		    }
		  })
		  
		  return county_level
		}

}

// Format Raw API Data for data visuals
module.exports = {
	// One time use to load all available data sources in SQL database for easier sorting and access
	dataSets: function(data){
		var datasets =[];
  
	    data.forEach(function(item){
	    	// Only include data at county level that include intervals for 2015
    		if(item.locales.includes("US:ST:CO") && item.intervals.Y1 && item.intervals.Y1[0].includes("Y1:2015")){
      		var child = {dataset_id: item.id, name: item.name}
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
	}
}

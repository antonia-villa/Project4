
// Retrieve Minimum Value from a data set
function getMin(data) {
  return data.reduce((min, p) => p.value < min ? p.value : min, data[0].value);
}

// Retrieve Maximum Value from a data set
function getMax(data) {
  return data.reduce((max, p) => p.value > max ? p.value : max, data[0].value);
}


// For filterable D3 data visual by county code
function treeData(data){
  		var counties = [];
	  
		data.forEach(function(item){
		  
			if(!counties.includes(item.county_TR_code)){
				counties.push(item.county_TR_code)
				
			}
		});
		var final_data = []
		for(var i=0; i <counties.length; i++){
		  var child = {county:counties[i], data: []}
		  data.forEach(function(item){
		    if(item.county_TR_code === counties[i]){
		      var child2 = {
		        dimension_desc: item.dimension_desc,
		        value: item.value
		      }
		      child.data.push(child2)
		    }
		  })
		  final_data.push(child)
		}

		return final_data
}
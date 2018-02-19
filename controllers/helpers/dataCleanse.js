// Format Raw API Data for data visuals
module.exports = {
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

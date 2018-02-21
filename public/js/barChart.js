var dataObject = treeData(rawData)
var county_code;

function barChartIDClear(event){
	county_code  = ''
	$('#d3_visual2').remove();
}

function barChartVisual(event){

	// Retrieve Corresponding county code
    county_code = event.target.id
    
    // Extract data
	var dataObject2 = dataObject.find(function(element) {
		if(String(element.county) === String(county_code)){
			return element.data;
		}
	});

	// Check to see if data exists for county
	if(dataObject2){

		// Build Visual
		$('#visual2').append('<div id="d3_visual2"></div>');

		// Extract Only Data from object return
		var data = dataObject2.data
		var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];

		// Add in % of Total
		var total = 0;
		data.forEach(function(item){
			if(item.value){
		  		total += item.value
		  	}
		})


		data.forEach(function(item){
		  item.percent = (Number(item.value)/total).toFixed(2)
		})

		var formatPercent = d3.format(".0%");

	    margin = {top: 20, right: 20, bottom: 40, left: 120},
	    width = 500 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

		
	    // set ranges
	    var x = d3.scaleLinear()
          .range([0, width]);
    	var y = d3.scaleBand()
        	.range([height, 0]);
    	var xAxis = d3.axisBottom(x)
        	.ticks(10, "%");
        var yAxis = d3.axisLeft(y);
	    
	    

	    var svg2 = d3.select("#d3_visual2").append("svg")
	    //***EDIT***
	    //the data method returns the enter collection and your not ready for it yet...
	    //.data(root)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

	    data.forEach(function (d) {
	        d.percent = +d.percent
	        d.dimension_desc = d.dimension_desc
	    });

	      // Scale the range of the data in the domains
  		x.domain([0, d3.max(data, function(d){ return d.percent; })])
  		y.domain(data.map(function(d) { return d.dimension_desc; }))
  			.paddingInner(0.1)
        	.paddingOuter(0.5);



		  // append the rectangles for the bar chart
		  svg2.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		    	.attr("class", "bar")
		    	.attr("x", 0)
		    	.attr("height", y.bandwidth())
		     	.attr("y", function(d) { 
		     		return y(d.dimension_desc) })
		     	.attr("width", function(d) {return x(d.percent); } );
		     	
		    // svg2.append("text")
      //       .attr("x", 0)
      //       .attr("y", function(d) { 
		    //  		return y(d.dimension_desc) })
      //       .attr("dy", ".35em")
      //       .text(function(d) { return d.dimension_desc; })
      //       .style("fill", "red");

		 // svg2.append("text")
   //          .attr("class", "value")
   //       //    .attr("y", function(d) { 
		 //     		// return y(d.dimension_desc) })
   //          .attr("dx", '.1em') //margin right
   //          .attr("dy", ".35em") //vertical align middle
   //          .attr("text-anchor", "end")
   //          .text(function(d){
   //          	console.log(d)
   //              return y(d.dimension_desc);
   //          });
   //          // .attr("x", function(d){
   //          //     var width = this.getBBox().width;
   //          //     return Math.max(width + valueMargin, scale(d.value));
   //          // });


		  // add the x Axis
		  svg2.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  // add the y Axis
		  svg2.append("g")
		  		.attr("transform", "translate(120,0)")
		      .call(d3.axisLeft(y));
	}
}

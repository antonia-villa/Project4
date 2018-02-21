var dataObject = treeData(rawData)
console.log(dataObject)
var county_code;

function barChartIDClear(event){
	county_code  = ''
	$('#viz2_container').remove();
}

function barChartVisual(event){
	$('#viz2_container').remove();

	// Retrieve Corresponding county code
    county_code = event.target.id
    
    // Extract data
	var dataObject2 = dataObject.find(function(element) {
		if(String(element.county) === String(county_code)){
			console.log(element.data)
			return element.data;
		}
	});
	console.log('object2', dataObject2)

	// Check to see if data exists for county
	if(dataObject2){
		// Select county Name for header
		var county_info = county_ref.find(function(element) {
    		    return element.county_TR_code === String(county_code);
    	});
		
		var county_name = county_info.county_name

		// Extract Only Data from object return
		var data = dataObject2.data
		var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];


		// Fixed Data Lables
		data.forEach(function(item){
		  if(item.dimension_desc.includes("Enrolled")){
		    item.dimension_desc = item.dimension_desc.replace('Enrolled in ', '')
		    if(item.dimension_desc.includes("grade")){
		      item.dimension_desc = 'Grade: '+ item.dimension_desc.replace(/grade /g, '')
		    }
		  }
		})
		

		// Removed Enrolled in School total
		var enrolled_total;
		for(var i=0; i<data.length; i++){
  			if(data[i].dimension_desc.replace(/\s+/g, '') === "school"){
      	enrolled_total = data.splice(i, 1)
  			}
		}

		console.log(enrolled_total);

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

		// sort bars based on value
		data = data.sort(function(a,b){
			return d3.descending(a.value, b.value)
		})

		var enrolled_percent = Math.floor((Number(enrolled_total[0].value)/total)*100)
		

		// Build Visual
		$('#d3_visual2').append('<div id="viz2_container"></div>');
		$('#viz2_container').append('<h1>'+county_name+'</h1>');
		$('#viz2_container').append('<p> Of the <strong>'+total+'</strong> census respondents in 2015, '+enrolled_percent+'% reported enrollment in school.</p>')



		//set up svg using margin 
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 400 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

		 var svg2 = d3.select("#viz2_container").append("svg")
		            .attr("width", width + margin.left + margin.right)
		            .attr("height", height + margin.top + margin.bottom)
		            .append("g")
		            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
//		var tooltip = d3.select("body").append("div").attr("class", "toolTip");


		var x = d3.scaleLinear()
				.range([0, width])
				.domain([0, d3.max(data, function (d) {
                return d.percent;
            })]);

		var y = d3.scaleBand()
				.range([height, 0])
				.padding(.02)
				.domain(data.map(function (d) {
                return d.dimension_desc;
            }));

		 //make y axis to show bar names
        var yAxis = d3.axisLeft(y)
            //no tick marks
            .tickValues([]);
       

        var gy = svg2.append("g")
            .attr("class", "y axis")
            .call(yAxis)


        var bars = svg2.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .style("fill", function(d, i) { return colors[i]; })


        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.dimension_desc);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.percent);
            });

	    //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.dimension_desc) + y.bandwidth() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", 0)
            .text(function (d) {
                return d.dimension_desc;
            })
            .style("fill", "black");


	}
}

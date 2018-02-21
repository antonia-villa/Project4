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

		// sort bars based on value
		data = data.sort(function(a,b){
			return d3.descending(a.value, b.value)
		})
		console.log(data)
		//set up svg using margin 
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 400 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

		 var svg2 = d3.select("#d3_visual2").append("svg")
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
            .attr("x", function (d) {
                return x(d.percent) - 10;
            })
            .text(function (d) {
                return d.dimension_desc;
            })
            .style("fill", "red");


	}
}

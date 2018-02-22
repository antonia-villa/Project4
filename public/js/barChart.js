// Retrieve Raw Data from API and reformat
var dataObject = treeData(rawData)
console.log(titles)

// Set global county code
var county_code;

function barChartIDClear(event){
	county_code  = ''
	$('#viz2_container').remove();
}

function barChartVisual(event){
	$('#viz2_container').remove();
	$('#tooltip2').remove();

	// Retrieve Corresponding county code
    county_code = event.target.id
    
    // Extract data
	var dataObject2 = dataObject.find(function(element) {
		if(String(element.county) === String(county_code)){
			return element.data;
		}
	});
	console.log(dataObject2)
	// Check to see if data exists for county
	if(dataObject2){
		// Select county Name for header
		var county_info = county_ref.find(function(element) {
    		    return element.county_TR_code === String(county_code);
    	});
		
		var county_name = county_info.county_name

		// Extract Only Data from object return
		var data = dataObject2.data


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

		// Add in % of Total
		var total = 0;
		data.forEach(function(item){
			if(item.value){
		  		total += item.value
		  	}
		})

		data.forEach(function(item){
			if(typeof item.value === 'undefined' || !item.value){
				item.percent = 0
			} else {
				item.percent = (Number(item.value)/total).toFixed(2)		
			}
		  
		})

		// sort bars based on value
		data = data.sort(function(a,b){
			return d3.ascending(a.value, b.value)
		})

		var enrolled_percent = Math.floor((Number(enrolled_total[0].value)/total)*100)
		

		// Build Visual
		$('#d3_visual2').append('<div id="viz2_container"></div>');
		$('#viz2_container').append('<h3>School enrollment: by level</h3>')
		$('#viz2_container').append('<h4>'+county_name+": "+ county_code+ '</h4>');
		$('#viz2_container').append('<p> Of the '+total.toLocaleString()+' census respondents in 2015, '+enrolled_percent+'% reported enrollment in school.</p>')
		$('body').append('<div id="tooltip2" class="hidden"><p id="educaiton_status"></p></div>');


		//set up svg using margin 
        var margin = {
            top: 15,
            right: 5,
            bottom: 15,
            left: 5
        };

        var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
		// var width = bbox.width  - margin.left - margin.right,
		// 	height = bbox.height - margin.top - margin.bottom;

		var height2 = (bbox.height/2) - margin.top - margin.bottom;

		var bbox2 = d3.select("#d3_visual2").node().getBoundingClientRect()
		var width2 = (bbox2.width/2)  - margin.left - margin.right;

		 var svg2 = d3.select("#viz2_container").append("svg")
		            .attr("width", width2 + margin.left + margin.right)
		            .attr("height", height2 + margin.top + margin.bottom)
		            .append("g")
		            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
var colors = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemePurples[9]);


		var x = d3.scaleLinear()
				.range([0, width2])
				.domain([0, d3.max(data, function (d) {
                return d.percent;
            })]);

		var y = d3.scaleBand()
				.range([height2, 0])
				.padding(.2)
				.domain(data.map(function (d) {
                return d.dimension_desc;
            }));

		 //make y axis to show bar names
        var yAxis = d3.axisLeft(y)
            //no tick marks
            
            .tickValues([])
            
       

        var gy = svg2.append("g")
            .attr("class", "yaxis")
            .call(yAxis)
            


        var bars = svg2.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .style("fill", function(d,i){
            	return colors(i)
            })


        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("id", function (d) {
                return y(d.dimension_desc);
            })
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
                return y(d.dimension_desc) + y.bandwidth() / 2+6;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", 0)
            .text(function (d) {
            	var html = Math.floor(d.percent*100) + '%'
                return html;
            })
            .on("mouseover", function(d){
              
            var xPosition = width2/2;
            var yPosition = height/2;
            d3.select("#tooltip2")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");

            d3.select("#educaiton_status")
            // .text(d.properties.NAME );
            .html(d.dimension_desc);

            d3.select("#tooltip2")
            .classed("hidden", false);
            })
            .on("mouseout", function(){
            d3.select("#tooltip2").classed("hidden", true);
            });


	}
}

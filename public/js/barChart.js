// Retrieve Raw Data from API and reformat

console.log(titles)

// Set global county code
var county_code;

function barChartIDClear(){
	county_code  = ''
	$('#viz2_container').remove();
}




function barChartVisual(event, rawData){
	$('#viz2_container').remove();

	var dataObject = treeData(rawData)

	// Retrieve Corresponding county code
    county_code = event.target.id
    
    // Extract data
	var dataObject2 = dataObject.find(function(element) {
		if(String(element.county) === String(county_code)){
			return element.data;
		}
	});
	// Check to see if data exists for county
	if(dataObject2) {
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

		console.log(data);

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
		var unenrolled = data.find(o => o.dimension_desc === 'Not enrolled in school');
		var unenrolled_percent = Math.floor(unenrolled.percent*100)
		

		// Build Visual
		$('#d3_visual2').append('<div id="viz2_container"></div>');
		$('#viz2_container').append('<button onclick="barChartIDClear()" id="close">x</button>')
		$('#viz2_container').append('<div id="visualHeader"></div>');
		$('#viz2_container').append('<div id="barChart"></div>');
		$('#visualHeader').append('<h3 id="barChartHeader">School Enrollment (2015)</h3>')
		$('#visualHeader').append('<h3 id="barChartSubHeader">' +county_name +' County</h3>'+"<hr/>");

		
		$('#visualHeader').append('<p> Of the <strong>'+total.toLocaleString()+' </strong> census respondents in '+county_name+' county, <strong>'+enrolled_percent+'%</strong> reported enrollment with <strong>'+unenrolled_percent+'%</strong> not enrolled.</p>')



		//set up svg using margin 
        var margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 0
        };
        var axisMargin = 20,
        	valueMargin = 2;

        var bbox = d3.select("#barChart").node().getBoundingClientRect()
		// var width = bbox.width  - margin.left - margin.right,
		// 	height = bbox.height - margin.top - margin.bottom;

		var height2 = (bbox.height) - margin.top - margin.bottom;
		var width2 = (bbox.width)  - margin.left - margin.right;

		var svg2 = d3.select("#barChart").append("svg")
		            .attr("width", width2 + margin.left + margin.right)
		            .attr("height", height2 + margin.top + margin.bottom)
		            .append("g")
		            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		

		var x = d3.scaleLinear()
				.range([0, width2])
				.domain([0, 1]);

		var y = d3.scaleBand()
				.range([height2, 0])
				.padding(.1)
				.domain(data.map(function (d) {
                return d.dimension_desc;
            }));

		 //make y axis to show bar names
        var yAxis = d3.axisLeft(y)
            .tickValues([])

            var tool2 = d3.select("body")
            .append("div")
            .attr("class", "toolTip2");
            
        var gy = svg2.append("g")
            .attr("class", "yaxis")
            .call(yAxis)


        var bars = svg2.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .on("mouseover", function(d){
            	console.log(d)
		        tool2.style("left", d3.event.pageX + 10 + "px")
		        tool2.style("top", d3.event.pageY - 20 + "px")
		        tool2.style("display", "inline-block")
		          .html("<span id='title'>" + d.dimension_desc + "</span><hr/>"+"<br/>" + "<strong>Respondents: </strong>" + d.value.toLocaleString()+"<br/>"+"<strong>Percent: </strong>"+ Math.floor(Number(d.percent)*100)+"%");
		      })
		      .on("mouseout", function(){
		          tool2.style("display", "none");
		      });
           

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("id", function (d) {
                return d.dimension_desc;
            })
            .attr("y", function (d) {
                return y(d.dimension_desc);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.percent);
            })


        bars.append("text")
            .attr("class", "value")
            .attr("y", function (d) {
                return y(d.dimension_desc) + y.bandwidth() / 2
            })
            // .attr("dx", 0) //margin right
            .attr("dy", ".35em") //vertical align middle
            // .attr("text-anchor", "end")
            .text(function(d){
                var html = Math.floor(d.percent*100) + '%'
                return html;
            })
                        //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.percent) + 3;
            })

            // .attr("x", function(d){
            //     var width = this.getBBox().width;
            //     return Math.max(width + valueMargin, x(d.percent));
            // });

	  }
}
// // D3 Map Visual

// // Get Screen bounding box height and width
// var bbox = d3.select("#firstRow").node().getBoundingClientRect()
// var width = bbox.width 
// var height = bbox.height
// console.log(height)


// var visual = d3.select("#d3_visual")
//   .append("svg")
//   .attr("width", width )
//   .attr("height", height)

// Retrieve data from API
// var rawData = dataSet

// Define funcitons to find min and max of data set
// var minValue = getMin(rawData)
// var maxValue = getMax(rawData)
// var step = (maxValue-minValue)/7

var w = 400
var h = 700


// create color range based on Min,Max and Step Value
// var employment_domain = [minValue,0,0,0,0,0,0,0];
// for(var i=1; i< employment_domain.length; i++){
//   var tmp = (employment_domain[i-1] + step)
//   employment_domain[i]= tmp
// }
// console.log('domain', employment_domain)

// var employment_color = d3.scaleThreshold()
//   .domain(employment_domain)
//   .range(d3.schemeBlues[7])


var employment_color = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeBlues[9]);


//Create SVG
      var svg = d3.select("#d3_visual")
              .append("svg")
              .attr("width", w)
              .attr("height", h)


var path = d3.geoPath();

// Create variable to hold data 
// Dictionary of key value pairs {id: value} --> {censusBlockID: value}
var employmentData = d3.map();

// used to asynchronously load topojson maps and data
d3.queue()
  .defer(d3.json, "../maps/all_washington_counties.json") // load in topoJSON map data
  //
  .defer(d3.csv, "../js/unemployment_data.csv", function(d){
    employmentData.set(d.county_TR_code, +d.value)
  })
  .await(ready) // create callback function 

// Callback function
// data refers to everything being passed from d3.queue
function ready(error, data){
  if (error) throw error;

  // if no error returned retrieve data from topojson file
  // used to refer to the features of the county data
  var county_data = topojson.feature(data, {
    type:"GeometryCollection",
    geometries: data.objects.washing_counties.geometries
  });

  // identify projection and path
  var projection = d3.geoAlbersUsa()
    .fitExtent([[20,20], [460, 580]], county_data) // assigns ([padding], [width and height], dataObject)

    // define path
  var geoPath = d3.geoPath()
      .projection(projection)

    // draw map
    svg.selectAll("path")
      .data(county_data.features) //pass in data
      .enter()
      .append("path")
      .attr("d", geoPath) // pass in geoPath object created
      .attr("id", function(d) { return d.properties.GEOID })
      .attr("fill", function(d) { return employment_color(d.value = employmentData.get(d.properties.GEOID)); })
   .attr("d", geoPath)
            .on("mouseover", function(d){
              console.log(d)
            var xPosition = w/2 + 150;
            var yPosition = h/2;
//            var xPosition = parseFloat(path.centroid(this).attr("cx"));
//            var yPosition = parseFloat(path.centroid(this).attr("cy"));
            d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");

            d3.select("#county")
            // .text(d.properties.NAME );
            .html("County: " +  d.properties.NAME);

            d3.select("#rate")
            // .text(d.properties.NAME );
            .html("Unemployment: " + d.value + "%");


            d3.select("#tooltip")
            .classed("hidden", false);
            })
            .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true);
            });
   


}


// // D3 Map Visual

var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
var width = bbox.width 
var height = bbox.height



var employment_color = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeGreys[9]);


//Create SVG
      var svg = d3.select("#d3_visual")
              .append("svg")
              .attr("width", width )
              .attr("height", height)
              .attr("transform", "rotate(-14)")


var path = d3.geoPath();

// Create variable to hold data 
// Dictionary of key value pairs {id: value} --> {censusBlockID: value}
var employmentData = d3.map();

// used to asynchronously load topojson maps and data
d3.queue()
  .defer(d3.json, "../maps/washington_counties.json") // load in topoJSON map data
  //
  .defer(d3.csv, "../rawData/unemployment_data.csv", function(d){
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
    .fitExtent([[20,20], [width, height]], county_data) // assigns ([padding], [width and height], dataObject)

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
      .attr("onclick", "barChartVisual(event)")
      // .attr("onmouseout", "barChartIDClear(event)")
      .attr("fill", function(d) { return employment_color(d.value = employmentData.get(d.properties.GEOID)); })
   .attr("d", geoPath)
            .on("mouseover", function(d){
              
            var xPosition = width/2 + 150;
            var yPosition = height/2;
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


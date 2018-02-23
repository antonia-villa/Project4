// // D3 Map Visual

// To create Responsive Visual use BoundingClientRect
var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
var width = bbox.width *1.3
var height = (bbox.height*1) - 80



// Assign employment colors
var employment_color = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeGreys[9])

// Move graph over to center image
var translate_value = width/8

//Create SVG
var svg = d3.select("#d3_visual")
        .append("svg")
        .attr("width", width )
        .attr("height", height)
        .attr("transform", "translate(-"+translate_value+",0) rotate(-14)")

var path = d3.geoPath();
// Append Div for tool tip
//Append Tooltip
var tool = d3.select("body")
            .append("div")
            .attr("class", "toolTip");

// Create variable to hold data 
// Dictionary of key value pairs {id: value} --> {censusBlockID: value}
var employmentData = d3.map();

// used to asynchronously load topojson maps and data
d3.queue()
  .defer(d3.json, "../maps/washington_counties.json") // load in topoJSON map data
  .defer(d3.csv, "../rawData/unemployment_data.csv", function(d){
    employmentData.set(d.county_TR_code, +d.value)
  })
  .await(ready) // create callback function 

// Callback function
// data refers to everything being passed from d3.queue
function ready(error, data){
  if (error) throw error;

  // used to refer to the features of the county data
  var county_data = topojson.feature(data, {
    type:"GeometryCollection",
    geometries: data.objects.washing_counties.geometries
  });

  // identify projection and path
  var projection = d3.geoAlbersUsa()
    .fitExtent([[20,20], [width, height]], county_data) 

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
      .attr("onclick", "barChartVisual(event, rawData)")
      // .attr("onmouseout", "barChartIDClear(event)")
      .attr("fill", function(d) { return employment_color(d.value = employmentData.get(d.properties.GEOID)); })
      .attr("stroke", "white")
      .attr("d", geoPath)
      .on("mouseover", function(d){
        
        tool.style("left", d3.event.pageX + 10 + "px")
        tool.style("top", d3.event.pageY - 20 + "px")
        tool.style("display", "inline-block")
          .html("<span class='bold'> County: </span>" +  d.properties.NAME+ "<br/><span class='bold'>" + "Unemployment Rate: </span>" + d.value + "%");
      })
      .on("mouseout", function(){
          tool.style("display", "none");
      });
}


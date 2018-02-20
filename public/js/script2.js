// // D3 Map Visual

// // Get Screen bounding box height and width
// var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
// var width = bbox.width 
// var height = bbox.height


// var visual = d3.select("#d3_visual")
//   .append("svg")
//   .attr("width", width )
//   .attr("height", height)

// Retrieve data from API
var rawData = dataSet

// Define funcitons to find min and max of data set
var minValue = getMin(rawData)
var maxValue = getMax(rawData)
var step = (maxValue-minValue)/7
     var w = 760;
      var h = 600;

// create color range based on Min,Max and Step Value
var employment_domain = [minValue,0,0,0,0,0,0,0];
for(var i=1; i< employment_domain.length; i++){
  var tmp = (employment_domain[i-1] + step)
  employment_domain[i]= tmp
}
console.log('domain', employment_domain)

var employment_color = d3.scaleThreshold()
  .domain(employment_domain)
  .range(d3.schemeBlues[7])


var svg = d3.select("svg");
var path = d3.geoPath();

// Create variable to hold data 
// Dictionary of key value pairs {id: value} --> {censusBlockID: value}
var employmentData = d3.map();

// used to asynchronously load topojson maps and data
d3.queue()
  .defer(d3.json, "../maps/wa_counties.json") // load in topoJSON map data
  //
  .defer(d3.tsv, "../js/unemployment_data_2.csv", function(d){
    
    employmentData.set(d.county, +d.value) // (first refers to county code, second refers to employment value)
  } ) // load in data
  .await(ready) // create callback function

// Callback function
function ready(error, data){
  if (error) throw error;
  console.log(data)
  // if no error returned retrieve data from topojson file
  // used to refer to the features of the county data
  //var county_data = topojson.feature(data, data.objects.collection).features.filter(function(d) { return d.properties.state_fips == 53; })
  // identify projection and path
     var projection = d3.geoMercator()
                   .center([ -120, 37 ])
                   .translate([ w/2, h/2 ])
                   .scale([ w*3.3 ]);
    // define path
    var geoPath = d3.geoPath()
      .projection(projection)

    // draw map
    d3.select("svg.main_data_point").selectAll("path")
      .data(topojson.feature(data, data.objects.collection).features.filter(function(d) { return d.properties.state_fips == 53; })) //pass in data
      .enter()
      .append("path")
      .attr("d", geoPath) // pass in geoPath object created
      .attr("fill", function(d){
        return employment_color(d.value = employmentData.get(d.properties.COUNTYFP)); // pass in employement value and ID from topoJSON map
      }) // fill in the data


}


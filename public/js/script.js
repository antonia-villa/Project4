// // D3 Map Visual

// // Get Screen bounding box height and width
// var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
// var width = bbox.width 
// var height = bbox.height


// var visual = d3.select("#d3_visual")
//   .append("svg")
//   .attr("width", width )
//   .attr("height", height)

var svg = d3.select("svg");
var path = d3.geoPath();

// Create variable to hold data 
// Dictionary of key value pairs {id: value} --> {censusBlockID: value}
var data = d3.map();

// used to asynchronously load topojson maps and data
d3.queue()
.defer(d3.json, "../maps/wa_counties.json") // load in topoJSON map data
// .defer() // load in data
.await(ready) // create callback function

// Callback function
function ready(error, data){
  if (error) throw error;

  // if no error returned retrieve data from topojson file
  // used to refer to the features of the county data
  var county_data = topojson.feature(data, {
    type:"GeometryCollection",
    geometries: data.objects.tl_2016_53_tract.geometries
  });

  // identify projection and path
  var projection = d3.geoAlbersUsa()
    .fitExtent([[20,20], [460, 580]], county_data) // assigns ([padding], [width and height], dataObject)

    // define path
    var geoPath = d3.geoPath()
      .projection(projection)

    // draw map
    d3.select("svg.main_data_point").selectAll("path")
      .data(county_data.features) //pass in data
      .enter()
      .append("path")
      .attr("d", geoPath) // pass in geoPath object created
      .attr("fill", "blue") // fill in the data


}


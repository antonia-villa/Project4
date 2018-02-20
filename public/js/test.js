

      //Width and height
      var w = 760;
      var h = 600;

      //Define map projection
      var projection = d3.geoMercator()
                   .center([ -120, 37 ])
                   .translate([ w/2, h/2 ])
                   .scale([ w*3.3 ]);

      //Define path generator
      var path = d3.geoPath()
               .projection(projection);

      //Create SVG
      var svg =  d3.select("#container")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      //Load in GeoJSON data
      d3.json("../maps/all_states.json", function(json) {
        console.log(json);
        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
          .data(topojson.feature(json, json.objects.collection).features.filter(function(d) { return d.properties.state_fips == 53; }))
          .enter()
          .append("path")
          .attr("d", path)
            .on("mouseover", function(d){
            var xPosition = w/2 + 150;
            var yPosition = h/2;
//            var xPosition = parseFloat(path.centroid(this).attr("cx"));
//            var yPosition = parseFloat(path.centroid(this).attr("cy"));
            d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");
            d3.select("#county")
            .text(d.properties.NAME);
            d3.select("#tooltip")
            .classed("hidden", false);
            })
            .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true);
            });
    
      });
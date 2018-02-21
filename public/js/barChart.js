var dataObject = treeData(rawData)
var county_code;

function barChartIDClear(event){
	county_code  = ''
	$('#d3_visual2').remove();
}

function barChartVisual(event){

	$('#visual2').append('<div id="d3_visual2"></div>');
    county_code = event.target.id
    


var dataObject2 = dataObject.find(function(element) {
	if(String(element.county) === String(county_code)){
		return element.data;
	}
});

var data = dataObject2.data
console.log(data)



    margin = {top: 20, right: 20, bottom: 200, left: 40},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,



    x = d3.scaleBand().rangeRound([0, width]).padding(.05),

    y = d3.scaleLinear().range([height, 0]),

    xAxis = d3.axisBottom()
    .scale(x)
    
   

    yAxis = d3.axisLeft()
    .scale(y)
    
    

    svg2 = d3.select("#d3_visual2").append("svg")
    //***EDIT***
    //the data method returns the enter collection and your not ready for it yet...
    //.data(root)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    //d3.json

    //d3.csv("bar-data.csv", function(error, data) {
    //d3.selectAll('g').data(function(data){

    data.forEach(function (d) {

        //NOW is parsing the date and time
        d.dimension_desc = d.dimension_desc;

        d.value = +d.value;
    });

    x.domain(data.map(function(d) { return d.dimension_desc; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    svg2.selectAll("bar")
        .data(data)
    .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.dimension_desc); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

}

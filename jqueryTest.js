var branch1,
	branch2,  
	branch3,
	branch4,
	branch5,
	branch6,
	branch7 
	remaining = 7;

d3.json("jqueryMaster.json", function (error,json){
	if (error) return console.warn(error);
	branch1 = json;
	if (!-- remaining) doSomething();
	//console.log(master); 
});



d3.json("jquerycommitplease.json", function (error,json){
	if (error) return console.warn(error);
	branch2 = json;
	if (!-- remaining) doSomething();
	//console.log(master); 
});


d3.json("jquery18-stable.json", function(error, json){
	if (error) return console.warn(error);
	branch3 = json;
	if (!--remaining) doSomething(); 
	//console.log(new_themes);
});



d3.json("jquery19-stable.json", function(error, json){
	if (error) return console.warn(error);
	branch4 = json;
	if (!--remaining) doSomething();
	//console.log(new_theme_setup.index); 
});

d3.json("jquerybug_14683.json", function(error, json){
	if (error) return console.warn(error);
	branch5 = json;
	if (!--remaining) doSomething();
	//console.log(new_theme_setup.index); 
});

d3.json("jquery1xmaster.json", function(error, json){
	if (error) return console.warn(error);
	branch6 = json;
	if (!--remaining) doSomething();
	//console.log(new_theme_setup.index); 
});

d3.json("jquerydelegation.json", function(error, json){
	if (error) return console.warn(error);
	branch7 = json;
	if (!--remaining) doSomething();
	//console.log(new_theme_setup.index); 
});

function doSomething() {

var data = [];

branch1.forEach(function(d){
	d.branch = 1;
	//d.branchName = "Master";
	data.push(d);});

branch2.forEach(function(d){
	d.branch = 2;
	//d.branchName = "Libre";
	data.push(d);});
		
branch3.forEach(function(d){
	d.branch = 3;
	//d.branchName = "Memory";
	data.push(d);});
	
branch4.forEach(function(d){
	d.branch = 4;
	//d.branchName = "gh-pages";
	data.push(d);});
	//console.log(d.branch);
	
branch5.forEach(function(d){
	d.branch = 5;
	//d.branchName = "gh-pages";
	data.push(d);});
	//console.log(d.branch);
	
branch6.forEach(function(d){
	d.branch = 6;
	//d.branchName = "gh-pages";
	data.push(d);});
	//console.log(d.branch);
	
branch7.forEach(function(d){
	d.branch = 7;
	//d.branchName = "gh-pages";
	data.push(d);});
	//console.log(d.branch);



var width = 2000,
    height = 1000;

var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("marker-end", "url(#end)");
            
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var fill = d3.scale.category10();

var graph = {nodes:[], links:[]};



graph.nodes = data;



graph.nodes.map(function(d,i){ //regular nodes
	graph.nodes.map(function(e,j) { //parent nodes
	  if (i!=j){
	  		for (var k = 0;k<e.parents.length;k++){
		  if (e.parents[k].sha == d.sha) {
			  graph.links.push({"source":j,"target": i})
		  }
	  }}
	})})

//
graph.nodes.map(function(d,i) {
	
	
})

var dates = [];


graph.nodes.forEach(function(d,i){
	dates.push(graph.nodes[i].commit.author.date);
})

var datesParse = [];
dates.forEach(function(d){datesParse.push(Date.parse(d))});

//console.log(datesParse);
console.log(graph.nodes[0]);


			




// Generate the force layout
var force = d3.layout.force()
    .size([width, height])
    .charge(-50)
    .linkDistance(10)
    .on("tick", tick)
    .on("start", function(d) {})
    .on("end", function(d) {})

function tick(d) {

  graph_update(0);
}

function random_layout() {
  
  force.stop();

  graph.nodes.forEach(function(d, i) {
    d.x = width/4 + 2*width*Math.random()/4;
    d.y = height/4 + 2*height*Math.random()/4;
  })
  
  graph_update(500);
}

function force_layout() {

 force.nodes(graph.nodes)
      .links(graph.links)
      .start();
}

function line_layout() {

  force.stop();

  
  graph.nodes.forEach(function(d, i) {
    d.y = 100 + d.branch*20
    d.x = (i*10);
  })

  graph_update(500);
}

function line_cat_layout() {

  force.stop();

  var timeScale = d3.time.scale()
  						.domain(d3.extent(datesParse))
  						.range([50,1000]);
  						
  
  graph.nodes.forEach(function(d,i){
    d.y = height/2;
    d.x = timeScale(Date.parse(d.commit.author.date)+100000); 
  });

  graph_update(500);
}


function branch_layout() {

  force.stop();
 						
    var timeScale = d3.time.scale()
  						.domain(d3.extent(datesParse))
  						.range([50,1000]);
  						
  	var branches = [
  				{"branchName": "Master","branchNum":1},
				{"branchName":"Libre", "branchNum":2},
				{"branchName": "Memory","branchNum":3},
				{"branchName":"gh-pages","branchNum":4}
				];
	
  	var headerDiv = d3.select("body")
  					  .data(branches)
  					  .enter()
  					  .append("div")
					  .attr("class","branch-name")
					  .attr("x", 25)
					  .attr("y", function (d) {return d.branchNum + 500;})
					  .attr("text",function(d) { return d.branchName}); 
  
  graph.nodes.forEach(function(d,i){
    d.y = height/2 + d.branch*50 ;
    d.x = timeScale(Date.parse(d.commit.author.date)+100000); 
  });

  graph_update(500);
}



function radial_layout() {

  force.stop();

  var r = height/2;

  var arc = d3.svg.arc()
          .outerRadius(r);

  var pie = d3.layout.pie()
  .sort(function(a, b) { return a.cat - b.cat;})
          .value(function(d, i) { return 1; }); // equal share for each point

  graph.nodes = pie(graph.nodes).map(function(d, i) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.data.x = arc.centroid(d)[0]+height/2;
    d.data.y = arc.centroid(d)[1]+width/2;
    d.data.endAngle = d.endAngle; 
    d.data.startAngle = d.startAngle; 
    return d.data;
  })

  graph_update(500);
}

function category_color() {
  d3.selectAll("circle").transition().duration(500).style("fill", function(d) { return fill(d.branch); });
}

function category_size() {
  d3.selectAll("circle").transition().duration(500).attr("r", function(d) { return Math.sqrt((d.cat+1)*10); });
}

function graph_update(delay) {

  link.transition().duration(delay)
      .attr("x1", function(d) { return d.target.x; })
      .attr("y1", function(d) { return d.target.y; })
      .attr("x2", function(d) { return d.source.x; })
      .attr("y2", function(d) { return d.source.y; });

  node.transition().duration(delay)
      .attr("transform", function(d) { 
        return "translate("+d.x+","+d.y+")"; 
      });
}

d3.select("input[value=\"force\"]").on("click", force_layout);
d3.select("input[value=\"random\"]").on("click", random_layout);
d3.select("input[value=\"line\"]").on("click", line_layout);
d3.select("input[value=\"line_cat\"]").on("click", line_cat_layout);
d3.select("input[value=\"radial\"]").on("click", radial_layout);
d3.select("input[value=\"branch\"]").on("click", branch_layout);

d3.select("input[value=\"nocolor\"]").on("click", function() {
  d3.selectAll("circle").transition().duration(500).style("fill", "#66CC66");
})

d3.select("input[value=\"color_cat\"]").on("click", category_color);

d3.select("input[value=\"nosize\"]").on("click", function() {
  d3.selectAll("circle").transition().duration(500).attr("r", 5);
});

d3.select("input[value=\"size_cat\"]").on("click", category_size);

var link = svg.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")

var div = d3.select("body")
			.append("div")
			.attr("class","tooltip")
			.style("opacity", 0);
			
		
var node = svg.selectAll(".node")
              .data(graph.nodes)
              .enter()
              .append("g").attr("class", "node")
              .style("fill", function(d){return fill(d.branch)});

var formatTime = d3.time.format("%e %B %Y");


node.append("circle")
    .attr("r", 5)
    .on("mouseover", function(d) {
	              	div.transition()
	              	   .duration(200)
	              	   .style("opacity", .9);
	              	div.html("User: " + d.author.login + "<br/>" + "SHA:" + d.sha + "<br/>" + 								"Comment: " + d.commit.message + "<br/>" + "Branch: " + d.branchName )
	              		.style("left", (d3.event.pageX) + "px")
	              		.style("top", (d3.event.pageY - 28) + "px");
	              		})
	          .on("mouseout", function(d) { 
	          		div.transition()
	          			.duration(500)
	          			.style("opacity", 0);
	          			});

force_layout();

};
var master,
	new_themes,  
	new_theme_setup, 
	remaining = 3;

d3.json("master.json", function (error,json){
	if (error) return console.warn(error);
	master = json;
	if (!-- remaining) doSomething();
	//console.log(master); 
});



d3.json("new-themes.json", function(error, json){
	if (error) return console.warn(error);
	new_themes = json;
	if (!--remaining) doSomething(); 
	//console.log(new_themes);
});



d3.json("new-theme-setup.json", function(error, json){
	if (error) return console.warn(error);
	new_theme_setup = json;
	if (!--remaining) doSomething();
	//console.log(new_theme_setup.index); 
});

function doSomething() {

var data = [];

master.forEach(function(d){
	d.branch = 0;
	data.push(d);});
	
new_themes.forEach(function(d){
	d.branch = 1;
	data.push(d);});
	
new_theme_setup.forEach(function(d){
	d.branch = 2;
	data.push(d);
	//console.log(d.branch);
});



var width = 900,
    height = 700;

var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

var fill = d3.scale.category10();

var graph = {nodes:[], links:[]};

var nb_nodes = 100, nb_cat = 10;

graph.nodes = data;

console.log(graph.nodes[0].parents[0].sha);
console.log(graph.nodes[7].parents[0].sha);
console.log(graph.nodes[7].parents[1].sha);
console.log(graph.nodes[7].parents.length);
//console.log(data.forEach(function (d) {return d.index;}));

//graph.nodes = d3.range(nb_nodes).map(function() {  
  //return { cat:Math.floor(nb_cat*Math.random()) }; 
//})


/*
var parentCount = function(){for (i=1;i <= e.parents.length; i++) 
								{return i;}}

*/


/*
graph.nodes.map(function(d,i){ //regular nodes
	graph.nodes.map(function(e,j) { //parent nodes
		e.parents.map(function(f,k){ //potential 2nd parent nodes
			if (i!=j){ //if the two nodes are not the same node
				if (d[i].parents[0].sha == f[k].sha)
					graph.links.push({"source":i,"target":j})//push the link's source and target attributes
					if (d[i].sha == f[k].parents[parentCount()].sha 
							&& j != k) { 
						//if there is more than one parent (i.e. if graph.nodes.parents.length > 0)
						graph.links.push({"source":i, "target":k}) //push those targets
					} 	
				}
			}
		})
	})
	
})
*/




graph.nodes.map(function(d,i){ //regular nodes
	graph.nodes.map(function(e,j) { //parent nodes
	  if (i!=j){
	  		for (var k = 0;k<e.parents.length;k++){
		  if (e.parents[k].sha == d.sha) {
			  graph.links.push({"source":i,"target": j})
		  }
	  }}
	})})
console.log(graph.links.length)

/*
		e.parents.map(function(f,k){ //potential 2nd parent nodes
			if (i!=j){ //if the two nodes are not the same node
				
				//console.log(d.parents[0].sha);
				
				if (d.sha == e.parents[0].sha) { //if the d node's sha matches the e node's 1st parent
						graph.links.push({"source":i,"target":j})//push the link's source and target attributes
					var parentCount = function(){for (i=1;i <= e.parents.length; i++) {return i;}}
					if (d.sha == f.parents[parentCount].sha && j != k) { 
						//if there is more than one parent (i.e. if graph.nodes.parents.length > 0)
						graph.links.push({"source":i, "target":k}) //push those targets
					} 	
				}
			}
		})
	})
	
})
*/

/*
graph.nodes.map(function(d, i) {
  graph.nodes.map(function(e, j) {
    if(Math.random()>.99 && i!=j)
      graph.links.push({"source": i, "target": j})

  })
})
*/

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
    d.y = height/2;
  })

  graph_update(500);
}

function line_cat_layout() {

  force.stop();

  graph.nodes.forEach(function(d, i) {
    d.y = height/2 + d.cat*20;
  })

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
  d3.selectAll("circle").transition().duration(500).style("fill", function(d) { return fill(d.cat); });
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

d3.select("input[value=\"nocolor\"]").on("click", function() {
  d3.selectAll("circle").transition().duration(500).style("fill", "#66CC66");
})

d3.select("input[value=\"color_cat\"]").on("click", category_color);

d3.select("input[value=\"nosize\"]").on("click", function() {
  d3.selectAll("circle").transition().duration(500).attr("r", 5);
})

d3.select("input[value=\"size_cat\"]").on("click", category_size);

var link = svg.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")

var node = svg.selectAll(".node")
              .data(graph.nodes)
            .enter()
              .append("g").attr("class", "node");

node.append("circle")
    .attr("r", 5)

force_layout();

};
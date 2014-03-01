1. Which graph-related tasks does an ideal GitHub Network Graph need to address?

	An ideal network graph would succinctly show the progressional path of the project at a macro level, but have interactivity features
	that allow the user to access more detailed, micro information about the repository. 
	
	The macro-level view, which would appear upon page load, would show the branching/merging of the project since the projects inception.
	I don't think that nodes representing commits or contributor data are necessary at this level. This would allow users to see the
	different branches that have been tested/merged with the master, and if they are interested in a specific branch/merge they could zoom 
	into a smaller scale to reveal the contributor and commit data. Different branches would be illustrated by different position on the y-
	axis, with lines connecting the commits. So the master branch would be on y=0 with branches spouting above or below on arbitrarily (but
	visually clear) different y-axis positions. The x-axis would indicate time from left to right (past to present).
	
	When zooming in, the individual nodes would become visible. If many commits occur on the same date, they would be aggregated into a
	larger (circle area) node.  The individual commits would then be accessible by hovering over the node to reveal a tooltip that shows the
	meta data for each commit encompassed by the larger node. 

2. Get back to the GitHub network visualization you implemented and test it with the following projects on GitHub: D3, jQuery and
	Bootstrap. There's a lot more data, but the interaction patterns of users are also very different. What do you notice about the three
	repositories?
	
	The three larger repositories have many more duplicate commits across branches which makes the visualization hard to read/interperet. 

3.How does this impact your graph?

	It makes the graphs very cluttered.
	
	
4.How would you improve your visualization to address issues with the larger and more complex data?

	See question 1. 
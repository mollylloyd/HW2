Contributors to A Repo:

	1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
	
	Contributor, project manager, visitor
	
	2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries 	   and their processing).
	
	The visualized data shows both the total number of commits with respect to time (i.e. frequency), and the frequency of commits by 
	contributor. This data can be found in the github API by calling commits, then commit.committer which contains information about 		both the contributor and the date of contribution. 
	
	The visualization can also be sorted by additions/deletions by user, and this data can be found by calling:
	GET /repos/:owner/:repo/stats/contributors. This includes number of additions, deletions and commits by week. This could also be 		used for the above graph, as long as the frequency needed is no finer than weekly.
	
	3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? 	   How would you address this particular issue?
	
	The visualization would not be compromised if a contributor pushed a high frequency of commits in a short time because this would be 	shown in the graph as a period of high activity (marked by the visual variable of height in the graph).
	
==================

Commits Activity:
	1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
	
	Contributor, project manager
	
	2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries 	   and their processing).
	
	This data is the number of commits by week, which can be accessed by calling GET /repos/:owner/:repo/stats/commit_activity
	This returns both the total number of commits by week (which is used in the visualization), as well as total commits broken down by 	day of the week.
	
	3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? 	   How would you address this particular issue?
	
	The visualization would not be compromised if a contributor pushed a high frequency of commits in a short time because this would be 	shown in the graph as a period of high activity (marked by the visual variable of height in the graph).

=================
	
Code Frequency:
	1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
	
	Contributor, project manager
	
	2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries 	   and their processing).
	
	This data is the number of additions/deletions by week, which can be accessed by calling:
	GET /repos/:owner/:repo/stats/code_frequency
	
	3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? 	   How would you address this particular issue?
	
	The visualization would not be compromised if a contributor pushed a high frequency of commits in a short time because this would be 	shown in the graph as a period of high activity (marked by the visual variable of height in the graph).
		
=================
	
Punch Card:
	1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
	
	Visitor, project manager
	
	2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries 	   and their processing).
	
	This data is aggregates the frequency of commits by day of the week and time of day. Not sure why anyone would care about this 			information other than a curious data nerd. It can be accessed in the github API by calling:
	GET /repos/:owner/:repo/stats/punch_card
	
	3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? 	   How would you address this particular issue?
	
	The visualization would not be compromised if a contributor pushed a high frequency of commits in a short time because this would be 	shown in the graph as a period of high activity (marked by the visual variable of circle area in the graph).
	
=================
	
Calendar:
	1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
	
	The user being profiled, curious people
	
	2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries 	   and their processing).
	
	This data shows the frequency of commits by user across all the repos contributed to by the user by month (on the horizontal axis) and 	day of the week (on the vertical axis).
	
	This data can be found by first querying "https://api.github.com/users/userName/repos", and subsequently querying all the repos from 	the first query using: GET /repos/:owner/:repo/stats/contributors/userName to access the daily commit frequency by user
	
	3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? 	   How would you address this particular issue?
	
	The visualization would not be compromised if a contributor pushed a high frequency of commits in a short time because this would be 	shown in the graph as a period of high activity (marked by the visual variable of color value in the graph).
	
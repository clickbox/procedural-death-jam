(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();
	
	// Pillar with circling patroller
	var partial = new Partial([2], 2); 
	partial.addThreats(2, function() {
		this.patroller(40,360)
			.to(40, 360 - 80)
			.to(40 + 80, 360 - 80)
			.to(40 + 80, 360)
			.to(40, 360);
	});
	partial.addCoins(1, function() {
		this.col(40, 200, 340);
		this.row(200, 60, 340);
	});
	
	var grid = Level.q2();
	grid.fill(1,3,5,2,2);
	grid.fill(2,1,4,2,5); // the patroller plus a bit of its path
	partial.addSection(grid, 0, 10);

	levelData.add(partial);

	// Onion halls with dual looping patroller
	partial = new Partial([3], 0);
	partial.addThreats(4, function() {
		this.patroller(360, 360)
			.to(360, 360 - 80)
			.to(360 - 80, 360 - 80)
			.to(360 - 80, 360)
			.to(360, 360)
			.to(360, 360 - 160)
			.to(360 - 160, 360 - 160)
			.to(360 - 160, 360)
			.to(360, 360);
	});

	grid = Level.q3();
	grid.fill(1,5,5,2,2);
	grid.fill(1,1,1,6,2);
	grid.fill(1,1,3,2,4);
	grid.fill(2,7,3,2,6); // patroller
partial.addSection(grid, 10, 10);

	levelData.add(partial);
})(this);
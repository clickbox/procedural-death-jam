(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// top half with two arrows
	var partial = new Partial([0,1], 0);
	partial.addThreats(2, function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 150, 'left');	
	});
	partial.addCoins(0, function() {
		this.col(80, 40, 200);
		this.col(320, 40, 200);
	});
	
	var grid = Level.th();
	grid.fill(2, 1, 1, 1, 3);
	grid.fill(2, 19, 6, 1, 3);
	partial.addSection(grid, 0, 0);

	levelData.add(partial);

	// bottom half with two arrows
	partial = new Partial([2,3], 0);
	partial.addThreats(2, function() {
		this.arrow(30, 250, 'right');
		this.arrow(370, 350, 'left');
	});
	partial.addCoins(0, function() {
		this.col(80, 220, 360);
		this.col(320, 220, 360);
	});

	grid = Level.bh();
	grid.fill(2, 1, 6, 1, 3);
	grid.fill(2, 18, 1, 1, 3);
	partial.addSection(grid, 0, 10);

	levelData.add(partial);

	// Top half with separator
	partial = new Partial([0,1], 0);
	partial.addThreats(2, function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 100, 'left');	
	});
	partial.addCoins(1, function() {
		this.col(160, 50, 140);
		this.col(240, 50, 140);
		this.col(320, 50, 140);
	});

	grid = Level.th();
	grid.fill(1, 3, 8, 14, 1);
	//TODO add threats
	partial.addSection(grid, 0, 0);

	// ADD levelData.add(partial);


	// left half with two arrows
	partial = new Partial([0,2], 0);
	partial.addThreats(2, function() {
		this.arrow(50, 30, 'down');
		this.arrow(150, 370, 'up');	
	});
	
	grid = Level.lh();
	//grid.fill(2, 1, 1, 1, 3);
	//grid.fill(2, 19, 6, 1, 3);
	partial.addSection(grid, 0, 0);

	levelData.add(partial);

	// right half with two arrows
	partial = new Partial([1,3], 0);
	partial.addThreats(2, function() {
		this.arrow(250, 30, 'down');
		this.arrow(350, 370, 'up');
	});

	grid = Level.rh();
	//grid.fill(2, 1, 6, 1, 3);
	//grid.fill(2, 18, 1, 1, 3);
	partial.addSection(grid, 10, 0);

	levelData.add(partial);

	// CORNER WITH ARROWS
	partial = new Partial([0], 0);
	partial.addThreats(1, function() { this.arrow(30, 100, 'right'); });
	partial.addThreats(1, function() { this.arrow(100, 30, 'down'); });
	partial.addThreats(2, function() { 
		this.arrow(30, 100, 'right');
		this.arrow(100, 30, 'down'); 
	});

	grid = Level.q0();
	partial.addSection(grid, 0, 0);

	levelData.add(partial);

	partial = new Partial([1], 0);
	partial.addThreats(1, function() { this.arrow(370, 100, 'left'); });
	partial.addThreats(1, function() { this.arrow(300, 30, 'down'); });
	partial.addThreats(2, function() { 
		this.arrow(370, 100, 'left');
		this.arrow(300, 30, 'down'); 
	});

	grid = Level.q1();
	partial.addSection(grid, 10, 0);

	levelData.add(partial);


	partial = new Partial([2], 0);
	partial.addThreats(1, function() { this.arrow(30, 300, 'right'); });
	partial.addThreats(1, function() { this.arrow(100, 370, 'up'); });
	partial.addThreats(2, function() { 
		this.arrow(30, 300, 'right');
		this.arrow(100, 370, 'up'); 
	});

	grid = Level.q2();
	partial.addSection(grid, 0, 10);

	levelData.add(partial);


	partial = new Partial([3], 0);
	partial.addThreats(1, function() { this.arrow(370, 300, 'left'); });
	partial.addThreats(1, function() { this.arrow(300, 370, 'up'); });
	partial.addThreats(2, function() { 
		this.arrow(370, 300, 'left');
		this.arrow(300, 370, 'up'); 
	});

	grid = Level.q3();
	partial.addSection(grid, 10, 10);

	levelData.add(partial);

})(this);
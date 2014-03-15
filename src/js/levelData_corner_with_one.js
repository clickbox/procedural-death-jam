(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// Q0 with a Bouncer
	var partial = new Partial([0], 0);
	partial.addThreats(2, function() { this.bouncer(80, 80, 'slow') });
	partial.addThreats(4, function() { this.bouncer(80, 80, 'fast') });
	partial.addThreats(6, function() { this.bouncer(80, 80, 'faster') });
	partial.addCoins(0, function() {
		this.col(30, 30, 90);
		this.row(30, 50, 90);
	});

	var grid = Level.q0();
	grid.fill(2, 3, 3, 2, 2);
	partial.addSection(grid, 0, 0);

	levelData.add(partial);

	// Q1 with a Bouncer
	partial = new Partial([1], 0);
	partial.addThreats(2, function() { this.bouncer(320, 80, 'slow') });
	partial.addThreats(4, function() { this.bouncer(320, 80, 'fast') });
	partial.addThreats(6, function() { this.bouncer(320, 80, 'faster') });
	partial.addCoins(0, function() {
		this.row(30, 110, 370);
		this.col(370, 50, 90);
	});

	grid = Level.q1();
	grid.fill(2, 6, 3, 2, 2);
	partial.addSection(grid, 10, 0);

	levelData.add(partial);

	// Q2 with a Bouncer
	partial = new Partial([2], 0);
	partial.addThreats(2, function() { this.bouncer(80, 320, 'slow') });
	partial.addThreats(4, function() { this.bouncer(80, 320, 'fast') });
	partial.addThreats(6, function() { this.bouncer(80, 320, 'faster') });

	grid = Level.q2();
	grid.fill(2, 3, 6, 2, 2);
	partial.addSection(grid, 0, 10);

	levelData.add(partial);

	// Q3 with a Bouncer
	partial = new Partial([3], 0);
	partial.addThreats(2, function() { this.bouncer(320, 320, 'slow') });
	partial.addThreats(4, function() { this.bouncer(320, 320, 'fast') });
	partial.addThreats(6, function() { this.bouncer(320, 320, 'faster') });

	grid = Level.q3();
	grid.fill(2, 6, 6, 2, 2);
	partial.addSection(grid, 10, 10);

	levelData.add(partial);
})(this);
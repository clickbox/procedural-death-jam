(function(exports) {
	var partials = [];

	function q0() {
		var grid = new Grid(10, 10);
		grid.fill(1, 0, 0, 1, 10);
		grid.fill(1, 0, 0, 10, 1);
		return grid;
	}

	function q1() {
		var grid = new Grid(10, 10);
		grid.fill(1, 0, 0, 10, 1);
		grid.fill(1, 9, 0, 1, 10);
		return grid;
	}

	function q2() {
		var grid = new Grid(10, 10);
		grid.fill(1, 0, 0, 1, 10);
		grid.fill(1, 0, 9, 10, 1);
		return grid;
	}

	function q3() {
		var grid = new Grid(10, 10);
		grid.fill(1, 0, 9, 10, 1);
		grid.fill(1, 9, 0, 1, 10);
		return grid;
	}
	
	// Q0 with a Bouncer
	var partial = new Partial([0], 0, {
		world: ['q0-empty'],
		threats: function() { this.bouncer(80, 80) }
	});

	var grid = q0();
	grid.fill(2, 3, 3, 2, 2);
	partial.addSection(grid, 0, 0);

	partials.push(partial);

	// Q1 with a Bouncer
	partial = new Partial([1], 0, {
		world: ['q1-empty'],
		threats: function() { this.bouncer(80, 320) }
	});

	grid = q1();
	grid.fill(2, 6, 3, 2, 2);
	partial.addSection(grid, 0, 10);

	partials.push(partial);

	// Q2 with a Bouncer
	partial = new Partial([2], 0, {
		world: ['q2-empty'],
		threats: function() { this.bouncer(320, 80) }
	});

	grid = q2();
	grid.fill(2, 3, 6, 2, 2);
	partial.addSection(grid);

	partials.push(partial);

	// Q3 with a Bouncer
	partial = new Partial([3], 0, {
		world: ['q3-empty'],
		threats: function() { this.bouncer(320, 320) }
	});

	grid = q3();
	grid.fill(2, 6, 6, 2, 2);
	partial.addSection(grid, 10, 10);

	partials.push(partial);

	if(!exports.levelData) exports.levelData = new PartialLibrary();
	_.forEach(partials, function(data) {
		exports.levelData.add(data);
	});
})(this);
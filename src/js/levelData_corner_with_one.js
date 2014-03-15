(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// Q0 with a Bouncer
	levelData.add( new Partial([0], 2, function() { this.bouncer(80, 80, 'slow') }));
	levelData.add( new Partial([0], 4, function() { this.bouncer(80, 80, 'fast') }));
	levelData.add( new Partial([0], 6, function() { this.bouncer(80, 80, 'faster') }));

	// Q1 with a Bouncer
	levelData.add( new Partial([1], 2, function() { this.bouncer(320, 80, 'slow') }));
	levelData.add( new Partial([1], 4, function() { this.bouncer(320, 80, 'fast') }));
	levelData.add( new Partial([1], 6, function() { this.bouncer(320, 80, 'faster') }));

	// Q2 with a Bouncer
	levelData.add( new Partial([2], 2, function() { this.bouncer(80, 320, 'slow') }));
	levelData.add( new Partial([2], 4, function() { this.bouncer(80, 320, 'fast') }));
	levelData.add( new Partial([2], 6, function() { this.bouncer(80, 320, 'faster') }));

	// Q3 with a Bouncer
	levelData.add( new Partial([3], 2, function() { this.bouncer(320, 320, 'slow') }));
	levelData.add( new Partial([3], 4, function() { this.bouncer(320, 320, 'fast') }));
	levelData.add( new Partial([3], 6, function() { this.bouncer(320, 320, 'faster') }));
})(this);
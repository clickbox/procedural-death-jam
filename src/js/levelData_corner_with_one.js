(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// Q0 with a Bouncer
	levelData.add(new Partial('Q0 slow bouncer', [0], [0.5, 0.5, 0.5, 0.5], function() { this.bouncer(80, 80, 'slow') }));
	levelData.add(new Partial('Q0 fast bouncer', [0], [1, 1, 1, 1], function() { this.bouncer(80, 80, 'fast') }));
	levelData.add(new Partial('Q0 faster bouncer', [0], [1.5, 1.5, 1.5], function() { this.bouncer(80, 80, 'faster') }));

	// Q1 with a Bouncer
	levelData.add(new Partial('Q1 slow bouncer', [1], [0.5, 0.5, 0.5, 0.5], function() { this.bouncer(320, 80, 'slow') }));
	levelData.add(new Partial('Q1 fast bouncer', [1], [1, 1, 1, 1], function() { this.bouncer(320, 80, 'fast') }));
	levelData.add(new Partial('Q1 faster bouncer', [1], [1.5, 1.5, 1.5], function() { this.bouncer(320, 80, 'faster') }));

	// Q2 with a Bouncer
	levelData.add(new Partial('Q2 slow bouncer', [2], [0.5, 0.5, 0.5, 0.5], function() { this.bouncer(80, 320, 'slow') }));
	levelData.add(new Partial('Q2 fast bouncer', [2], [1, 1, 1, 1], function() { this.bouncer(80, 320, 'fast') }));
	levelData.add(new Partial('Q2 faster bouncer', [2], [1.5, 1.5, 1.5], function() { this.bouncer(80, 320, 'faster') }));

	// Q3 with a Bouncer
	levelData.add(new Partial('Q3 slow bouncer', [3], [0.5, 0.5, 0.5, 0.5], function() { this.bouncer(320, 320, 'slow') }));
	levelData.add(new Partial('Q3 fast bouncer', [3], [1, 1, 1, 1], function() { this.bouncer(320, 320, 'fast') }));
	levelData.add(new Partial('Q3 faster bouncer', [3], [1.5, 1.5, 1.5], function() { this.bouncer(320, 320, 'faster') }));

	// Chaser!
	levelData.add(new Partial('Q0 chaser', [0], [2, 1, 1, 1], function() { this.chaser(80, 80); }));
	levelData.add(new Partial('Q1 chaser', [1], [1, 2, 1, 1], function() { this.chaser(320, 80); }));
	levelData.add(new Partial('Q2 chaser', [2], [1, 1, 2, 1], function() { this.chaser(80, 320); }));
	levelData.add(new Partial('Q3 chaser', [3], [1, 1, 1, 2], function() { this.chaser(320, 320); }));

	// Big bouncer
	levelData.add(new Partial('Q0 big bouncer', [0], [2, 1, 1, 1], function() { this.bigBouncer(100, 100); }));
	levelData.add(new Partial('Q1 big bouncer', [1], [1, 2, 1, 1], function() { this.bigBouncer(100, 300); }));
	levelData.add(new Partial('Q2 big bouncer', [2], [1, 1, 2, 1], function() { this.bigBouncer(300, 100); }));
	levelData.add(new Partial('Q3 big bouncer', [3], [1, 1, 1, 2], function() { this.bigBouncer(300, 300); }));
})(this);
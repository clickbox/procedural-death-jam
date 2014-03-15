(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// top half with two arrows
	var partial = new Partial([0,1], 2, function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 150, 'left');	
	});
	levelData.add(partial);

	// bottom half with two arrows
	partial = new Partial([2,3], 2, function() {
		this.arrow(30, 250, 'right');
		this.arrow(370, 350, 'left');
	});
	levelData.add(partial);

	// Top half with separator
	partial = new Partial([0,1], 2, function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 100, 'left');	
	});
	levelData.add(partial);

	// left half with two arrows
	partial = new Partial([0,2], 2, function() {
		this.arrow(50, 30, 'down');
		this.arrow(150, 370, 'up');	
	});
	levelData.add(partial);

	// CORNER WITH ARROWS

	levelData.add( new Partial([0], 1, function() { this.arrow(30, 100, 'right'); }));
	levelData.add( new Partial([0], 1, function() { this.arrow(100, 30, 'down'); }));
	partial = new Partial([0], 2, function() {
		this.arrow(30, 100, 'right');
		this.arrow(100, 30, 'down'); 
	});
	levelData.add(partial);

	levelData.add( new Partial([1], 1, function() { this.arrow(370, 100, 'left'); }));
	levelData.add( new Partial([1], 1, function() { this.arrow(300, 30, 'down'); }));
	levelData.add( new Partial([1], 2, function() { 
		this.arrow(370, 100, 'left');
		this.arrow(300, 30, 'down'); 
	}));

	levelData.add( new Partial([2], 1, function() { this.arrow(30, 300, 'right'); }));
	levelData.add( new Partial([2], 1, function() { this.arrow(100, 370, 'up'); }));
	levelData.add( new Partial([2], 2, function() { 
		this.arrow(30, 300, 'right');
		this.arrow(100, 370, 'up'); 
	}));

	levelData.add( new Partial([3], 1, function() { this.arrow(370, 300, 'left'); }));
	levelData.add( new Partial([3], 1, function() { this.arrow(300, 370, 'up'); }));
	levelData.add( new Partial([3], 2, function() { 
		this.arrow(370, 300, 'left');
		this.arrow(300, 370, 'up'); 
	}));
})(this);
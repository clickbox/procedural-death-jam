(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	// top half with two arrows
	var partial = new Partial('top half two arrows', [0,1], [2, 2, 0, 0], function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 150, 'left');	
	});
	levelData.add(partial);

	// bottom half with two arrows
	partial = new Partial('bottom half two arrows', [2,3], [0, 0, 2, 2], function() {
		this.arrow(30, 250, 'right');
		this.arrow(370, 350, 'left');
	});
	levelData.add(partial);

	// Top half with separator
	partial = new Partial('top half, tighter arrows', [0,1], [2, 2, 0, 0], function() {
		this.arrow(30, 50, 'right');
		this.arrow(370, 100, 'left');	
	});
	levelData.add(partial);

	// left half with two arrows
	partial = new Partial('left half, two arrows', [0,2], [2, 0, 2, 0], function() {
		this.arrow(50, 30, 'down');
		this.arrow(150, 370, 'up');	
	});
	levelData.add(partial);

	levelData.add(new Partial('right half, two arrows', [1,3], [0,2,0,2], function() {
		this.arrow(250, 30, 'down');
		this.arrow(350, 370, 'up');		
	}));

	//levelData.add(new Partial('bottom half, tighter arrows', [2,3], [0,0,2,2], function() {
//
//	}));


	// CORNER WITH ARROWS
	levelData.add(new Partial('Q0 right arrow', [0], [1, 1, 0, 0], function() { this.arrow(30, 100, 'right'); }));
	levelData.add(new Partial('Q0 down arrow', [0], [1,0,1,0], function() { this.arrow(100, 30, 'down'); }));
	partial = new Partial('Q0 corner arrows', [0], [2,1,1,0], function() {
		this.arrow(30, 100, 'right');
		this.arrow(100, 30, 'down'); 
	});
	levelData.add(partial);

	levelData.add(new Partial('Q1 left arrow', [1], [1,1,0,0], function() { this.arrow(370, 100, 'left'); }));
	levelData.add(new Partial('Q1 down arrow', [1], [0,1,0,1], function() { this.arrow(300, 30, 'down'); }));
	levelData.add(new Partial('Q1 corner arrows', [1], [1,2,0,1], function() { 
		this.arrow(370, 100, 'left');
		this.arrow(300, 30, 'down'); 
	}));

	levelData.add(new Partial('Q2 right arrow', [2], [0,0,1,1], function() { this.arrow(30, 300, 'right'); }));
	levelData.add( new Partial('Q2 up arrow', [2], [1,0,1,0], function() { this.arrow(100, 370, 'up'); }));
levelData.add( new Partial('Q2 corner arrows', [2], [1,0,2,1], function() { 
		this.arrow(30, 300, 'right');
		this.arrow(100, 370, 'up'); 
	}));

	levelData.add( new Partial('Q3 left arrow', [3], [0,0,1,1], function() { this.arrow(370, 300, 'left'); }));
	levelData.add( new Partial('Q3 up arrow', [3], [0,1,0,1], function() { this.arrow(300, 370, 'up'); }));
	levelData.add( new Partial('Q3 corner arrows', [3], [0,1,1,2], function() { 
		this.arrow(370, 300, 'left');
		this.arrow(300, 370, 'up'); 
	}));
})(this);
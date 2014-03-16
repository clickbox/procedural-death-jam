(function(exports) {
	if(!exports.levelData) exports.levelData = new PartialLibrary();

	levelData.add(new Partial('coins col left', [4,6], [0, 0, 0, 0], undefined, function() {
		this.col(80, 50, 350);
	}));
	
	levelData.add(new Partial('coins col right', [5,7], [0, 0, 0, 0], undefined, function() {
		this.col(320, 50, 350);
	}));

	levelData.add(new Partial('coins row top', [4,5], [0, 0, 0, 0], undefined, function() {
		this.row(80, 50, 350);
	}));
	
	levelData.add(new Partial('coins row bottom', [6,7], [0, 0, 0, 0], undefined, function() {
		this.row(320, 50, 350);
	}));

	levelData.add(new Partial('coins big circle', [4,5,6,7], [1, 1, 1, 1], undefined, function() {
		this.arc(200, 200, 140, 0, 2 * Math.PI);
	}));

	// 
	levelData.add(new Partial('coins cols top left', [4], [0, 0, 0, 0], undefined, function() {
			this.col(80, 50, 140);
			this.col(160, 50, 140);
	}));

	levelData.add(new Partial('coins cols top right', [5], [0, 0, 0, 0], undefined, function() {
			this.col(240, 50, 140);
			this.col(320, 50, 140);
	}));

	levelData.add(new Partial('coins col bottom left', [6], [0, 0, 0, 0], undefined, function() {
		this.col(80, 260, 350);
		this.col(160, 260, 350);
	}));

	levelData.add(new Partial('coins col bottom right', [7], [0, 0, 0, 0], undefined, function() {
		this.col(240, 260, 350);
		this.col(320, 260, 350);
	}));

	//	
	levelData.add(new Partial('coins cols top left', [4], [0, 0, 0, 0], undefined, function() {
		this.row(80, 50, 140);
		this.row(160, 50, 140);
	}));

	levelData.add(new Partial('coins cols top right', [6], [0, 0, 0, 0], undefined, function() {
		this.row(240, 50, 140);
		this.row(320, 50, 140);
	}));

	levelData.add(new Partial('coins col bottom left', [5], [0, 0, 0, 0], undefined, function() {
		this.row(80, 260, 350);
		this.row(160, 260, 350);
	}));

	levelData.add(new Partial('coins col bottom right', [7], [0, 0, 0, 0], undefined, function() {
		this.row(240, 260, 350);
		this.row(320, 260, 350);
	}));

	//
	levelData.add(new Partial('coins rows split top', [4,5], [0, 0, 0, 0], undefined, function() {
		this.row(50, 50, 140);
		this.row(150, 260, 360);
	}));

	levelData.add(new Partial('coins rows split bottom', [6,7], [0, 0, 0, 0], undefined, function() {
		this.row(250, 50, 140);
		this.row(350, 260, 360);
	}));

	//
	levelData.add(new Partial('coins rows split left', [4,6], [0, 0, 0, 0], undefined, function() {
		this.col(50, 50, 140);
		this.col(150, 260, 360);
	}));

	levelData.add(new Partial('coins rows split right', [5,7], [0, 0, 0, 0], undefined, function() {
		this.col(250, 50, 140);
		this.col(350, 260, 360);
	}));

	levelData.add(new Partial('coins circle top left', [4], [1, 1, 1, 1], undefined, function() {
		this.arc(90, 90, 40, 0, 2 * Math.PI);
	}));
	levelData.add(new Partial('coins circle top right', [5], [1, 1, 1, 1], undefined, function() {
		this.arc(310, 90, 40, 0, 2 * Math.PI);
	}));
	levelData.add(new Partial('coins circle bottom left', [6], [1, 1, 1, 1], undefined, function() {
		this.arc(90, 310, 40, 0, 2 * Math.PI);
	}));
	levelData.add(new Partial('coins circle bottom right', [7], [1, 1, 1, 1], undefined, function() {
		this.arc(310, 310, 40, 0, 2 * Math.PI);
	}));

	//
	levelData.add(new Partial('coins col left', [4,6], [0, 0, 0, 0], undefined, function() {
		this.col(80, 50, 350, 40);
		this.col(160, 50, 350, 40);
	}));
	
	levelData.add(new Partial('coins col right', [5,7], [0, 0, 0, 0], undefined, function() {
		this.col(320, 50, 350, 40);
		this.col(240, 50, 350, 40);
	}));

	levelData.add(new Partial('coins row top', [4,5], [0, 0, 0, 0], undefined, function() {
		this.row(80, 50, 350, 40);
		this.row(160, 50, 350, 40);
	}));
	
	levelData.add(new Partial('coins row bottom', [6,7], [0, 0, 0, 0], undefined, function() {
		this.row(320, 50, 350, 40);
		this.row(240, 50, 350, 40);
	}));

})(this);
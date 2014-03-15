(function(exports) {

	exports.Level = {

		q0: function() {
			var grid = new Grid(10, 10);
			grid.fill(1, 0, 0, 1, 10);
			grid.fill(1, 0, 0, 10, 1);
			return grid;
		},

		q1: function() {
			var grid = new Grid(10, 10);
			grid.fill(1, 0, 0, 10, 1);
			grid.fill(1, 9, 0, 1, 10);
			return grid;
		},

		q2: function() {
			var grid = new Grid(10, 10);
			grid.fill(1, 0, 0, 1, 10);
			grid.fill(1, 0, 9, 10, 1);
			return grid;
		},

		q3: function() {
			var grid = new Grid(10, 10);
			grid.fill(1, 0, 9, 10, 1);
			grid.fill(1, 9, 0, 1, 10);
			return grid;
		},

		th: function() {
			var grid = new Grid(20, 10);
			grid.fill(1, 0, 0, 20, 1);
			grid.fill(1, 0, 0, 1, 10);
			grid.fill(1, 19, 0, 1, 10);
			return grid;
		},	

		bh: function() {
			var grid = new Grid(20, 10);
			grid.fill(1, 0, 0, 1, 10);
			grid.fill(1, 19, 0, 1, 10);
			grid.fill(1, 0, 19, 20, 1);
			return grid;
		},

		lh: function() {
			var grid = new Grid(10, 20);
			grid.fill(1, 0,0,1,20);
			grid.fill(1,0,0,10,1);
			grid.fill(1,0,19,10,1);
			return grid;
		},

		rh: function() {
			var grid = new Grid(10, 20);
			grid.fill(1,9,0,1,20);
			grid.fill(1,0,0,10,1);
			grid.fill(1,0,19,10,1);
			return grid;
		}
	};

/*
	exports.sample_level = {
		world: [
			map: 'empty-board',
			layer: 'Walls',
			hazard: false
		}],
		threats: function() { // runs in context of a threat builder
			this.arrow(30, 50, 'right');
			this.arrow(370, 150, 'left');	
			this.arrow(30, 250, 'right');
			this.arrow(370, 350, 'left');
		},
		coins: function() { // runs in context of a CoinGroup
			this.col(80, 40, 360);
			this.col(320, 40, 360);
		}
	};
	exports.sample_level2 = {
		world: [{
			map: 'empty-board',
			layer: 'Walls',
			hazard: false
		}],
		threats: function() {
			this.bouncer(80, 80);
			this.bouncer(80, 320);
			this.bouncer(320, 80);
			this.bouncer(320, 320);
			//this.chaser(80, 80);
		},
		coins: function() {
			//this.col(80, 40, 360);
			//this.col(320, 40, 360);
			this.arc(200, 200, 140, 0, 2 * Math.PI);
		}
	};
	exports.sample_level3 = {
		world: [{
			key: 'halls-open-top',
			layer: 'Walls'
		}],
		threats: function() {
			this.arrow(30, 50, 'right');
			this.arrow(370, 100, 'left');	
			this.patroller(40,360)
				.to(40, 360 - 80)
				.to(40 + 80, 360 - 80)
				.to(40 + 80, 360)
				.to(40, 360);
			this.patroller(360, 360)
				.to(360, 360 - 80)
				.to(360 - 80, 360 - 80)
				.to(360 - 80, 360)
				.to(360, 360)
				.to(360, 360 - 160)
				.to(360 - 160, 360 - 160)
				.to(360 - 160, 360)
				.to(360, 360);
		},
		coins: function() {
			// vertical rows in the top
			this.col(80, 50, 140);
			this.col(160, 50, 140);
			this.col(240, 50, 140);
			this.col(320, 50, 140);

			// coins 
			this.col(360, 200, 360);
			this.row(360, 40, 340);
			this.col(40, 200, 340);
			this.row(200, 60, 340);
		}
	}*/
})(this);
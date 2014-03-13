(function(exports) {
	exports.sample_level = {
		world: [{
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
			/*
			this.bouncer(80, 80);
			this.bouncer(80, 320);
			this.bouncer(320, 80);
			this.bouncer(320, 320);
			*/
			this.chaser(80, 80);
		},
		coins: function() {
			//this.col(80, 40, 360);
			//this.col(320, 40, 360);
			this.arc(200, 200, 140, 0, 2 * Math.PI);
		}
	}
})(this);
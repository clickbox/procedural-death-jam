(function(exports) {
	exports.sample_level = {
		world: [{
			map: 'empty-board',
			layer: 'Walls',
			hazard: false
		}],
		threats: function() { // runs in context of a threat builder
			this.arrow(30, 50, 'right'),
			this.arrow(370, 150, 'left'),	
			this.arrow(30, 250, 'right'),
			this.arrow(370, 350, 'left')
		},
		coins: function() { // runs in context of a CoinGroup
			this.col(80, 40, 360);
			this.col(320, 40, 360);
		}
	}
})(this);
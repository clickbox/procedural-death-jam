(function(exports) {
	function Partial(usedSections, difficulty, data) {
		this.usedSections = usedSections;
		this.difficulty = difficulty;
		this._sections = [];
		this.layers = data.world;
		this.threats = data.threats;
	}

	Partial.prototype = {
		addSection: function(grid, x, y) {
			this._sections.push({
				x: x || 0,
				y: y || 0,
				grid: grid
			});
		},

		render: function(target) {
			_(this._sections).forEach(function(section) {
				target.copy(section.grid, section.x , section.y, false);
			});
		}
	};

	exports.Partial = Partial;
})(this);
(function(exports) {
	function Partial(usedSections, difficulty) {
		this.usedSections = usedSections;
		this.difficulty = difficulty;
		this._sections = [];
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
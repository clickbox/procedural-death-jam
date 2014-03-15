(function(exports) {
	function Partial(usedSections, difficulty, threats) {
		this.usedSections = usedSections;
		this.difficulty = difficulty;
		this._threats = [];
	}

	exports.Partial = Partial;
})(this);
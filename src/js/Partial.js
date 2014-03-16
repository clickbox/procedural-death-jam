(function(exports) {
	function Partial(id, usedSections, difficulty, threats, coins) {
		this.id = id;
		this.usedSections = usedSections;
		this.difficulty = difficulty;
		this.threats = threats || _.noop;
		this.coins = coins || _.noop;
	}

	exports.Partial = Partial;
})(this);
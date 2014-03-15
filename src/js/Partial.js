(function(exports) {
	function Partial(usedSections, difficulty) {
		this.usedSections = usedSections;
		this.difficulty = difficulty;
		this._sections = [];
		this._threats = [];
		this._coins = [];

	}

	function LevelData(data) {
		_.extend(this, data);
	}

	LevelData.prototype = {
		render: function(target) {
			_(this._sections).forEach(function(section) {
				target.copy(section.grid, section.x , section.y, false);
			});
		}
	}

	Partial.prototype = {
		addSection: function(grid, x, y) {
			this._sections.push({
				x: x || 0,
				y: y || 0,
				grid: grid
			});
		},

		addThreats: function(difficulty, fn) {
			this._threats.push({
				mod: difficulty,
				fn: fn
			});
		},

		addCoins: function(difficulty, fn) {
			this._coins.push({
				mod: difficulty,
				fn: fn
			});
		},

		expand: function() {
			var data = [],
				coins = this._coins;

			if(coins.length == 0) coins.push({ mod: 0, fn: _.noop });
			
			_.forEach(this._threats, function(threats) {
				_.forEach(this._coins, function(coins) {
					var instance = new LevelData({
						usedSections: this.usedSections, 
						_sections: this._sections,
						difficulty: this.difficulty + (threats.mod || 0) + (coins.mod || 0),
						threats: threats.fn,
						coins: coins.fn
					});

					data.push(instance);
				}, this);
			}, this);

			return data;
		}
	};

	exports.Partial = Partial;
})(this);
(function(exports) {
	function LevelGenerator(math, rnd) {
		this.math = math;
		this.rnd = rnd; 
		this.difficulty = {
			min: 0,
			max: 0.5
		};
		this.maxIters = 250;
	}

	LevelGenerator.prototype = {

		generate: function() {
			var partials = [],
				accumulator = [0, 0, 0, 0],
				avgDifficulty = 0;

			for(var iters = 0; iters < this.maxIters; iters++) {
				// reset for run
				partials = [];
				accumulator = [0,0,0,0];

				// randomly construct a level
				levelData.reset();
				levelData.sections = [0, 1, 2, 3];
				
				// determine which quadrants will have coins		
				var coinSections = [4,5,6,7];
				if(this.math.chanceRoll(75)) {
					this.removeCoinSection(coinSections, accumulator);
					if(this.math.chanceRoll(50)) {
						this.removeCoinSection(coinSections, accumulator);
					}
				}

				Array.prototype.push.apply(levelData.sections, coinSections);

				// try out some partials
				while(levelData.sections.length) {
					levelData.search();
					if(levelData.candidates.length) {
						var candidate = this.rnd.pick(levelData.candidates);

						levelData.sections = _.difference(levelData.sections, candidate.usedSections);
						partials.push(candidate);
					}
					// just fill with empties if there are no candidates
					else {
						_.forEach(levelData.sections, function(q) {
							partials.push(PartialLibrary.EMPTY[q]);
						});
					}
				}

				// determine if the level is within boundaries
				avgDifficulty = this.calculateDifficulty(accumulator, partials);

				if(avgDifficulty > this.difficulty.min &&
				   avgDifficulty < this.difficulty.max) {
				   	console.log(avgDifficulty);
					return partials;
				}
			}

			//for now... we bail
			//TODO if over, remove the hardest, substitute with empty and call it good
			while( this.calculateDifficulty(accumulator, partials) > this.difficulty.max) {
				var toRemove = _(partials)
				.filter(function(partial) {
					return _.all(partial.usedSections, function(section) {
						return section < 4;
					})
				})
				.sample();

				if(toRemove)
					partials.splice(partials.indexOf(toRemove), 1);
				else
					break;
			}

			return partials;

		},

		calculateDifficulty: function(initial, partials) {
			var accumulator = [0,0,0,0];
			this.addArray(accumulator, initial);

			_.forEach(partials, function(partial) {
				this.addArray(accumulator, partial.difficulty);
			}, this);

			return _.reduce(accumulator, function(acc, val) { return acc + val }) / 4;
		},

		addArray: function(acc, arr) {
			for(var i = 0; i < acc.length; i++) {
				if(i < arr.length)
					acc[i] += arr[i];
			}
		},

		removeCoinSection: function(sections, accumulator) {
			var idx = this.rnd.integerInRange(0, sections.length);
			var removed = sections.splice(idx, 1);

			var sm = -0.25,
				bg = -0.5;
			switch(removed[0]) {
				case 4: this.addArray(accumulator, [bg, sm, sm, sm]); break;
				case 5: this.addArray(accumulator, [sm, bg, sm, sm]); break;
				case 6: this.addArray(accumulator, [sm, sm, bg, sm]); break;
				case 7: this.addArray(accumulator, [sm, sm, sm, bg]); break;
			}
		}
	};

	exports.LevelGenerator = LevelGenerator;
})(this);
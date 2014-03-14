(function(exports) {
	function LevelGenerator() {
		this.grid = new Grid(20, 20);
		this.rnd = new Phaser.RandomDataGenerator();

		this.difficulty = {
			current: 0,
			target: 0
		};
		this.maxIters = 100;
	}

	LevelGenerator.prototype = {

		generate: function() {
			var partials = [],
				iters = 0;

			levelData.reset();			
			levelData.sections = [0, 1, 2, 3];
			while(levelData.sections.length) {
				if(iters > this.maxIters) break; 

				levelData.search();
				if(levelData.candidates.length) {
					var candidate = this.rnd.pick(levelData.candidates);
					candidate.render(this.grid);

					// check if the player runs into anything here...
					if(this.checkPlayer()) {
					levelData.sections = _.difference(levelData.sections, candidate.usedSections);
						this.difficulty.current += candidate.difficulty;
						levelData.difficulty.max = this.difficulty.target - this.difficulty.current;
						partials.push(candidate);
					}

					// don't want to see it again
					levelData.ban(candidate); 
				}
				// relax difficulty restriction, its too tight
				else {
					levelData.difficulty.max++;
				}				

				iters++;
			}

			// add empty partials for each section that isn't filled
			// for() {
			//
			// }

			return partials;
		},

		checkPlayer: function() {
			return true; //TODO need to get this working...
		},

		reset: function() {
			this.openSections = [0, 1, 2, 3];
			this.grid.clear();
			this.difficulty = {
				current: 0,
				target: 0
			};
		}
	};

	exports.LevelGenerator = LevelGenerator;
})(this);
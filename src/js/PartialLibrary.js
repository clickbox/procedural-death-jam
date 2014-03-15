(function(exports) {
	function PartialLibrary() {
		this._partials = _(PartialLibrary.EMPTY)
			.map(function(partial) { 
				return partial.expand() 
			})
			.flatten()
			.value();

		this.candidates = [];

		this.banned = [];
		this.sections = [];
		this.difficulty = {
			min: -Infinity,
			max: Infinity
		};
	}

	PartialLibrary.prototype = {
		add: function(template) {
			//TODO add a partial template, exploding out 
			// its possible generated templates
			this._partials.push.apply(this._partials, template.expand());
		},

		ban: function(partial) {
			this.banned.push(partial);
		},

		unban: function(partial) {
			this.banned = _.pull(this.banned, partial);
		},

		//creates a candidate list
		search: function() {
			// local copies of variables
			var sections = this.sections,
				difficulty = this.difficulty;

			this.candidates = _.chain(this._partials)
				// remove all candidates that require a section that is unavailable
				.filter(function(partial) {
					return _.all(partial.usedSections, function(section) {
				 		return _.contains(sections, section);
				 	})
				})
				// remove all candidates with a difficulty that is too high
				.filter(function(partial) {
				 	return partial.difficulty <= difficulty.max &&
				 		   partial.difficulty >= difficulty.min;
				})
				// remove anything on the banned list
				.difference(this.banned)
				.value();
		},

		reset: function() {
			this.banned = [];
			this.sections = [];
			this.difficulty = {
				min: -Infinity,
				max: Infinity
			};
		}

		//TODO should really facilitate a weighted pick...
	};

	// construct the EMPTY partials
	var partial = null,
		empty = [];

	partial = new Partial([0], 0);
	partial.addSection(Level.q0(), 0, 0);
	partial.addThreats(0, _.noop);
	//partial.addCoins(0, function() { this.col(80, 40, 200) });
	partial.addCoins(0, function() { 
		this.col(50, 50, 190);
		this.row(50, 70, 190);
	});
	empty[0] = partial; 

	partial = new Partial([1], 0);
	partial.addSection(Level.q1(), 10, 0);
	partial.addThreats(0, _.noop);
	//partial.addCoins(0, function() { this.col(320, 40, 200) });
	partial.addCoins(0, function() {
		this.col(350, 50, 190);
		this.row(50, 210, 350);
	});
	empty[1] = partial;

	partial = new Partial([2], 0);
	partial.addSection(Level.q2(), 0, 10);
	partial.addThreats(0, _.noop);
	//partial.addCoins(0, function() { this.col(80, 220, 360) });
	partial.addCoins(0, function() {
		this.col(50, 210, 350);
		this.row(350, 50, 190);
	});
	empty[2] = partial;

	partial = new Partial([3], 0);
	partial.addSection(Level.q3(), 10, 10);
	partial.addThreats(0, _.noop);
	//partial.addCoins(0, function() { this.col(320, 220, 360) });
	partial.addCoins(0, function() {
		this.col(350, 210, 350);
		this.row(350, 210, 350);
	})
	empty[3] = partial;

	PartialLibrary.EMPTY = empty;

	exports.PartialLibrary = PartialLibrary;
})(this);
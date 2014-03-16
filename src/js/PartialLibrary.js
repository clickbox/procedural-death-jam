(function(exports) {
	function PartialLibrary() {
		this._partials = PartialLibrary.EMPTY.slice(); 

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
			this._partials.push(template);
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
				//.filter(function(partial) {
				// 	return partial.difficulty <= difficulty.max &&
				// 		   partial.difficulty >= difficulty.min;
				//})
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
	PartialLibrary.EMPTY = [];
	for(var i = 0; i < 4; i++) {
		PartialLibrary.EMPTY[i] = new Partial('Q' + i + ' empty', [i], [0,0,0,0]);
	}

	exports.PartialLibrary = PartialLibrary;
})(this);
(function(exports) {
	function PartialLibrary() {
		this._partials = []

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

	exports.PartialLibrary = PartialLibrary;
})(this);
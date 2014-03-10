(function(exports) {
	function Boot() {}

	Boot.prototype = {
		preload: function() {
			this.load.image('loading-bar', 'assets/img/loading_bar.png');
			this.load.image('loading-bar-overlay', 'assets/img/loading_bar_overlay.png');
			//TODO load any other resources necessary for 
		},

		create: function() {
		this.game.input.maxPointers = 1;
			this.game.state.start('preloader');
		}

	};

	exports.Boot = Boot;
})(this);
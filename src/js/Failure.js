(function(exports) {
	function Failure() {}

	Failure.preload = function(game) {
		game.load.font('');
	}

	Failure.prototype = {
		create: function() {
			this.stage.backgroundColor = '#000000';

		}
	}	
})(this);
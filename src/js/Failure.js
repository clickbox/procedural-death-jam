(function(exports) {
	function Failure() {
		FadingState.call(this);
	}

	Failure.prototype = Object.create(FadingState.prototype);
	Failure.prototype.constructor = Failure;

	Failure.prototype.create = function() {
		this.stage.backgroundColor = '#000000';

		var text = 'Score: ' + this.game.score || 0,
			font = { font: '20px minecraftia', align: 'center' },
			showScore = this.add.bitmapText(200, 200, text, font);
		
		showScore.anchor.setTo(0.5, 0.5);
		
		this.fadeFromBlack(0, 750);
		this.time.events.add(1500 + 750, function() {
			this.fadeToBlack(0, 750)
				.onComplete.add(function() {
					this.game.state.start('game');
				}, this);
		}, this);
	};

	exports.Failure = Failure;
})(this);
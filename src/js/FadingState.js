(function(exports) {
	function FadingState() {}

	FadingState.prototype = {
		// (Number, Number) -> Phaser.Signal
		fadeFromBlack: function(pause, fadein) {
			if(pause === undefined) pause = 0;
			if(fadein === undefined) fadein = 1000;

			var fader = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'black'),
			 	tween = this.add.tween(fader).to({ alpha: 0 }, fadein); //TODO use pause feature!

			this.time.events.add(pause, tween.start, tween);

			tween.onComplete.add(fader.destroy, fader);
			return { onComplete: tween.onComplete };
		},

		// (Number, Number) -> Phaser.Signal
		fadeToBlack: function(fadeout, pause) {
			if(fadeout === undefined) fadeout = 1000;
			if(pause === undefined) pause = 0;

		var fader = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'black'),
			signal = new Phaser.Signal(),
			time = this.time;

			fader.width = this.game.width;
			fader.height = this.game.height;
			fader.alpha = 0;

			this.add.tween(fader).to({ alpha: 1 }, fadeout)
				.start()
				.onComplete.add(function() {
					time.events.add(pause, function() {
						fader.destroy();
						signal.dispatch();
					});
				});

			return { onComplete: signal };
		}
	}

	exports.FadingState = FadingState;
})(this);
(function(exports) {
	function Preloader() {}

	Preloader.FADE_TIME = 750;
	Preloader.DARK_TIME = 300;

	Preloader.prototype = {
		preload: function() {
			// setup preloading graphic
			this.loadingBar = this.add.sprite(103, 181, 'loading-bar');
			this.overlay = this.add.sprite(98, 176, 'loading-bar-overlay');

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loadingBar);

			//load game objects
			Arrow.preload(this.game);
			Bouncer.preload(this.game);
			BigBouncer.preload(this.game);
			Chaser.preload(this.game);
			Patroller.preload(this.game);
			Coin.preload(this.game);
			Player.preload(this.game);

			//load basic menu/transition stuff
			this.load.image('black', 'assets/img/black.png');
			this.load.bitmapFont('minecraftia', 'assets/font/minecraftia.png', 'assets/font/minecraftia.xml');

			//TODO this is a level preloader thing...
			this.load.tilemap('empty-board', 'assets/tilemap/empty_board.json', null, Phaser.Tilemap.TILED_JSON);
			this.load.image('tiles', 'assets/img/tiles.png');
		},

		create: function() {
			this.game.stage.backgroundColor = '#000000';
		},

		onLoadComplete: function() {
			var time = this.time,
				game = this.game;

			this.add.tween(this.loadingBar).to({ alpha: 0 }, Preloader.FADE_TIME)
				.start()
				.onComplete.add(function() {
					time.events.add(Preloader.DARK_TIME, function() {
						game.state.start('game');
					});
				})
			this.add.tween(this.overlay).to({ alpha: 0 }, Preloader.FADE_TIME).start();
		}


	};

	exports.Preloader = Preloader;
})(this);
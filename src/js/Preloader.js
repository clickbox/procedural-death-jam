(function(exports) {
	function Preloader() {
		this.ready = false;
	}

	Preloader.prototype = {
		preload: function() {
			// setup preloading graphic
			this.loadingBar = this.add.sprite(100, 180, 'loading-bar');
			this.overlay = this.add.sprite(98, 176, 'loading-bar-overlay');

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loadingBar);

			Arrow.preload(this.game);
			Coin.preload(this.game);
			Player.preload(this.game);

			this.game.load.tilemap('empty-board', 'assets/tilemap/empty_board.json', null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image('tiles', 'assets/img/tiles.png');
		},

		create: function() {
			this.game.stage.backgroundColor = '#6495ED';
		},

		update: function() {
			if(!!this.ready) {
				this.game.state.start('game');
			}
		},

		onLoadComplete: function() {
			this.ready = true;
		}


	};

	exports.Preloader = Preloader;
})(this);
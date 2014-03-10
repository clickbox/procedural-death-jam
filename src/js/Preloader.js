(function(exports) {
	function Preloader() {
		this.ready = false;
	}

	Preloader.prototype = {
		preload: function() {
			// setup preloading graphic
			this.loadingBar = this.add.sprite(200, 200, 'loading-bar');
			this.loadingBar.anchor.setTo(0.5, 0.5);
			var overlay = this.add.sprite(200, 200, 'loading-bar-overlay');
			overlay.anchor.setTo(0.5, 0.5);
			
			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loadingBar);

			Arrow.preload(this);
			Coin.preload(this);
			Player.preload(this);

			this.load.tilemap('empty-board', 'assets/tilemap/empty_board.json', null, Phaser.Tilemap.TILED_JSON);
			this.load.image('tiles', 'assets/img/tiles.png');
		},

		create: function() {
			this.loadingBarCropEnabled = false;

			this.game.stage.backgroundColor = '#000000';
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
(function(exports) {
	
	function Coin(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'coin');
		this.anchor.setTo(0.5,0.5);
		
		this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 30, true);
		this.animations.play('idle');

		var body = this.body;
		body.setRectangle(undefined, undefined, 0, 0);
		body.setImmovable = true;
	}

	Coin.preload = function(game) {
		game.load.spritesheet('coin', 'assets/spritesheet/coin.png', 4, 4, 12);
		game.load.audio('pickup-coin', ['assets/audio/pickup_coin.mp3', 'assets/audio/pickup_coin.ogg']);
	}

	Coin.prototype = Object.create(Phaser.Sprite.prototype);
	Coin.prototype.constructor = Coin;

	exports.Coin = Coin;
})(this);
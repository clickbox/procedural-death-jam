(function(exports) {
	
	function Coin(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'coin');
	}

	Coin.preload = function(game) {
		game.load.spritesheet('coin', 'assets/spritesheet/coin.png');
	}

	Coin.prototype = Object.create(Phaser.Sprite.prototype);
	Coin.prototype.constructor = Coin;

})(this);
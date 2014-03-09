(function(exports) {
	
	function Coin(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'coin');
		this.anchor.setTo(0.5,0.5);
		
		var body = this.body;
		body.setRectangle(undefined, undefined, 0, 0);
		body.setImmovable = true;
		body.collideCallback = function(dir, myBody, other) { //for right now coins only ever collide with the player... 
			console.log('coin collided');
			this.kill();
		};
		body.collideCallbackContext = this;
	}

	Coin.preload = function(game) {
		game.load.image('coin', 'assets/img/coin.png');
	}

	Coin.prototype = Object.create(Phaser.Sprite.prototype);
	Coin.prototype.constructor = Coin;

	exports.Coin = Coin;
})(this);
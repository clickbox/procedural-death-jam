function Player(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'white');
	this.width = 10;
	this.height = 10;	
	this.body.velocity.y = Player.VELOCITY;
	this.body.collideWorldBounds = true;
this.body.bounce.setTo(0,0);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.VELOCITY = 175;
(function(exports) {
	function Chaser(game, x, y, player) {
		Phaser.Sprite.call(this, game, x, y, 'chaser');

		this.animations.add('scanning', [0, 1, 2, 3, 3, 2, 1, 0 ], 15, true);
		this.animations.play('scanning');
		
		this.player = player;
		this.chasing = false;
	}

	Chaser.preload = function(game) {
		game.load.spritesheet('chaser', 'assets/spritesheet/chaser.png', 32, 32);
	}

	Chaser.CHASE_SPEED = 100;
	Chaser.CHASE_SPEED_VAR = 50;

	Chaser.prototype = Object.create(Phaser.Sprite.prototype);
	Chaser.prototype.constructor = Chaser;

	Chaser.prototype.start = function() {
		this.chasing = true;
	}

	Chaser.prototype.update = function() {
		//TODO requires something more sophisticated, with flocking behavior...
		if(this.chasing) {
			if(this.player.alive) {
				var speed = Chaser.CHASE_SPEED + Chaser.CHASE_SPEED_VAR * Math.sin(0.35 * this.time);
				this.game.physics.moveToObject(this, this.player, speed);
				this.time += this.game.time.totalElapsedSeconds() / 1000;
			}
		}
	}

	exports.Chaser = Chaser;
})(this);
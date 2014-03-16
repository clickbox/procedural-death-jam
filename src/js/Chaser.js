(function(exports) {
	function Chaser(game, x, y, player, delay, fastTime, slowTime) {
		Phaser.Sprite.call(this, game, x, y, 'chaser');

		//set a triangle
		this.body.setPolygon(1,5, 1,26, 31,15);
		this.anchor.setTo(0.5, 0.5);

		this.player = player;
		this.chasing = false;
		this.speed = Chaser.CHASE_SPEED;
		this.fastTime = fastTime;
		this.slowTime = slowTime;
		this.delay = delay;
	}

	Chaser.preload = function(game) {
		game.load.image('chaser', 'assets/img/pointer.png');
	}

	Chaser.CHASE_SPEED = 100;
	Chaser.CHASE_SPEED_FAST = 175;
	Chaser.CHASE_SPEED_SLOW = 50;
	Chaser.REV_TIME = 500;

	Chaser.prototype = Object.create(Phaser.Sprite.prototype);
	Chaser.prototype.constructor = Chaser;

	Chaser.prototype.start = function() {
		this.chasing = true;
		var easing = Phaser.Easing.Quadratic.Out;
			
		this.game.add.tween(this).to(
				{ speed: Chaser.CHASE_SPEED_FAST }, 
				Chaser.REV_TIME, easing, 
				false,
				this.delay)
		.start()
		.onComplete.add(function() {
			this.game.add.tween(this)
				.to({ speed: Chaser.CHASE_SPEED_SLOW }, Chaser.REV_TIME, easing, false, this.fastTime)
				.to({ speed: Chaser.CHASE_SPEED_FAST }, Chaser.REV_TIME, easing, false, this.slowTime)
				.loop()
				.start();
		}, this);
	}

	Chaser.prototype.update = function() {
		//TODO requires something more sophisticated, with flocking behavior...
		this.rotation = this.game.physics.angleBetween(this, this.player);

		// rotate the sprite!
		var hw = this.width /2, hh = this.height / 2;
		this.body.polygon.translate(-hw, -hh);
		this.body.polygon.rotate(this.rotation - this.game.math.degToRad(this.body.preRotation));
		this.body.polygon.translate(hw, hh);

		if(this.chasing) {
			if(this.player.alive) {
				this.game.physics.moveToObject(this, this.player, this.speed);
			}
		}
	}

	Chaser.prototype.processWorld = function() {
		return false;
	}

	exports.Chaser = Chaser;
})(this);
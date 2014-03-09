(function(exports) {
	function Arrow(game, x, y, facing, player) {
		Phaser.Sprite.call(this, game, x, y, 'arrow');
	
		this.anchor.setTo(0.5, 0.5);
	
		this.animations.add('awake', [0]);
		this.animations.add('asleep', [1]);
		this.animations.add('waking', [1,0], 20, true);
		this.animations.play('asleep');

		this.setFacing(facing);
		this.state = 'asleep';
		this.player = player;

		this.body.maxVelocity.setTo(Arrow.CHARGE_VEL, Arrow.CHARGE_VEL);
		this.body.setRectangle(18, 32, 7, 0);
		this.body.x = x;
		this.body.y = y;
		this.body.collideWorldBounds = true;
	}

	Arrow.preload = function(game) {
		game.load.spritesheet('arrow', 'assets/spritesheet/arrow.png', 32, 32);
	}

	Arrow.WAKE_TIME = 300;
	Arrow.SLEEP_TIME = 550;
	Arrow.CHARGE_VEL = 650;
	Arrow.CHARGE_ACCEL = 1200;

	Arrow.prototype = Object.create(Phaser.Sprite.prototype);
	Arrow.prototype.constructor = Arrow;

	Arrow.prototype.update = function() {
		if(this.state == 'asleep') {
			var inRow = Math.abs(this.center.y - this.player.y) <= 10;
			var inCol = Math.abs(this.center.x - this.player.x) <= 10;
			if( (	inRow &&  
					(
						(this.facing == 'left' && this.center.x > this.player.x) ||
						(this.facing == 'right' && this.center.x < this.player.x) 
					)
				) ||
				(	inCol &&
					(
						(this.facing == 'up' && this.center.y > this.player.y) ||
						(this.facing == 'down' && this.center.y < this.player.y)
					)
				)) 
			{
				this.wakeUp();
			}
		}
	}

	Arrow.prototype.wakeUp = function() {
		this.animations.play('waking');
		this.state = 'waking-up';
		this.game.time.events.add(Arrow.WAKE_TIME, this.wokenUp, this);
	}

	Arrow.prototype.wokenUp = function() {
		//TODO check that the Arrow is still alive, etc

		this.animations.play('awake');
	
		switch(this.facing) {
			case 'left': this.body.acceleration.setTo(-1, 0); break;
			case 'right': this.body.acceleration.setTo(1, 0); break;
			case 'up': this.body.acceleration.setTo(0, 1);   break;
			case 'down': this.body.acceleration.setTo(0, -1);  break;
		}
		this.body.acceleration.setMagnitude(Arrow.CHARGE_ACCEL);

		this.state = 'awake';
	}

	Arrow.prototype.fallAsleep = function() {
		this.body.acceleration.setTo(0,0);
		this.body.velocity.setTo(0,0);
		this.animations.play('asleep');
		this.state = 'falling-asleep';
		this.game.time.events.add(Arrow.SLEEP_TIME, this.fallenAsleep, this);
	}

	Arrow.prototype.fallenAsleep = function() {
		//TODO check that the arrow is still alive, etc

		//turn around
		switch(this.facing) {
			case 'left': this.setFacing('right'); break;
			case 'right': this.setFacing('left'); break;
			case 'up': this.setFacing('down'); break;
			case 'down': this.setFacing('up'); break;
		}

		this.state = 'asleep';
	}

	Arrow.prototype.setFacing = function(facing) {
		switch(facing) {
			case 'left':
				this.angle = 180;
				this.facing = 'left';
				break;
			case 'right':
				this.angle = 0;
				this.facing = 'right';
				break;
			case 'up':
				this.angle = 270;
				this.facing = 'up';
				break;
			case 'down':
				this.angle = 90;
				this.facing = 'down';
				break;
			default: 
				this.setFacing('right');
		}
	}

	Arrow.prototype.collideWorld = function(body, worldBody) {
		if(this.state == 'awake') {
			this.fallAsleep();
		}
	}

	exports.Arrow = Arrow;
})(this);
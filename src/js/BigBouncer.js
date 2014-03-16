(function(exports) {
	function BigBouncer(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'big-bouncer');
		this.priority = _.uniqueId();

		this.anchor.setTo(0.5, 0.5);
		this.body.setCircle(24, 32, 32);
		this.body.bounce.setTo(1, 1);
		
		this._initSpeed = 125; 
		this.sounds = {
			bounce: game.add.audio('big-bounce')
		};
	}

	BigBouncer.preload = function(game) {
		game.load.image('big-bouncer', 'assets/img/big_bouncer.png');		
		game.load.audio('big-bounce', ['assets/audio/big_bounce.mp3', 'assets/audio/big_bounce.ogg']);
	}

	BigBouncer.prototype = Object.create(Phaser.Sprite.prototype);
	BigBouncer.prototype.constructor = BigBouncer;

	//need this to prevent bouncers from activating before the player has started the game
	BigBouncer.prototype.start = function() {
		this.body.velocity.x = this.game.rnd.realInRange(-1, 1);
		this.body.velocity.y = this.game.rnd.realInRange(-1, 1);
		this.body.velocity.setMagnitude(this._initSpeed);
	}

	BigBouncer.prototype.collideFriend = function(me, friend) {
		if(friend instanceof BigBouncer && friend.priority > this.priority)
			return; //let the higher priority bouncer play the sound	
		else 
			this.sounds.bounce.play();
	}

	BigBouncer.prototype.collideWorld = function(me, world) {
		this.sounds.bounce.play();
	}

	exports.BigBouncer = BigBouncer;

})(this);
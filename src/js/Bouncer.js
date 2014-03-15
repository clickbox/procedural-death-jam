(function(exports) {
	function Bouncer(game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, 'bouncer');
		this.priority = _.uniqueId();

		this.anchor.setTo(0.5, 0.5);
		this.body.setCircle(10, 16, 16);
		this.body.bounce.setTo(1, 1);
		
		this._initSpeed = Bouncer.speed[speed] || Bouncer.speed.slow;
		this.sounds = {
			bounce: game.add.audio('bounce')
		};
	}

	Bouncer.speed = {
		slow: 150,
		fast: 200,
		faster: 300
	}

	Bouncer.preload = function(game) {
		game.load.image('bouncer', 'assets/img/bouncer.png');		
		game.load.audio('bounce', ['assets/audio/bounce.mp3', 'assets/audio/bounce.ogg']);
	}

	Bouncer.prototype = Object.create(Phaser.Sprite.prototype);
	Bouncer.prototype.constructor = Bouncer;

	//need this to prevent bouncers from activating before the player has started the game
	Bouncer.prototype.start = function() {
		this.body.velocity.x = this.game.rnd.realInRange(-1, 1);
		this.body.velocity.y = this.game.rnd.realInRange(-1, 1);
		this.body.velocity.setMagnitude(this._initSpeed);
	}

	Bouncer.prototype.collideFriend = function(me, friend) {
		if(friend instanceof Bouncer && friend.priority > this.priority)
			return; //let the higher priority bouncer play the sound	
		else 
			this.sounds.bounce.play();
	}

	Bouncer.prototype.collideWorld = function(me, world) {
		this.sounds.bounce.play();
	}

	exports.Bouncer = Bouncer;

})(this);
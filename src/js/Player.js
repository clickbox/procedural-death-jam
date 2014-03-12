(function(exports) {
	var keys = {};

	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');
		this.anchor.setTo(0.5,0.5);
	
		this.animations.add('cycle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 30, true);
		this.animations.play('cycle');

		var emitter = this.game.add.emitter(0, 0, 25);
		emitter.makeParticles('rainbow-debris', [0,1,2,3,4,5,6,7,8,9,10,11], 75);
		emitter.maxRotation = 0;
		emitter.maxParticleSpeed.setTo(400, 400); 
		emitter.minParticleSpeed.setTo(-400, -400);
		emitter.gravity = 0;
		emitter.lifespan = 5000;
		this.emitter = emitter;

		this.sounds = {
			killed: game.add.audio('player-killed')
		}

		this.body.setRectangle(undefined, undefined, 0, 0);
		this.body.collideWorldBounds = true;
		//this.body.collideCallback = this.collideCallback;
		//this.body.collideCallbackContext = this;
		this.body.bounce.setTo(0,0);

		this.dir = 'down';
		this.controls = {
			velocity: new Phaser.Point()
		};

		var keyboard = game.input.keyboard;

		keys.w = keyboard.addKey(Phaser.Keyboard.W);
		keys.s = keyboard.addKey(Phaser.Keyboard.S);
		keys.a = keyboard.addKey(Phaser.Keyboard.A);
		keys.d = keyboard.addKey(Phaser.Keyboard.D);

		keys.up = keyboard.addKey(Phaser.Keyboard.UP);
		keys.down = keyboard.addKey(Phaser.Keyboard.DOWN);
		keys.left = keyboard.addKey(Phaser.Keyboard.LEFT);
		keys.right = keyboard.addKey(Phaser.Keyboard.RIGHT);

		keys.w.onDown.add(onUp, this);
		keys.up.onDown.add(onUp, this);
		keys.s.onDown.add(onDown, this);
		keys.down.onDown.add(onDown, this);
		keys.a.onDown.add(onLeft, this);
		keys.left.onDown.add(onLeft, this);
		keys.d.onDown.add(onRight, this);
		keys.right.onDown.add(onRight,this);

		keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
	}

	Player.preload = function(game) {
		game.load.spritesheet('player', 'assets/spritesheet/player.png', 10, 10);
		game.load.spritesheet('rainbow-debris', 'assets/spritesheet/rainbow_debris.png', 2, 2);
		game.load.audio('player-killed', ['assets/audio/player_killed.mp3', 'assets/audio/player_killed.ogg']);
	}

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.VELOCITY = 200;

	Player.prototype.update = function() {
		this.body.velocity.copyFrom(this.controls.velocity);
		this.body.velocity.setMagnitude(Player.VELOCITY);
	}

	Player.prototype.collideCallback = function(dir, thisBody, thatBody) {
		console.log('player collided');
	}

	Player.prototype.collideThreat = function(thisBody, threatBody) {
		console.log('collided with threat');
		this.sounds.killed.play();
		this.emitter.x = this.body.x;
		this.emitter.y = this.body.y;
		this.emitter.start(true, 5000, 0, 75);
		this.kill();
	}

	function onUp() {
		if(this.dir != 'down') {
			this.controls.velocity.setTo(0, -1);
			this.dir = 'up';
		}
	}

	function onDown() {
		if(this.dir != 'up') {
			this.controls.velocity.setTo(0, 1);
			this.dir = 'down';
		}	
	}

	function onLeft() {
	if(this.dir != 'right') {
			this.controls.velocity.setTo(-1, 0);
			this.dir = 'left';
		}
	}

	function onRight() {
		if(this.dir != 'left') {
			this.controls.velocity.setTo(1, 0);
			this.dir = 'right';
		}
	}

	exports.Player = Player;

})(this);

(function(exports) {
	var keys = {};

	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'player');
	this.anchor.setTo(0.5,0.5);
	
		this.body.velocity.y = Player.VELOCITY;
		this.dir = 'down';

		this.body.setRectangle(undefined, undefined, 0, 0);
		this.body.collideWorldBounds = true;
		this.body.collideCallback = this.collideCallback;
		this.body.collideCallbackContext = this;
		this.body.bounce.setTo(0,0);

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
		game.load.image('player', 'assets/img/player.png');
	}

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.VELOCITY = 200;

	Player.prototype.update = function() {
		this.body.velocity.copyFrom(this.controls.velocity);
		this.body.velocity.setMagnitude(Player.VELOCITY);
	}

	Player.prototype.collideCallback = function(dir, thisBody, thatBody) {
		console.log('it worked');
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

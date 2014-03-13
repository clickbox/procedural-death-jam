(function(exports) {
	function Waypoint(x, y) {
		this.x = x;
		this.y = y;
		this.next = null;
	}

	Waypoint.prototype = {
		to: function(x, y) {
			this.next = new Waypoint(x, y);
			return this.next;
		}
	};

	function Patroller(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'patroller');

	this.animations.add('idle', [0,1], 1, true);
		this.animations.play('idle');

		this.body.setRectangle(36, 36, 2, 2);
		this.anchor.setTo(0.5, 0.5);
	}

	Patroller.preload = function(game) {
		game.load.spritesheet('patroller', 'assets/spritesheet/patroller.png', 40, 40);
	}

	Patroller.prototype = Object.create(Phaser.Sprite.prototype);
	Patroller.prototype.constructor = Patroller;

	Patroller.prototype.to = function(x, y) {
		this.firstWaypoint = new Waypoint(x,y);
		return this.firstWaypoint; 
	}

	Patroller.prototype.start = function() {
		var prev = { x: this.x, y: this.y },
			waypoint = this.firstWaypoint,
			tween = this.game.add.tween(this);

		do {
			var duration = this.game.math.distance(prev.x, prev.y, waypoint.x, waypoint.y) / Patroller.SPEED;
			tween = tween.to({ x: waypoint.x, y: waypoint.y }, duration);
			prev.x = waypoint.x;
			prev.y = waypoint.y;
			waypoint = waypoint.next;
		}
		while(waypoint);

		tween.loop().start();
	}

	exports.Patroller = Patroller;
})(this);
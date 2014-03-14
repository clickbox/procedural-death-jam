(function(exports) {
	

	function FishGroup(game, dir, density) {
		Phaser.Group.call(this, game);

		// if the group spawns along a line, how far away must it be to 
		// avoid the corners when the group rotates?
		var hw = game.width / 2,
			hh = game.height / 2,
			dist = Math.sqrt(hw * hw + hh * hh);
		this.safeDist = hw - dist; 
		this.bottom = hh + dist;
		this.top = hh - dist;

		this.pivot.setTo(hw, hh);

		this.on = false;
	}

	FishGroup.prototype = Object.create(Phaser.Group.prototype);
	FishGroup.prototype.constructor = FishGroup;

	FishGroup.prototype.start = function() {
		this.on = true;
	}

	FishGroup.prototype.spawn = function() {
		var fish = 

		function tryAdd(obj) {
			var y = this.game.rnd.realInRange(this.top, this.bottom - obj.height),
				flag = true;
			this.forEachAlive(function(fish) {
				if(Math.abs(fish.body.y - y) < this.gap) 
					flag = false;
			}, this);

			if(flag) {
				obj.revive();
				obj.body.x = this.safeDist - obj.width;
				obj.body.y = y;
				return true;
			}
			else 
				return false;
		}
		tryAdd.bind(this, object);

		for(var i = 0; i < 30 && !tryAdd(); i++) {}
	}); 

	FishGroup.prototype.update = function() {
		if(this.on) {

		}
	}

	exports.FishGroup = FishGroup;
})(this);

(function(exports) {
	function Fish(game, start, dir, player) {
		Phaser.Sprite.call(this, game, 0, 0, 'fish');

		if(dir === undefined) dir = 'right';
		this.dir = dir;
		this.player = player;

		this.body.setRectangle(19, 12, 2, 12);
		
		this.inWorldThreshold = 50;
		this.outOfBoundsKill = true;
		this.events.onKilled.add(function() {
			//TODO toggle the direction @ random?
			this.moveToStart();
			this.revive();
			this.start();
		}, this);

		this.moveToStart();
	}

	Fish.preload = function(game) {
		game.load.image('fish', 'assets/img/fish.png');
	}

	Fish.prototype = Object.create(Phaser.Sprite.prototype);
	Fish.prototype.constructor = Fish;

	Fish.prototype.start = function() {

	}

	//TODO determine these based on direction
	Fish.prototype.moveToStart = function() {
		switch(this.dir) {
			case 'right':
				this.angle = 0;
				this.body.x = 0 - this.width;
				this.body.y = 20 + this.game.rnd.integerInRange();
				break;
			case 'left':
				this.angle = 180;
				this.body.x = 400;
				this.body.y = 20 + this.game.rnd.integerInRange();
			//TODO other directions...
		}
	}


	Fish.prototype.processWorld = function() {
		return false;
	}

	exports.Fish = Fish;

})(this);
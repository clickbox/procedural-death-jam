(function(exports) {

	function ThreatBuilder(player) {
		this.player = player;
		this.game = player.game;
		this.threats = [];
	}

	ThreatBuilder.prototype = {
		arrow: function(x, y, dir) {
			var arrow = new Arrow(this.game, x, y, dir, this.player); 
			this.threats.push(arrow);
			return arrow;
		},

		bouncer: function(x, y) {
			var bouncer = new Bouncer(this.game, x, y);
			this.threats.push(bouncer);
			
			//bouncers should hold still until the player enters their first movement command
			if(this.game.level == 0) 
				this.player.events.onInput.addOnce(bouncer.start, bouncer);
			else
				bouncer.start();

			return bouncer;
		}
	}

	exports.ThreatBuilder = ThreatBuilder;
})(this);
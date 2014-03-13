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
			return bouncer;
		},

		//TODO make this enemy less bland-- and also make it work!
		chaser: function(x, y) {
			var chaser = new Chaser(this.game, x, y, this.player);
			this.threats.push(chaser);
			return chaser;
		},

		patroller: function(x, y) {
			var patroller = new Patroller(this.game, x, y);
			this.threats.push(patroller);
			return patroller;
		},

		start: function() {
			if(this.game.level == 0)
				this.player.events.onInput.addOnce(this.startNow, this);
			else
				this.startNow();
		},

		startNow: function() {
			_(this.threats).forEach(function(threat) { 
				if(threat.start) threat.start();
			});
		}
	}

	exports.ThreatBuilder = ThreatBuilder;
})(this);
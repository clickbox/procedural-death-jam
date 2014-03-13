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
			this.holdForInput(bouncer);	
			return bouncer;
		},

		chaser: function(x, y) {
			var chaser = new Chaser(this.game, x, y, this.player);
			this.threats.push(chaser);
			this.holdForInput(chaser);
			return chaser;
		},

		//utility
		holdForInput: function(threat) {
			if(this.game.level == 0) 
				this.player.events.onInput.addOnce(threat.start, threat);
			else
				threat.start();
		}
	}

	exports.ThreatBuilder = ThreatBuilder;
})(this);
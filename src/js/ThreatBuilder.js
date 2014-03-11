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
		}
	}

	exports.ThreatBuilder = ThreatBuilder;
})(this);
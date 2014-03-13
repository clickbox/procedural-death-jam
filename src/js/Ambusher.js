(function(exports) {
	function Ambusher(game, x, y, player) {
		Phaser.Sprite.call(game, x, y, chaser);

		this.animations.add('asleep', []);
		this.animations.add('waking', [], 20, true);
		this.animations.add('awake', [], 30, true);

		this.animations.play('asleep');
		
		this.state = 'asleep';
		this.player = player;

		this.sounds = {
			playerSpotted: game.add.audio('player-spotted')
		}
	}

	Ambusher.

	exports.Ambusher = Ambusher;
})(this);
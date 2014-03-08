(function() {
	window.onload = function() {
		function GameState() {};
		GameState.prototype = {
			preload: function() {

			},

			create: function() {

			},

			update: function() {

			}
		};

		var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game-container');
		game.state.add('game', GameState);
		game.state.start('game');
	}
})();
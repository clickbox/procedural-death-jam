(function() {
	window.onload = function() {
		function GameState() {};
		GameState.prototype = {
			preload: function() {
				this.game.load.image('white', 'assets/img/white.png');
			},

			create: function() {
				var game = this.game;

				game.stage.backgroundColor = '6495ED';
				
				//make a wall around the outside
				var walls = game.add.group();
				walls.add(new Phaser.TileSprite(game, -2, -2, 404, 22, 'white'));
				walls.add(new Phaser.TileSprite(game, -2, -2, 22, 404, 'white'));
				walls.add(new Phaser.TileSprite(game, -2, 380, 404, 22, 'white'));
				walls.add(new Phaser.TileSprite(game, 380, -2, 22, 404, 'white'));

				walls.setAll('body.immovable', true);
				walls.forEach(function(wall) { wall.body.setRectangle(); });

				//add in the player
				var player = new Player(game, 200, 100);
				game.add.existing(player);

				//export the "globals"
				this.walls = walls;
				this.player = player;
			},

			update: function() {
				var game = this.game;
				game.physics.collide(this.player, this.walls);
			},

			render: function() {
				var game = this.game;
				game.debug.renderSpriteBounds(this.player, '#FF0000');
				this.walls.forEach(function(wall) { game.debug.renderSpriteBody(wall); });
			}
		};

		var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game-container');
		game.state.add('game', GameState);
		game.state.start('game');
	}
})();
(function() {
	window.onload = function() {
		function GameState() {};
		GameState.prototype = {
			preload: function() {
				this.game.load.image('white', 'assets/img/white.png');

				var game = this.game;
				Arrow.preload(game);
			},

			create: function() {
				var game = this.game;

				game.stage.backgroundColor = '6495ED';
				
				//make a wall around the outside
				var world = game.add.group();
				world.add(new Phaser.TileSprite(game, -2, -2, 404, 22, 'white'));
				world.add(new Phaser.TileSprite(game, -2, -2, 22, 404, 'white'));
				world.add(new Phaser.TileSprite(game, -2, 380, 404, 22, 'white'));
				world.add(new Phaser.TileSprite(game, 380, -2, 22, 404, 'white'));

				world.setAll('body.immovable', true);
				world.setAll('isWorld', true);
				world.forEach(function(wall) { wall.body.setRectangle(); });

				//add in the player
				var player = new Player(game, 200, 100);
				game.add.existing(player);

				var enemies = game.add.group();
				var arrow1 = new Arrow(game, 50, 50, 'right', player);
				var arrow2 = new Arrow(game, 350, 150, 'left', player);

				enemies.add(arrow1);
				enemies.add(arrow2);

				//export the "globals"
				this.world = world;
				this.enemies = enemies;
				this.player = player;
			},

			update: function() {
				var game = this.game;
				var world = this.world;

				game.physics.collide(this.player, this.world);
				this.enemies.forEach(function(enemy) {
					game.physics.collide(enemy, world, enemy.collideWorld, null, enemy);
				});
			},

			render: function() {
				var game = this.game;
				game.debug.renderSpriteBounds(this.player, '#FF0000');
				this.world.forEach(function(wall) { game.debug.renderSpriteBody(wall); });
			}
		};

		var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game-container');
		game.state.add('game', GameState);
		game.state.start('game');
	}
})();
(function() {
	window.onload = function() {
		function GameState() {};
		GameState.prototype = {
			preload: function() {
				var game = this.game;

				Player.preload(game);
				Arrow.preload(game);

				game.load.tilemap('empty-board', 'assets/tilemap/empty_board.json', null, Phaser.Tilemap.TILED_JSON);
				game.load.image('tiles', 'assets/img/tiles.png');
			},

			create: function() {
				var game = this.game;

				game.stage.backgroundColor = '6495ED';
				
				var board = game.add.tilemap('empty-board');
				board.addTilesetImage('Walls','tiles');
				board.setCollision(1);

				var layer = board.createLayer('Walls');

				//add in the player
				var player = new Player(game, 200, 100);
				game.add.existing(player);

				var enemies = game.add.group();
				var arrow1 = new Arrow(game, 50, 50, 'right', player);
				var arrow2 = new Arrow(game, 350, 150, 'left', player);

				enemies.add(arrow1);
				enemies.add(arrow2);

				//export the "globals"
				this.world = layer;
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
				game.debug.renderPhysicsBody(this.player.body);
				this.enemies.forEach(function(enemy) {
					game.debug.renderPhysicsBody(enemy.body);
				})
				//game.debug.renderSpriteBounds(this.player, '#FF0000');
			}
		};

		var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'game-container');
		game.state.add('game', GameState);
		game.state.start('game');
	}
})();
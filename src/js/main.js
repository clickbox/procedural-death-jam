(function() {
	window.onload = function() {
		function GameState() {};
		GameState.prototype = {
			preload: function() {
				var game = this.game;

				Player.preload(game);
				Coin.preload(game);
				Arrow.preload(game);

				game.load.tilemap('empty-board', 'assets/tilemap/empty_board.json', null, Phaser.Tilemap.TILED_JSON);
				game.load.image('tiles', 'assets/img/tiles.png');
			},

			create: function() {
				var game = this.game;

				game.stage.backgroundColor = '#6495ED';
				
				var board = game.add.tilemap('empty-board');
				board.addTilesetImage('Walls','tiles');
				board.setCollision(1);

				var layer = board.createLayer('Walls');

				//add in the player
				var player = new Player(game, 200, 200);
				game.add.existing(player);

				var enemies = game.add.group();
				enemies.add( new Arrow(game, 30, 50, 'right', player));
				enemies.add( new Arrow(game, 370, 150, 'left', player));
				enemies.add( new Arrow(game, 30, 250, 'right', player));
				enemies.add( new Arrow(game, 370, 350, 'left', player));

				//add in the coins
				var coins = new CoinGroup(game);
				var sounds = {
					pickupCoin: game.add.audio('pickup-coin')
				};

				coins.col(80, 40, 360);
				coins.col(320, 40, 360);

				//export the "globals"
				this.world = layer;
				this.enemies = enemies;
				this.coins = coins;
				this.player = player;
				this.sounds = sounds;
			},

			update: function() {
				var game = this.game;
				var world = this.world;
				var player = this.player;

				game.physics.collide(this.player, this.world);
				this.enemies.forEach(function(enemy) {
					game.physics.collide(enemy, world, enemy.collideWorld, null, enemy);
				});
			
				var sounds = this.sounds;	
				game.physics.overlap(player, this.coins, function(player, coin) {
					coin.kill();
					sounds.pickupCoin.play();
				});
			},

			render: function() {
				var game = this.game;
				//game.debug.renderPhysicsBody(this.player.body);
				//this.coins.forEach(function(enemy) {
				//	game.debug.renderPhysicsBody(enemy.body);
				//})
				//game.debug.renderSpriteBounds(this.player, '#FF0000');
			}
		};

		var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'game-container');
		game.state.add('game', GameState);
		game.state.start('game');
	}
})();
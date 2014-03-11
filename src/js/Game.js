(function(exports) {
	function Game() {}

	Game.prototype = { 
		preload: function() {
			this.game.load.image('coin', 'assets/img/coin.png');
		},

		create: function() {
			var game = this.game;

			game.stage.backgroundColor = '#6495ED';
			
		 	this.sounds = {
				pickupCoin: game.add.audio('pickup-coin')
			};

			// create the coin group
			this.world = game.add.group();
			this.coins = new CoinGroup(game);
			this.threats = game.add.group();
			this.player = new Player(game, 200, 200);
			game.add.existing(this.player);

			this.createLevel(sample_level);
		},

		update: function() {
			var game = this.game,
				player = this.player,
				threats = this.threats;

			//player -> world
			_.forEach(this.walls, function(wall) {
				game.physics.collide(player, wall, player.collideWorld, null, player);
				threats.forEach(function(threat) {
					game.physics.collide(threat, wall, threat.collideWorld, null, threat);
				});
			});

			_.forEach(this.hazard, function(hazard) {
				game.physics.collide(player, hazard);
				game.physics.collide(threats, hazard);
			});
			
			//player -> threats
			game.physics.collide(player, threats);

			// process player -> coin 	
			game.physics.overlap(player, this.coins, function(player, coin) {
				coin.kill();
				this.sounds.pickupCoin.play();
				if(this.coins.countLiving() == 0) { // Last coin collected
					console.log('The level is complete');
				}
			}, null, this);
		},

		render: function() {
			var game = this.game;
			//game.debug.renderPhysicsBody(this.player.body);
			//this.coins.forEach(function(enemy) {
		  //	game.debug.renderPhysicsBody(enemy.body);
		  //});
			//game.debug.renderSpriteBounds(this.player, '#FF0000');
		},

		createLevel: function(levelData) {
			//clear existing data
			this.walls = [];
			this.hazards = [];
			this.world.callAll('destroy');
			this.threats.callAll('destroy');
			this.coins.callAllExists('kill', false); //since we're keeping coins around

			//create the tilemaps
			if(levelData.world) {
				var mapCache = {};
				_.forEach(levelData.world, function(data) {
					var key = data.key || 'empty-board',
						name = data.name || 'Walls',
						map = null;
					
					if(mapCache[key])
						map = mapCache[key];
					else {
						map = new Phaser.Tilemap(this.game, key);
						map.addTilesetImage('Walls','tiles');
						map.setCollision(1);	
					}

					var layer = map.createLayer(name);
					if(data.hazard)
						this.hazards.push(layer);
					else
						this.walls.push(layer);
				}, this);
			}

			//create threats
			if(_.isFunction(levelData.threats)) {
				var builder = new ThreatBuilder(this.player);
				levelData.threats.call(builder);
				_.forEach(builder.threats, this.threats.add, this.threats);
			}

			//place coins
			if(_.isFunction(levelData.coins)) 
				levelData.coins.call(this.coins)
			
			
		}

	};

	exports.Game = Game;

})(this);

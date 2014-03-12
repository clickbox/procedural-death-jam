(function(exports) {
	function Game() {}

	Game.prototype = { 
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

			//TODO create a "rainbow emitter" subclass for this behavior
			var emitter = game.add.emitter(0, 0, 100);
			emitter.makeParticles('rainbow-debris', [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9, 10]);
			emitter.gravity = 0;
			emitter.minParticleSpeed.setTo(-50, -50);
			emitter.maxParticleSpeed.setTo(150, 150);
			emitter.maxRotation = 0;
			emitter.minRotation = 0;
			this.coinEmitter = emitter;

			//create the player
			this.player = new Player(game, 200, 200);
			this.player.events.onKilled.add(function() {

			});
			game.add.existing(this.player);

			//"procedurally" generate arena
			this.createLevel(sample_level);

			//TODO display instructions until key press
			var font = { font: '12px minecraftia', align: 'center'},
				howToMove = this.add.bitmapText(200, 100, 'cursor keys to move', font),
				whatToDo = this.add.bitmapText(200, 300, 'survive and collect', font); 

			howToMove.anchor.setTo(0.5, 0.5);
			whatToDo.anchor.setTo(0.5, 0.5);
			
			this.player.events.onInput.addOnce(function() {
				console.log('triggered!');
				game.add.tween(howToMove).to({ alpha: 0 }, 350, Phaser.Easing.Cubic.In)
					.start()
					.onComplete.add(howToMove.destroy, howToMove);
				game.add.tween(whatToDo).to({ alpha: 0 }, 350)
					.start()
					.onComplete.add(whatToDo.destroy, whatToDo);
			});

			//fade in to arena
			this.fadeFromBlack(0, 1000);

			var input = this.input;
			input.disabled = true;
			this.time.events.add(300, function() {
				input.disabled = false;
			});
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

			//TODO add back in hazard support?
			/* _.forEach(this.hazard, function(hazard) {
				game.physics.collide(player, hazard);
				game.physics.collide(threats, hazard);
			});*/
			
			//player -> threats
			game.physics.collide(player, threats, player.collideThreat, null, player); //TODO make this work both ways?

			// process player -> coin 	
			game.physics.overlap(player, this.coins, function(player, coin) {
				coin.kill();
				this.sounds.pickupCoin.play();
				this.coinEmitter.x = coin.x;
				this.coinEmitter.y = coin.y;
				this.coinEmitter.start(true, 300, 0, 5);
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
		},

		// (Number, Number) -> Phaser.Signal
		fadeFromBlack: function(pause, fadein) {
			if(pause === undefined) pause = 0;
			if(fadein === undefined) fadein = 1000;

			var fader = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'black'),
			 	tween = this.add.tween(fader).to({ alpha: 0 }, fadein);

			this.time.events.add(pause, tween.start, tween);

			tween.onComplete.add(fader.destroy, fader);
			return tween.onComplete;
		},

		// (Number, Number) -> Phaser.Signal
		fadeToBlack: function(fadeout, pause) {
			if(fadeout === undefined) fadeout = 1000;
			if(pause === undefined) pause = 0;

		var fader = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'black'),
			signal = new Phaser.Signal(),
			time = this.time;

			fader.width = this.game.width;
			fader.height = this.game.height;
			fader.alpha = 0;

			this.add.tween(fader).to({ alpha: 1 }, fadeout)
				.start()
				.onComplete(function() {
					time.events.add(pause, function() {
						fader.destroy();
						signal.dispatch();
					});
				});

			return signal;
		}
	};

	exports.Game = Game;

})(this);

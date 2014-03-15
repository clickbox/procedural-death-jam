(function(exports) {
	function Game() {
		FadingState.call(this);

		this.events = {
			onNextLevel: new Phaser.Signal()
		};
	}

	var MIN_TRAIL_ALPHA = 0.45,
		MAX_TRAIL_ALPHA = 0.96,
		MAX_TRAIL_AT_SCORE = 200; // this is low balling  it a bit
								  // a linear easing is probably not right for this...

	Game.prototype = Object.create(FadingState.prototype);
	Game.prototype.constructor = Game;

	_.extend(Game.prototype, { 
		create: function() {
			var game = this.game;

			game.level = -1;
			game.score = 0;
			this.difficulty = 0;

			game.stage.backgroundColor = '#6495ED';
			
			// setup map
			var map = this.add.tilemap('empty-board');
			map.addTilesetImage('Walls','tiles');
			map.setCollision(1);
			this.walls = map.createLayer('Walls');

			this.threats = game.add.group();
			this.coins = new CoinGroup(game);

		 	this.sounds = {
				pickupCoin: game.add.audio('pickup-coin')
			};

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
				this.trail.visible = false;
				this.time.events.add(2000, function() {
					this.fadeToBlack()
						.onComplete.add(function() {
							this.game.state.start('failure');
						}, this);
				}, this);
			}, this);
			game.add.existing(this.player);

			this.trail = new AlphaTrail(game, this.player);
			this.trail.alpha = MIN_TRAIL_ALPHA;

			this.nextLevel();

			// display instructions until key press
			var font = { font: '12px minecraftia', align: 'center'},
				howToMove = this.add.bitmapText(200, 100, 'cursor keys to move', font),
				whatToDo = this.add.bitmapText(200, 300, 'survive and collect', font); 

			howToMove.anchor.setTo(0.5, 0.5);
			whatToDo.anchor.setTo(0.5, 0.5);
			
			this.player.events.onInput.addOnce(function() {
				game.add.tween(howToMove).to({ alpha: 0 }, 550, Phaser.Easing.Cubic.In)
					.start()
					.onComplete.add(howToMove.destroy, howToMove);
				game.add.tween(whatToDo).to({ alpha: 0 }, 550, Phaser.Easing.Cubic.In)
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
			game.physics.collide(player, this.walls, player.collideWorld, null, player);
			threats.forEach(function(threat) {
				game.physics.collide(threat, this.walls, threat.collideWorld, threat.processWorld, threat);
			});

			//player -> threats
			game.physics.collide(player, threats, player.collideThreat, null, player); //TODO make this work both ways?

			// process player -> coin 	
			game.physics.overlap(player, this.coins, function(player, coin) {
				this.game.score += 1;
				coin.kill();
				this.sounds.pickupCoin.play();
				this.coinEmitter.x = coin.x;
				this.coinEmitter.y = coin.y;
				this.coinEmitter.start(true, 300, 0, 5);
				if(this.coins.countLiving() == 0) { // Last coin collected
					this.nextLevel();
				}
				this.trail.alpha = this.math.linear(MIN_TRAIL_ALPHA, MAX_TRAIL_ALPHA, Math.min(1, this.game.score / MAX_TRAIL_AT_SCORE));
			}, null, this);

			this.trail.update();
		},

		render: function() {
			var game = this.game;
			//game.debug.renderPhysicsBody(this.player.body);
			/*
			this.threats.forEach(function(enemy) {
			  	game.debug.renderPhysicsBody(enemy.body);
		    });
			*/
			//game.debug.renderSpriteBounds(this.player, '#FF0000');
		},

		createLevel: function(partials, grid) {
			//clear existing data
			this.threats.removeAll();
			this.coins.callAllExists('kill', false); //since we're keeping coins around

			var builder = new ThreatBuilder(this.player);

			//process the partials
			_.forEach(partials, function(partial) {
				if(partial.threats) partial.threats.call(builder);
			}, this);

			_.forEach(builder.threats, this.threats.add, this.threats);
			builder.start();
		},

		nextLevel: function() {
			this.game.level++;
			this.difficulty += 2;
			this.events.onNextLevel.dispatch();

			var generator = new LevelGenerator(this.rnd);
			generator.difficulty.target = this.difficulty;
			var partials = generator.generate();

			this.createLevel(partials, generator.grid);
		}
	});

	exports.Game = Game;

})(this);

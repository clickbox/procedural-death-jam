window.onload = function() {
	var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'game-container');
	game.state.add('boot', Boot);
	game.state.add('preloader', Preloader);
	game.state.add('game', Game);
	
	game.state.start('boot');
}
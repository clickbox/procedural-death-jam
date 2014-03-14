(function(exports) {
	function AlphaTrail(game, target) {
		var buffers = [];
		buffers[0] = game.add.renderTexture(_.uniqueId('buffer-'), game.width, game.height);
		buffers[1] = game.add.renderTexture(_.uniqueId('buffer-'), game.width, game.height);
		this.buffers = buffers;

		var sprites = [];
		sprites[0] = game.add.sprite(0, 0, buffers[0]);
		sprites[1] = game.add.sprite(0, 0, buffers[1]);

		sprites[0].visible = false;
		sprites[1].visible = false;
		this.sprites = sprites;

		this.alpha = 0.50; //alpha above a certain level (94%) leaves artifacting, and will require periodic
						   // drops to a lower percent to help "clean" the back buffer
		this.target = target;
		this.visible = true;
		this._count = 1;
	}

	AlphaTrail.prototype = {
		update: function() {
			var new_idx = this._count % 2,
				old_idx =  (this._count + 1) % 2,
				newBuffer = this.buffers[new_idx],	// where the new frame with be rendered
				oldSprite = this.sprites[old_idx],
				newSprite = this.sprites[new_idx];
			
			newSprite.visible = true;
			oldSprite.visible = false;

			newBuffer.renderXY(oldSprite, 0, 0, true, true);
			if(this.visible) newBuffer.renderXY(this.target, this.target.x, this.target.y, false, true);

			this._count++;
		}
	};

	Object.defineProperty(AlphaTrail.prototype, 'alpha', {
		get: function() {
			return this.sprites[0].alpha;
		},
		set: function(val) {
			this.sprites[0].alpha = val;
			this.sprites[1].alpha = val;
		}
	});

	exports.AlphaTrail = AlphaTrail;
})(this);
(function(exports) {
	function Grid(width, height) {
		this._tiles = [];
		this._width = Math.max(width || 1, 1);
		this._height = Math.max(height || 1, 1);

		this.resize(this._width, this._height);
	}

	Grid.prototype = {
		resize: function(w, h) {
			this._tiles = [];
			var size = w * h;
			for(var i = 0; i < size; i++) 
				this._tiles[i] = 0;
		},

		get: function(x, y) {
			var idx = this._indexOf(x, y);
			return idx >= 0 ? this._tiles[idx] : null;
		},

		set: function(val, x, y) {
			var idx = this._indexOf(x, y);
			if(idx >= 0)
				this._tiles[idx] = val;
		},

		fill: function(val, x, y, w, h) {
			for(var i = 0; i < w; i++) {
				for(var j = 0; j < h; j++) {
					this.set(val, x + i, y + j);
				}
			}
		},

		copy: function(grid, x, y, zeroIsTransparent) {
			if(zeroIsTransparent === undefined) zeroIsTransparent = true;
			for(var i = 0; i < grid.width; i++) {
				for(var j = 0; j < grid.height; j++) {
					var val = grid.get(i, j);
					if(val > 0 || !zeroIsTransparent)
						this.set(val, x + i, y + j);
				}
			}
		},

		clear: function() {
			this.fill(0, 0, 0, this.width, this.height);
		},

		forEach: function(fn, ctx, x, y, w, h) {
			if(x === undefined) x = 0;
			if(y === undefined) y = 0;
			if(w === undefined) w = this.width;
			if(h === undefined) h = this.height;
			
			for(var i = 0; i < this.width; i++) {
				for(var j = 0; j < this.height; j++) {
					var val = this.get(i, j);
					fn.call(ctx, val, x + i, y + j);
				}
			}
		},

		test: function(check, x, y, w, h) {
			for(var i = 0; i < this.width; i++) {
				for(var j = 0; j < this.height; j++) {
					var val = this.get(x + i, y + j);
					if( check(val) ) return true;
				}
			}
			return false;
		},

		gt: function(val, x, y, w, h) {
			return this.test(function(tile) {
				return tile > val;
			}, x, y, w, h);
		},

		geq: function(val, x, y, w, h) {
			return this.test(function(tile) {
				return tile >= val;
			}, x, y, w, h);
		},

		_indexOf: function(x, y) {
			if(x < 0 || x > this.width || y < 0 || y > this.height) 
				return -1;
			return this.width * y + x;
		},

		print: function() {
			for(var x = 0; x < this.width; x++) {
				var row = [];				
				for(var y = 0; y < this.height; y++) 
					row.push(this.get(x,y));
			console.log(row.join(' '));
			}
		}
	};

	Object.defineProperty(Grid.prototype, 'width', {
		get: function() { return this._width; }
	});

	Object.defineProperty(Grid.prototype, 'height', {
		get: function() { return this._height; }
	});

	exports.Grid = Grid;
})(this);
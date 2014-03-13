(function(exports) {
	
	function CoinGroup(game) {
		Phaser.Group.call(this, game);	
	}

	CoinGroup.DEFAULT_GAP = 20;

	CoinGroup.prototype = Object.create(Phaser.Group.prototype);
	CoinGroup.prototype.constructor = CoinGroup;

	CoinGroup.prototype.row = function(y, startx, endx, gap) {
		if(gap === undefined) gap = CoinGroup.DEFAULT_GAP;
		if(startx > endx) {
			var tmp = endx;
			endx = startx;
			startx = tmp;
		}

		for(var x = startx; x <= endx; x += gap) {
			this.coinAt(x, y);
		} 
	}

	CoinGroup.prototype.col = function(x, starty, endy, gap) {
		if(gap === undefined) gap = CoinGroup.DEFAULT_GAP;
		if(starty > endy) {
			var tmp = endy;
			endy = starty;
			starty = tmp;
		}

		for(var y = starty; y <= endy; y += gap) {
			this.coinAt(x, y);
		} 
	}

	CoinGroup.prototype.arc = function(x, y, radius, start, end, gap) {
		if(gap === undefined) gap = CoinGroup.DEFAULT_GAP;
		if(start > end) {
			var tmp = end;
			end = start;
			start =tmp;
		}

		var d_theta = gap / radius;
		for(var theta = start; theta <= end; theta += d_theta) {
			this.coinAt( x + Math.cos(theta) * radius, y + Math.sin(theta) * radius);
		}
	}


	/*CoinGroup.prototype.angle = function(x, y, radius, start, end, gap) {
		this.arc(x, y, radius, this.math.degToRad(start), this.math.degToRad(end), gap);
	}*/

	//TODO maybe add some logic to avoid stacking coins on top of each other?
	CoinGroup.prototype.coinAt = function(x, y) {
		var coin = this.getFirstExists(false);
		if(coin) {
			coin.revive();
			coin.body.x = x;
			coin.body.y = y;
		}
		else 
			this.add(new Coin(this.game, x, y));
	}

	exports.CoinGroup = CoinGroup;
})(this);
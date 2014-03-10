(function(exports) {
	function Preloader() {}

	Preloader.prototype = {
		preload: function() {
			this.progress = this.add.sprite('');
		}
	};

	exports.Preloader = Preloader;
})(this);
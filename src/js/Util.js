(function(exports) {
	exports.Util = {
		override: function(prototype, name, fn) {
			var super = prototype[name];
			prototype[name] = function() {
				var old_super = this._super;
				this._super = super;
				fn.apply(this, arguments);
				this._super = old_super;
			}
		}
	};
})(this);
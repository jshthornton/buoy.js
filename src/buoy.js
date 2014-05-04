(function(win, undefined) {
	'use strict';

	function _do($, _) {
		var $win = $(window),
			buoy = {
				_hash: [],
				_idCount: 0,

				register: function(opts) {
					opts = $.extend(true, {

					}, opts);

					var id = this._idCount++;

					this._hash.push({
						id: id
					});

					return id; 
				},

				unregister: function(id) {
					var index = _.findIndex(this._hash, { id: id });

					if(index === -1) {
						return false;
					}

					this._unregisterByIndex(index);
				},

				unregisterAll: function() {
					this._hash.length = 0;
				},

				_unregisterByIndex: function(index) {
					this._hash.splice(index, 1);
				},

				start: function() {
					$win.on('resize.buoy', 
						_.bind(
							_.debounce(
								this._onWindowAdjust, 
								100
							), 
							this
						)
					);

					this.check();
				},

				stop: function() {
					$win.off('resize.buoy');
				},

				_onWindowAdjust: function(e) {
					this._updateDimensions(e.type);

					this.check();
				},

				check: function() {
					_.each(this._hash, function(value, index) {

					}, this);
				}
			};

		return buoy;
	}

	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'underscore'], _do);
	} else {
		win.buoy = _do(jQuery, _);
	}
}(window));
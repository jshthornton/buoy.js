(function(win, undefined) {
	'use strict';

	var propMap = {
		'margin': 'margin-top',
		'top': 'top',
		'padding': 'padding-top',
		'transform': 'transform'
	};

	function _do($, _) {
		var $win = $(window),
			buoy = {
				align: function(opts) {
					opts = $.extend(true, {
						prop: 'margin',
						position: 50,
						elFn: 'height',
						containerFn: 'height'
					}, opts);

					var $el,
						percentage = opts.position / 100;

					for(var i = 0;; i++) {
						if(i === opts.$el.length || i === opts.$container.length) break;

						$el = opts.$el.eq(i);

						if($el[0].nodeName === 'IMG' && $el[0].complete === false) {
							this._imgBinder($el, opts.$container.eq(i), percentage, opts);
						} else {
							this._calculate($el, opts.$container.eq(i), percentage, opts);
						}
					}
				},

				_imgBinder: function($el, $container, percentage, opts) {
					$el.load($.proxy(function() {
						this._calculate($el, $container, percentage, opts);
					}, this));
				},

				_calculate: function($el, $container, percentage, opts) {
					var elHeight,
						containerHeight,
						offset,
						value;

					elHeight = $el[opts.elFn]();
					containerHeight = $container[opts.containerFn]();

					offset = (containerHeight * percentage) - (elHeight * percentage);

					if(offset < 0) {
						offset = 0;
					}

					value = '' + offset + 'px';

					if(opts.prop === 'transform') {
						value = 'translateY(' + value + ')';
					}

					$el.css(propMap[opts.prop], value);
				}
			};

		return buoy;
	}

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], _do);
	} else {
		win.buoy = _do(jQuery);
	}
}(window));
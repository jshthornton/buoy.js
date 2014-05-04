(function(win, undefined) {
	'use strict';

	function _do($, _) {
		var $win = $(window),
			buoy = {
				align: function(opts) {
					opts = $.extend(true, {
						prop: 'margin',
						position: 50
					}, opts);

					var i,
						$el,
						$container,
						elHeight,
						containerHeight,
						offset,
						propMap = {
							'margin': 'margin-top',
							'top': 'top',
							'padding': 'padding-top',
							'transform': 'transform'
						},
						value,
						percentage = opts.position / 100;

					for(i = 0; i < opts.$el.length, i < opts.$container.length; i++) {
						$el = opts.$el.eq(i);
						$container = opts.$container.eq(i);

						elHeight = $el.height();
						containerHeight = $container.height();

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
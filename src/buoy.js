(function(win, undefined) {
	'use strict';

	var propMap = {
		'margin': 'margin-top',
		'top': 'top',
		'padding': 'padding-top',
		'transform': 'transform'
	};

	function _do($) {
		var $win = $(window),
			/*
			A utility script which helps developers who need to vertically align elements with browsers that do not support the tranform trick.

			@class buoy
			@static
			@requires jQuery
			*/
			buoy = {
				/*
				Aligns a set of elements to a set of corresponding containers.

				@method align
				@param {Object} opts Options to alter how the alignment operates.
				@param {String} [opts.prop = 'margin'] Which property to alter:
				- margin => margin-top
				- top
				- padding => padding-top
				- transform
				@param {Number} [opts.position = 50] What percentage to position the elements at.
				@param {String} [opts.elFn = 'height'] What jQuery function to use to determine the element's height
				- height
				- innerHeight
				- outerHeight (No parameter support)
				@param {String} [opts.containerFn = 'height'] See `opts.elFn`.
				@param {jQuery} opts.$el A collection of elements to align to their correspoding containers.
				@param {jQuery} opts.$container A collection of elements to align to.
				When aligning the loop is synchronised so that `opts.$el[n]` aligns to `opts.$container[n]`. Any excess elements are ignored.
				*/
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
					$el.one('load', $.proxy(function() {
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

					offset = (containerHeight * percentage) - (elHeight / 2);

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
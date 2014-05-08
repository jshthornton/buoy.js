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

					//Loops until either i hits the length of $el or $container
					for(var i = 0;; i++) {
						if(i === opts.$el.length || i === opts.$container.length) break;

						$el = opts.$el.eq(i);

						//If the element is an image then it needs to calculate its dimensions after loading.
						//However we should check if it is already loaded, because if it is we can grab its dimension straight away.
						if($el[0].nodeName === 'IMG' && $el[0].complete === false) {
							//This operation has to take place in a separation function to preserve `i` as `load` is asynchronous.
							this._imgBinder($el, opts.$container.eq(i), percentage, opts);
						} else {
							this._calculate($el, opts.$container.eq(i), percentage, opts);
						}
					}
				},

				/*
				Calls `this._calculate` once the image has loaded.

				@method _imgBinder
				@protected
				@param {jQuery} $el The element (which is an image) to bind load.
				@param {jQuery} $container The element to align to.
				@param {Number} percentage The percentage to align to. Passed to reduce calculation cycles to recalculate.
				@param {Object} opts The original options sent to `this.align`.
				*/
				_imgBinder: function($el, $container, percentage, opts) {
					$el.one('load', $.proxy(function() {
						this._calculate($el, $container, percentage, opts);
					}, this));
				},

				/*
				Vertically aligns `$el` to `$container` based on the percentage.

				@method _calculate
				@protected
				@param {jQuery} $el The element to align.
				@param {jQuery} $container The element to align to.
				@param {Number} percentage The percentage to align to. Passed to reduce calculation cycles to recalculate.
				@param {Object} opts The original options sent to `this.align`.
				*/
				_calculate: function($el, $container, percentage, opts) {
					var elHeight,
						containerHeight,
						offset,
						value;

					elHeight = $el[opts.elFn](); //Get $el height
					containerHeight = $container[opts.containerFn](); //Get $container height

					offset = (containerHeight * percentage) - (elHeight / 2); //Get Y coordinate

					//Stops $el from being pushed too far up if the $container is too short.
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
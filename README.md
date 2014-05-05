buoy.js
===

buoy.js is a small utility script which helps the developer quickly vertically align an element to a container.

## Demos
http://codepen.io/Jshthornton/pen/aAdCH

## Usage
```
buoy.align({
	prop: 'margin', // The CSS method in which to use to position (margin 'margin-top' / top / padding 'padding-top'/ transform)
	$el: $('.inner'), // The element to vertically align
	$container: $('.container'), // The element to align to
	position: 50, // Percentage of the position. Example: 50 = 50%, thus $el is center aligned
	elFn: 'height', // The jQuery function to use to calculate height (height, innerHeight, outerHeight *False)
	containerFn: 'height' // The jQuery function to use to calculate height (height, innerHeight, outerHeight *False)
});
```
This is of course all of the options. However most of these options have a default value, allowing for a minimal setup such as:
```
buoy.align({
	$el: $('.inner'),
	$container: $('.container')
});
```

If you are experiencing the issue whereby the parent element is pushed down due to the margin then see this issue: 
http://stackoverflow.com/questions/2680478/margin-top-push-outer-div-down

The `$el` and `$container` are synchronised so that if the `$el` and `$container` contain more than 1 element then the alignment will occur on each `$el` with the corresponding `$container`.
For example, if `$el` contains 3 elements, and `$container` contains 2 elements, then the first element in `$el` will align to the first element in `$container` and the second with the second.
However the third in `$el` is ignored as it does not have a partner.

## Images
buoy automatically manages image dimensions so that they are calculated after it has loaded to ensure that the correct dimensions are used.
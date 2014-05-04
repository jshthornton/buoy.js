buoy.js
===

buoy.js is a small utility script which helps the developer quickly vertically align an element to a container.

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
If you are experiencing the issue whereby the parent element is pushed down due to the margin then see this issue: 
http://stackoverflow.com/questions/2680478/margin-top-push-outer-div-down
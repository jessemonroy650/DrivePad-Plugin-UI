/*
	DrivePad v0.8 - initial release. touch not working, yet.
*/
var drivePad = {
	self : null,
	Version : '0.8',
	theCallback : null,
	cx : null,
	cy : null,
	radius : null,
	//
	init : function(type, circleId, watchId, callback) {
		self = this;
		//alert("got init:" + type);
		// save the callback
		theCallback = callback;
		// assign a handler
		switch (type) {
			case 'click':
				watchId.addEventListener('click', drivePad.handleClick);
			break;
			case 'touch':
				watchId.addEventListener('touchstart', drivePad.handleTouch);
				watchId.addEventListener('touchend',   drivePad.handleTouch);
				watchId.addEventListener('touchmove',  drivePad.handleTouch);
			break;
		}
		//alert('added listener');
		// get the center of our circle, and it's radius
		// http://www.w3schools.com/js/js_function_invocation.asp
		var data = drivePad.getObjectCenter(circleId);
		drivePad.cx = data[0];
		drivePad.cy = data[1];
		drivePad.radius = data[2];
		//console.log('center', drivePad.cx, drivePad.cy, drivePad.radius);
	},
	handleClick : function(e) {
		// e = point clicked
		//console.log("page", e.pageX, e.pageY);
		x = e.pageX;
		y = e.pageY;

		results = drivePad.isPointInCircle(x, y, drivePad.cx, drivePad.cy, drivePad.radius);
		//console.log(results);
		theCallback({"x":x, "y":y, "inside":results});
	},
	handleTouch : function(evt) {
		theCallback(null);
	},
	//
	//
	//
	isPointInCircle : function(x, y, cx, cy, radius) {
		//console.log("checking", x, y, cx, cy, radius);
		return ((x-cx)*(x-cx)) + ((y-cy)*(y-cy)) < radius*radius;
	},
	getObjectCenter : function(myCircle) {
		alert('getObjectCenter');
		// myCircle = the circle on the screen
		// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect
		var boundObj = myCircle.getBoundingClientRect();
		var radius   = boundObj.height/2;
		// we'll use the left, top plus the radius to get our circle center
		var cx = boundObj.left + radius;
		var cy = boundObj.top + radius;
		//console.log("get", cx, cy, radius);
		return [cx, cy, radius];
	}

};



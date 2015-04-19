/*
	DrivePad v0.8.1 - initial release. touch not working, yet.
			v0.8.1 - 2015-04-18 - knocked out a nasty Phonegap/Android bug
*/
var drivePad = {
	Version : '0.8.1',
	theCallback : null,
	cx : null,
	cy : null,
	radius : null,
	//
	init : function(type, circleId, watchId, callback) {
		// save the callback
		theCallback = callback;
		// assign a handler
		switch (type) {
			case 'click':
				watchId.addEventListener('click', drivePad.handleClick);
			break;
			case 'touch':
				watchId.addEventListener('touchstart',  drivePad.handleTouch);
				watchId.addEventListener('touchend',    drivePad.handleTouchEnd);
				watchId.addEventListener('touchcancel', drivePad.handleTouchEnd);
				watchId.addEventListener('touchmove',   drivePad.handleTouch);
			break;
		}
		// get the center of our circle, and it's radius
		// http://www.w3schools.com/js/js_function_invocation.asp
	    // BUG: WebView (ala Phonegap/Android) has a rather nasty bug
    	// that requires assignment to a single object, then demuxing (as seen)
		var data = drivePad.getObjectCenter(circleId);
		drivePad.cx = data[0];
		drivePad.cy = data[1];
		drivePad.radius = data[2];
		alert('init done');
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
	//
	// http://www.w3.org/TR/touch-events/
	//
	handleTouch : function(e, altEndFlag) {
//alert('got a touch');
		// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#Example
		e.preventDefault();
		// We won't use targetTouches, since we may check for "touches" outside of our <div>
		//touchM = e.targetTouches;
		// http://stackoverflow.com/questions/9585487/cant-get-coordinates-of-touchevents-in-javascript-on-android-devices
		// We won't use 'touches', since 'touchend' and 'touchcanel' 
		// See W3C/Sect 5.6
		// "must not be included in the touches and targetTouches attributes."
		//touchM = e.touches;

		var x = 0; var y = 0;
		// According to the W3C/Sect 5.1, only 'changedTouches' is returned with every event
		touchM = e.changedTouches;
		if (touchM.length > 0) {
			touchE = touchM[0];
			x = touchE.pageX;
			y = touchE.pageY;
		}
//alert('isPointInCircle');
		var results = drivePad.isPointInCircle(x, y, drivePad.cx, drivePad.cy, drivePad.radius);
		altEndFlag = (typeof altEndFlag === 'undefined') ? false : true;
		theCallback({"x":x, "y":y, "inside":results, "end": altEndFlag});
alert('did callback');
	},
	handleTouchEnd : function(evt) {
		drivePad.handleTouch(evt, true);
	},
	//
	//
	//
	isPointInCircle : function(x, y, cx, cy, radius) {
		//console.log("checking", x, y, cx, cy, radius);
		return ((x-cx)*(x-cx)) + ((y-cy)*(y-cy)) < radius*radius;
	},
	getObjectCenter : function(myCircle) {
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



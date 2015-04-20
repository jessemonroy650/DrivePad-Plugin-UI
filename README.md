# DrivePad-Plugin-UI
A User Interface element to assist in driving robotic platforms, and other similar tasks.

If you would like to test the code before download it you can try it at codepen.

http://codepen.io/jessemonroy650/public/

At the bottom, you'll find the [i]UI Plugins[/i].
You want [b]DrivePad Plugin[/b].
NOTE: This example only works with mice (mouse clicks)

## README 

The Plugin has three (3) important components.

The HTML block, the CSS block, and the Plugin.

###HTML
		<div id=circle></div>

###CSS
	/* REMINDER: border-radius must always be half of height/width */
	#circle {
		height:280px;width:280px;border-radius:140px;
		background-color:#2222ee;
	}
###Plugin

The plugin has three important parts, initialize, callback, returned values.

**initialize**
```
		drivePad.init('touch', myCircle, myContent, myCallback);
```
* 'touch' or 'click' are the only two allowed paramters
* *myCircle*, the object reference of your circle, usually `document.getElementById()`
* *myContent*, the object reference of an object surrounding you "circle"
* *myCallback*, the function reference to your callback function

**callback**
Your function that does something with the data (returned values, below).

**returned values***
A JSON will be returned, that include "x", "y", "inside", & "end".

* "x" - the X coordinate of the touch or click
* "y" - the Y coordinate of the touch or click
* "inside" -  a boolean indicating if the touch or click was inside the circle
* "end" - for touch only, indicates the *end* of touches. That is, the finger was lifted.
















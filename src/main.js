require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, null); // 3rd argument true bypassing https requirement: not prod worthy

var json_loc, default_content, content, bl1, l2, bl3, bl4;

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings() {
	document.getElementById('text-input-id-0').value = date;
}

function paintMap() {
	date_val = document.getElementById('text-input-id-0').value;

	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get today's date and time
	var now = new Date().getTime();
	  
	// Find the distance between now and the count down date
	var distance = date_val - now;
	  
	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	  
	// Output the result in an element with id="demo"
	content = days + "d " + hours + "h "
	+ minutes + "m " + seconds + "s ";
	  
	// If the count down is over, write some text 
	if (distance < 0) {
	  clearInterval(x);
	  document.getElementById("demo").innerHTML = "EXPIRED";
	}
  }, 1000);

	default_content = "<p><h4><b>Content Builder SDK</b></p>";
	sdk.setSuperContent(default_content, (newSuperContent) => {});
	sdk.setContent(content);
	sdk.setData({
		json_loc: json_loc
	});
	localStorage.setItem('jsonlocationforblock', json_loc);
}

sdk.getData(function (data) {
	json_loc = data.json_loc || localStorage.getItem('jsonlocationforblock');
	paintSettings();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
});
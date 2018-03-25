function set_scroll() {
	function scrollHorizontally(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		document.getElementById('scrollmenu').scrollLeft -= (delta*40); // Multiplied by 40
		e.preventDefault();
	}
	if (document.getElementById('scrollmenu').addEventListener) {
		// IE9, Chrome, Safari, Opera
		document.getElementById('scrollmenu').addEventListener("mousewheel", scrollHorizontally, false);
		// Firefox
		document.getElementById('scrollmenu').addEventListener("DOMMouseScroll", scrollHorizontally, false);
	} else {
		// IE 6/7/8
		document.getElementById('scrollmenu').attachEvent("onmousewheel", scrollHorizontally);
	}

	$('.project').each(function(index, value){
	  var ths = this;
	  $(this).hover(function(){
	    $(ths).children('img').css('top', -6-$(ths).children('span').height())
	  }, function(){
	    $(ths).children('img').css('top', 0)
	  })
	})
}

if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
window.onmousemove = function(e) {
    var x = -(e.clientX - $(window).width()/2) / 83;
    var y = -(e.clientY - $(window).height()/2) / 83;
    $('.shadow').css('box-shadow', ''+x+'px '+y+'px 35px var(--box-shadow-color)')
}
}


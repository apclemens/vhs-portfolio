window.onkeyup = function(e) {
    if($(':focus').hasClass('disable-hotkey')){return;}
    var key = e.keyCode ? e.keyCode : e.which;
    switch(key) {
        case 65: // a
            transition_down(true);
            break;
        case 80: // p
            transition_to('/section_parts/projects', 0, '/projects', 'andrew clemens - projects', true);
            break;
        case 87: // w
            transition_to('/section_parts/websites', 1, '/websites', 'andrew clemens - websites', true);
            break;
        case 84: // t
            transition_to('/section_parts/themes', 2, '/themes', 'andrew clemens - themes', true);
            break;
        case 67: // c
            transition_to('/section_parts/contact', 3, '/contact', 'andrew clemens - contact', true);
            break;
    }
}

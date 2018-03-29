window.onpopstate = function(e) {
    if (e.state) {
        if (e.state.newtitle == "Andrew Clemens") {
            transition_to_home(false);
        } else {
            transition_to(e.state.page, e.state.index, e.state.newurl, e.state.newtitle, false);
        }
    } else {
        transition_to_home(false);
    }
};

function xtransition_to(page, index, newurl, newtitle, setstate) {
    document.title = newtitle;
    if (setstate) {
        window.history.pushState({
            "page": page,
            "index": index,
            "newurl": newurl,
            "newtitle": newtitle
        }, "", newurl);
    }
    if ($('#non-links').height() == 0) {
        // transition over to new thing
        transition_over(page, index);
    } else {
        // pull up header and show things
        transition_up(page, index);
    }
}

function create_section_div(page, top, left, width, height, backtop, backleft) {
	var div = document.createElement('div');
	div.classList.add('section');
	div.classList.add('dynamic');
	div.style.top = top;
	div.style.left = left;
	div.style.width = width;
	div.style.height = height;
	div.id = 'section';
	$(div).load('/section_parts/'+page+'.html');
	document.body.append(div);

	var back = document.createElement('div');
	back.classList.add('dynamic');
	back.style.top = backtop;
	back.style.left = backleft;
	back.id = 'back';
    back.onclick = function(){transition_to_home(true);};
	document.body.append(back);
}

function transition_to_about(setstate) {
    if(!set_state('about', setstate)){return;};
    new TWEEN.Tween(camera.rotation).to({
        x: Math.PI / 8,
        y: 0,
        z: Math.PI / 2
    }, 500).easing(TWEEN.Easing.Linear.None).start();
	setTimeout(function(){
    new TWEEN.Tween(camera.position).to({
        x: 0,
        y: 60,
        z: 252
    }, 500).easing(TWEEN.Easing.Linear.None).start();}, 500)
	create_section_div('about', '50%', '50%', '50%', '50%', '20%', '75%');
}

function transition_to_websites(setstate) {
    if(!set_state('websites', setstate)){return;};
    new TWEEN.Tween(camera.position).to({
        x: -18.5,
        y: -70,
        z: -16
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x: 1,
        y: -0.8,
        z: 0.2
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
	create_section_div('websites', '70%', '50%', '60%', '50%', '25%', '25%');
}

function transition_to_projects(setstate) {
    if(!set_state('projects', setstate)){return;};
    new TWEEN.Tween(camera.position).to({
        x: 25.8,
        y: 19,
        z: 44
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.9,
        z: 0
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
	create_section_div('projects', '50%', '35%', '30%', '90%', '20%', '75%');
}

function transition_to_themes(setstate) {
    if(!set_state('themes', setstate)){return;};
    new TWEEN.Tween(camera.position).to({
        x: -9.4,
        y: 21.6,
        z: 87
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x: -1,
        y: 0.2,
        z: 0.6
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
	create_section_div('themes', '50%', '50%', '50%', '50%', '25%', '25%');
}

function transition_to_contact(setstate) {
    if(!set_state('contact', setstate)){return;};
    new TWEEN.Tween(camera.position).to({
        x: 109.6,
        y: -43,
        z: 81
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x: -0.2,
        y: 0.4,
        z: 0.6
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
	create_section_div('contact', '50%', '50%', '50%', '50%', '25%', '25%');
}

function set_state(page, setstate) {
    var lookup = {
        'home': {'newtitle': 'Andrew Clemens', 'newurl': '/'},
        'about': {'newtitle': 'Andrew Clemens - about', 'newurl': '/about'},
        'projects': {'newtitle': 'Andrew Clemens - projects', 'newurl': '/projects'},
        'websites': {'newtitle': 'Andrew Clemens - websites', 'newurl': '/websites'},
        'themes': {'newtitle': 'Andrew Clemens - themes', 'newurl': '/themes'},
        'contact': {'newtitle': 'Andrew Clemens - contact', 'newurl': '/contact'},
    }
    if(document.title == lookup[page]['newtitle']) return false;
    document.title = lookup[page]['newtitle'];
    if (setstate)
        window.history.pushState({
        }, "", lookup[page]['newurl']);
    return true;
}

function transition_to_home(setstate) {
    if(!set_state('home', setstate)){return;};
    new TWEEN.Tween(camera.position).to({
        x:0,
        y:0,
        z:200
    }, 1000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x:0,
        y:0,
        z:0
    }, 1000).easing(TWEEN.Easing.Linear.None).onComplete(function(){
	    movingCamera = true;
	    currentBoundingBoxList = boundingBoxes;
    })
    .start();
    var list = document.getElementsByClassName('dynamic');
    while (list[0]){
        list[0].parentNode.removeChild(list[0]);
    }
}

function transition_over(page, index) {
    var prev_index = $('.section-page')[0].id.replace('section', '');
    var left;
    if (prev_index == index) {
        return;
    } else if (prev_index > index) {
        left = -$('#content').outerWidth();
    } else {
        left = $('#content').outerWidth();
    }
    $("#links>li:nth-child(" + (+prev_index + 1) + ")").removeClass('current');
    $('#section').append('<div class="section-page" id="section' + index + '" style="left: ' + left + 'px"></div>');
    $('#section' + index).load(page);

    $('.section-page').animate({
        'left': '-=' + left
    }, 500);
    $("#links>li:nth-child(" + (index + 1) + ")").addClass('current');
    $('#stem').animate({
        'left': '' + (25 * index + 12.5) + '%'
    }, 500, function() {
        $('#section' + prev_index).remove();
        $('.section-page').css('left', 0);
        if (index != 3) set_scroll();
    });
}

function transition_up(page, index) {
    $('#section').append('<div class="section-page" id="section' + index + '"></div>');
    $('#section' + index).css('top', -500);
    $('#section' + index).load(page);

    $('#non-links').animate({
        'height': 0
    }, 250);
    setTimeout(function() {
        $('#stem').css({
            'opacity': 1,
            'left': '' + (25 * index + 12.5) + '%'
        });
        $("#links>li:nth-child(" + (index + 1) + ")").addClass('current');
        $('#stem').animate({
            'height': 45
        }, 250)
    }, 250);
    setTimeout(function() {
        $('#section').animate({
            'height': 250
        }, 250);
        $('#section').css({
            'opacity': 1
        });
    }, 500);
    setTimeout(function() {
        $('#section' + index).animate({
            'top': 0
        }, 250)
    }, 750);
    setTimeout(function() {
        if (index != 3) set_scroll();
    }, 1100);
}

function transition_down(setstate) {
    if (document.title == 'andrew clemens') {
        return;
    }
    document.title = 'andrew clemens';
    if (setstate) {
        window.history.pushState({
            "newtitle": 'andrew clemens'
        }, "", '/');
    }
    setTimeout(function() {
        $('.section-page').animate({
            'top': -250
        }, 250);
    }, 0);
    setTimeout(function() {
        $('#section').animate({
            'height': 0
        }, 250);
    }, 250);
    setTimeout(function() {
        $("#links>li").removeClass('current');
        $('#stem').animate({
            'height': 0
        }, 250);
        $('#section').css({
            'opacity': 0
        });
    }, 500);
    setTimeout(function() {
        $('#non-links').animate({
            'height': 250
        }, 250);
        $('#stem').css({
            'opacity': 0
        });
    }, 750);

    setTimeout(function() {
        $('.section-page').remove()
    }, 1000);
}

function transition_open_front() {
    scene.children.forEach(function(obj) {
        if(obj.hasOwnProperty('loading_function')) obj.loading_function();
    })
}

function transition_open_about() {
    movingCamera = false;
    camera.position.set(0, 60, 252);
    camera.rotation.set(Math.PI/8, 0, Math.PI/2);
}

function transition_open_projects() {
    movingCamera = false;
    camera.position.set(25.8, 19, 44);
    camera.rotation.set(0, 1.9, 0);
}

function transition_open_websites() {
    movingCamera = false;
    camera.position.set(-18.5, -70, -16);
    camera.rotation.set(1, -0.8, 0.2);
}

function transition_open_themes() {
    movingCamera = false;
    camera.position.set(-9.4, 21.6, 87);
    camera.rotation.set(-1, 0.2, 0.6);
}

function transition_open_contact() {
    movingCamera = false;
    camera.position.set(109.6, -43, 81);
    camera.rotation.set(-0.2, 0.4, 0.6);
}

function transition_open_section(index) {
    var hh = new Audio("/resources/music/hollywood_heights.flac");
    hh.play();
    $('body').addClass('loaded');
    // indexes:
    //   -1: home
    //   -2: about
    //   0: projects
    //   1: websites
    //   2: themes
    //   3: contact
    switch (index) {
        case -1:
            transition_open_front();
            break;
        case -2:
            transition_open_about();
            break;
        case 0:
            transition_open_projects();
            break;
        case 1:
            transition_open_websites();
            break;
        case 2:
            transition_open_themes();
            break;
        case 3:
            transition_open_contact();
            break;
    }
}

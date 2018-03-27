$('#links').find('a').each(function(index, value) {
    $(this).click(function(event) {
        event.preventDefault();
        transition_to('/section_parts' + value.getAttribute('href'), index, value.getAttribute('href'), 'andrew clemens - ' + $(this).text(), true)
    });
});

window.onpopstate = function(e) {
    if (e.state) {
        if (e.state.newtitle == "andrew clemens") {
            transition_down(false);
        } else {
            transition_to(e.state.page, e.state.index, e.state.newurl, e.state.newtitle, false);
        }
    } else {
        transition_down(false);
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

function transition_to(page) {
    new TWEEN.Tween(camera.position).to({
        x: 8,
        y: 60,
        z: 200
    }, 2000).easing(TWEEN.Easing.Linear.None).start();
    new TWEEN.Tween(camera.rotation).to({
        x: Math.PI / 8,
        y: 0,
        z: Math.PI / 2
    }, 2000).easing(TWEEN.Easing.Linear.None).start();
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
    var height = $('#content').height();
    $('.dropdown').css('bottom', '+=300px');
    $('#content').css({
        'height': 0,
        'overflow': 'hidden',
    });
    $('#links li').css('bottom', -50);

    $('#content').animate({
        'height': height
    }, 500);
    setTimeout(function() {
        $('.dropdown').animate({
            'bottom': 0
        }, 500);
    }, 500);
    $('#links li').each(function(index) {
        var ths = this;
        setTimeout(function() {
            $(ths).animate({
                'bottom': 0
            }, 250);
        }, 100 * index + 900);
    });
    setTimeout(function() {
        $('#content').css({
            'height': 'auto',
        });
    }, 700)
    setTimeout(function() {
        $('#content').css({
            'overflow': 'visible',
        });
    }, 1450)
}

function transition_open_section(index) {
    if (index == -1) {
        transition_open_front();
        return;
    }
    $("#links>li:nth-child(" + (index + 1) + ")").addClass('current');
    $('#non-links').css('height', 0);
    $('#stem').css({
        'opacity': 1,
        'left': '' + (25 * index + 12.5) + '%'
    });
    $('#stem').css('height', 45);
    $('#section').css({
        'opacity': 1,
        'height': 250
    });
    $('#section' + index).css('top', 0);
    if (index != 3) set_scroll();
}

$('#header a').click(function(e) {
    e.preventDefault();
    if (document.title == 'andrew clemens') {
        return;
    }
    transition_down(true);
});

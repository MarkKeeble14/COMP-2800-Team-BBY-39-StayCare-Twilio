import $ from "jquery"
// This controls when the footer is visible. Currently it appears when you scroll up,
// and dissapears when you scroll down. 


    // Hide Header on on scroll down
    // These Variables don't persist, appear as undefined when console.logged
    let didScroll = false;
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $('footer').height();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
        // console.log(didScroll + ", " + lastScrollTop + ", " + delta + ", " + navbarHeight);
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            let footer = $('footer');
            console.log(footer);
            
                footer.classList.remove('nav-down');
                footer.classList.add('nav-up');
            
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('footer').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }

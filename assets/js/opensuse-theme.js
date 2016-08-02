// Functions for the mobile version
$(document).on('click', '#open_main_menu', openMobileMenu);

// Add swipe detection
$(document).on('ready', detectMobileScreen);

var screenWidth;
var menuOpen = false;

function detectMobileScreen() {
  screenWidth = $(window).outerWidth();
  if (screenWidth < 768) {
    if (!menuOpen) {
      $('.finger-detection-open-menu').on('swiperight', openMobileMenu);
    }
  }
}

function openMobileMenu () {
  if (menuOpen) {
    $('aside').css({'left': '-250px'});
    menuOpen = false;
  } else {
    $('aside').css({'left': '0px'});
    menuOpen = true;
    $('aside').on('swipeleft', openMobileMenu);
  }
}

var scrolled, mainSectionHeight, headerHeight, containerHeight;

// always initiate the scroll at the top
$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});

// get the height of the browser screen
$(window).on('resize', function() {
  headerHeight = $('header').outerHeight();
  mainSectionHeight = $('#opensuse-os').outerHeight() - headerHeight;
  //remove the height in the container of the main section 'home'
  $('#opensuse-os').css('height', '')
  containerHeight = $('#opensuse-os').outerHeight() + 30
})

$(window).bind('scroll',function(e){
  getScrolledData();
});

var $mainMenu;

$(function() {
  $mainMenu = $('#main-menu').html()
  $('aside').html($mainMenu)
  headerHeight = $('header').outerHeight();
  mainSectionHeight = $('#opensuse-os').outerHeight() - headerHeight;
})

var scrolledDown = false;

function getScrolledData() {
  scrolled = $(window).scrollTop();

  // Go to Top
  if ($(window).outerHeight()/2 < scrolled) {
    $(".go-to-top").fadeIn();
  }
  else {
    $(".go-to-top").fadeOut();
  }

  // detect if the user has scrolled more than the first section (height) to reduce the size of the menu
  if (scrolled > mainSectionHeight) {
    headerChanges()
    scrolledDown = true;
  }

  if (scrolledDown && scrolled < mainSectionHeight) {
    headerReset()
  }
}

function headerChanges() {
  $('header').css({
    background: moreInfoOpened ? '#6da741' : '#173f4f',
    top: '0px',
    height: '45px',
    padding: '8px',
    'z-index': '1000'
  })
  $('#opensuseLogo').css({
    height: '25px'
  })
  $('header ul li a').css({
    'font-size': '14px',
    'color': '#fff'
  })

}
function headerReset() {
  $('header').removeAttr('style')
  //but always keep the color applied from the scrolling
  $('header').css({
    background: moreInfoOpened ? '#6da741' : '#173f4f'
  })
  $('#opensuseLogo').removeAttr('style')
  $('header ul li a').removeAttr('style')
  $('header ul li a').css({
    'color': moreInfoOpened ? '#fff' : ''
  })
}

// init WOW.js
wow = new WOW(
  {
    offset: 30
  }
)
wow.init();

// init OWL slider

$(document).ready(function() {
  $("#owl-slide-news").owlCarousel({

  navigation : true,
  slideSpeed : 300,
  paginationSpeed : 400,
  singleItem : true,
  navigationText : ["&#xf053;","&#xf054;"]
  });
});


// tumbleweed opensuse more information

var moreInfoOpened = false;
var $osSelected, title, text, icon;

$(function() {
  $('#tumbleweed').on('click', function() {
    osMoreInformation($(this))
  })
  $('#openSUSE').on('click', function() {
    osMoreInformation($(this))
  })
})

function osMoreInformation(os) {

  moreInfoOpened = true
  //get the height of the main container
  containerHeight = $('#opensuse-os').outerHeight();
  

  //find the information of the selected distribution
  $osSelected = os
  osSelectedTitle = $osSelected.find("h1").html()
  osSelectedText = $osSelected.find(".hidden-content").html()
  osSelectedIcon = $osSelected.find(".distributions-icon").html()

  window.location.hash = osSelectedTitle;
  
  //dont let users click more than once
  $osSelected.addClass('not-clickable')

  // animation
  $('#opensuse-os .container-fluid').addClass('animated bounceOut')
  $('#opensuse-os').css({
    background: '#6da741'
  })
  $('header').css({
    background: moreInfoOpened ? '#6da741' : '#173f4f'
  })
  $('header ul li a').css({
    color: "#fff"
  })

  setTimeout(hideLandingPageInfo, 800)
  setTimeout(createMoreInformationArea, 1300)

  function hideLandingPageInfo () {
    $('#opensuse-os').css({
      height: containerHeight + 'px'
    })
    $('#opensuse-os .container-fluid').hide()
  }
  function createMoreInformationArea () {
    information = '<div class="text-center" id="more-information-os">'
                  + '<div class="os-icon"></div>'
                  + '<h1 class="wow fadeInUp">'
                  + osSelectedTitle
                  + '</h1>'
                  + '<div class="wow fadeInUp">'
                  + osSelectedText
                  + '</div>'
                  + '<br/>'
                  + '<div class="btn btn-link back-to-main-page">'
                  + '<i class="fa fa-long-arrow-left"></i>'
                  + '<span lang="en">Back to main page</span>'
                  + '</div>'
                  + '</div>'
    $('#opensuse-os').append(information)
    $('.os-icon').html(osSelectedIcon)

    $('.back-to-main-page').on('click', function() {
      history.pushState('', document.title, window.location.pathname);  
      backToMainPageOs($osSelected)
    })

    $('#home, #opensuseLogo').on('click', function() {
      history.pushState('', document.title, window.location.pathname);  
      scrolled = $(window).scrollTop();
      if (scrolled > mainSectionHeight) {
        setTimeout('backToMainPageOs($osSelected)', 900);

      } else
      {
        backToMainPageOs($osSelected)
      }
    })

  }
}

function backToMainPageOs (os) {
  moreInfoOpened = false;
  $('#more-information-os').addClass('animated bounceOut')
  $('header').removeAttr('style')
  $('header ul li a').removeAttr('style')
  $('#opensuse-os').removeAttr('style').css({
      height: containerHeight + 'px'
    })

  setTimeout(hideMoreInformation, 800)
  setTimeout(showMainInformation, 1300)

  function hideMoreInformation () {
    $('#more-information-os').hide()
    $('#more-information-os').remove()

  }

  function showMainInformation () {
    $('#opensuse-os .container-fluid').removeClass('animated bounceOut').show().addClass('animated bounceIn')
  }

  //make the area clickable again
  $osSelected = os
  $osSelected.removeClass('not-clickable')

}

//init particles background
/* Disabled for excessive CPU consumption
$(document).ready(function() {
  var colorParticles = 'rgba(255,255,255,0.07)'
  $('#opensuse-os').particleground({
    dotColor: colorParticles,
    lineColor: colorParticles
  });
});
*/

//Contribution interpolation

$(document).ready(function () {

  contributionInterpolation()

});

var contributionInterpolation = function () {
  $(document).on("click", '.contribute-code', function () {
    bounceBall($(this), 3, 250);
  })
  $(document).on("click", '.contribute-hardware', function () {
    bounceBall($(this), 3, 250);
  })

  function bounceBall(element, times, speed) {

    //dont let the user click on the ball while the description is open
    element.addClass('not-clickable');

    //add the class Active to the element
    element.addClass('active');

    //take the initial position of the element
    var x = element.offset().left - $(window).scrollLeft();
    var y = $(window).outerHeight() - (element.offset().top - $(window).scrollTop()) - element.outerHeight();
    var elementWidth = element.outerWidth();

    //make the element a position absolute element of the body removing it first from the original container
    var parent = element.parent();
    element.detach();
    $('#contribute-details').prepend(element).css({display: 'block'});
    //element.

    element.css({
      position: 'absolute',
      left: x + 'px',
      bottom: y + 'px',
      width: elementWidth + 'px'
    })

    for(var i = 0; i < times; i++) {
      distance =  y / (i+2) ;

      element.animate({bottom: 0}, speed, 'easeInQuad')
        .animate({bottom: '+='+distance}, speed, 'easeOutQuad');
      if (i === 2) {
        element.animate({bottom: 0}, 400, 'easeInQuad', function() {
          openContributionDetails()
        });
      }
    }

    var openContributionDetails = function () {
      var $closeDetails = '<button type="button" class="close-details btn btn-default" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
      var $detailsContent = parent.find('.hidden-content').html();
      var $details = "<div class='contribution-extended-details animated fadeInUp'>" + $detailsContent + "</div>"

      $("#contribute-details").css({background: 'rgba(109, 167, 65, 0.9)'})
        .append($details).append($closeDetails);

      //close the details
      $('.close-details').on("click", function() {
        //remove the Animated class first, to restart the effect in case the user
        //clicks more than once on the element
        parent.prepend(element).removeClass('animated fadeInUp');
        $('#contribute-details').fadeOut(function() {
          $(this).empty().removeAttr('style');
          element.removeAttr('style').removeClass('active');
          parent.prepend(element).addClass('animated fadeInUp');
          element.removeClass('not-clickable');
        })
      });

    }
  }

}

// check if SVG is supported by the user's browser
$(document).on("ready", function(){
  if (!Modernizr.svg) {
    //replace all the svg images for png
    $("img").each(function() {
      var currentValue = $(this).attr("src");
      var newValue = currentValue.replace(".svg", ".png");
      $(this).attr("src", newValue)
    });
    //add a class to the background of Contribute so the background is a .jpg
    $("#contribute-to-opensuse").addClass('no-svg')
  }
})

window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (key == 8 || key == 27) {
    history.pushState('', document.title, window.location.pathname);
    backToMainPageOs($osSelected);
  }
}

//smartbanner
$(document).ready(function () {
  function choiceSystem() {
    if (/(android)/i.test(navigator.userAgent)) {
      return 'android';
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      return 'ios';
    } else if (/windows phone/i.test(navigator.userAgent.toLowerCase())) {
      return 'windows';
    }
  }
  $.smartbanner({
    title: 'Growth - 成为顶尖开发者', // What the title of the app should be in the banner (defaults to <title>)
    author: "Phodal Huang", // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
    price: 'FREE', // Price of the app
    appStoreLanguage: 'us', // Language code for App Store
    inAppStore: 'On the App Store', // Text of price for iOS
    inGooglePlay: 'In Google Play', // Text of price for Android
    force: choiceSystem(),
    inWindowsStore: 'In the Windows Store', // Text of price for Windows
    button: '查看', // Text for the install button
    iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
    appendToSelector: 'body'
  });
});

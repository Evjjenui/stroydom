(function() {
  var initAccordion, initCarousel, initFancyBox, initMenu, initPrices, initProgress, initSteps, initUI, initVideoSHow;

  initCarousel = function() {
    $('.component-advantages .content-wrapper').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.component-popular__projects .projects-block').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.objects-slides .objects-block').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.works-grid').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToScroll: 1,
            rows: 2,
            slidesPerRow: 1
          }
        }
      ]
    });
    $('.component-steps__work .component-steps-content').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToScroll: 1,
            slidesToShow: 1,
            adaptiveHeight: true
          }
        }
      ]
    });
    return $('.our-advantages_slider').slick({
      responsive: [
        {
          breakpoint: 2560,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToScroll: 1,
            slidesToShow: 1
          }
        }
      ]
    });
  };

  initMenu = function() {
    $('.menu-btn').on('click', function() {
      return $('body').toggleClass('menu-opened');
    });
    return $(document).mouseup(function(e) {
      var menu;
      menu = $('.header__navigation-block, .menu-btn');
      if (!menu.is(e.target) && menu.has(e.target).length === 0) {
        $('body').removeClass('menu-opened');
      }
    });
  };

  initVideoSHow = function() {
    return $('.video_bg').on('click', function() {
      return $(this).addClass('hide');
    });
  };

  initAccordion = function() {
    $(".accordion-item__content").slideUp();
    $('.open-start').find('.accordion-item__content').stop().slideDown();
    return $('.accordion-item__title').on('click', function(e) {
      $(this).closest('.accordion-item').toggleClass('active');
      if ($('.accordion-item').hasClass('active')) {
        return $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideToggle();
      } else {
        return $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideUp();
      }
    });
  };

  initFancyBox = function() {
    $(".video > a, .project-visual__item a, .gallery-item a, .build-gallery a").fancybox({
      arrows: true,
      infobar: false,
      toolbar: false,
      transitionEffect: "fade",
      thumbs: {
        autoStart: true,
        axis: 'x'
      }
    });
    return $(".call-me > a").fancybox({
      arrows: false,
      infobar: false,
      toolbar: false
    });
  };

  initSteps = function() {
    var stepBack;
    stepBack = function() {
      return false;
    };
    stepBack = function() {
      console.log('Step back');
      if ($('#steps-calc').steps('previous')) {
        return setTimeout((function() {
          return stepBack();
        }), 600);
      }
    };
    return $('#steps-calc').steps({
      headerTag: '.hidden-title',
      bodyTag: '.step',
      transitionEffect: 'none',
      enablePagination: true,
      enableFinishButton: false,
      enableCancelButton: false,
      enableAllSteps: true,
      labels: {
        next: 'Далее',
        previous: 'Назад'
      },
      onInit: function(e) {
        $('a[href="#previous"]').addClass('previous');
        $('.previous').hide();
        return $('a[href="#previous"]').on('click', function() {
          return stepBack();
        });
      },
      onStepChanging: function(event, currentIndex, newIndex) {
        $('.steps-numbers p span').text(newIndex + 1);
        if (newIndex === $('.wizard .step').length - 1) {
          // $('.component-calculator__forms_controls, .steps.clearfix').hide()
          $('.component-calculator__forms_controls, .steps.clearfix').css({
            position: 'absolute',
            // transform: 'translate3d(100px,0px,0px)',
            visibility: 'hidden',
            opacity: '0'
          });
          $('.previous').css('display', 'inline-block');
        } else {
          
          // $('.component-calculator__forms_controls, .steps.clearfix').show()
          $('.component-calculator__forms_controls, .steps.clearfix').css({
            // transform: 'none'
            opacity: '1',
            visibility: 'visible'
          });
          $('.previous').hide();
        }
        return true;
      }
    });
  };

  initProgress = function() {
    var progressValue;
    progressValue = $('.project-progress').attr('data-progress');
    $('.percentage').css("left", progressValue + "%");
    $('.percentage span').text(progressValue);
    return $('.line__bg').css("width", progressValue + "%");
  };

  initUI = function() {
    return $('select').select2({
      minimumResultsForSearch: -1
    });
  };

  initPrices = function() {
    var priceForm;
    priceForm = $(".prices-form, .component-calculator");
    if ($("#material1, #material3").is(':checked')) {
      priceForm.addClass('type-one-active');
    } else {
      return;
    }
    return $("#material1, #material2, #material3").on('change', function(e) {
      priceForm.removeClass('type-one-active, type-three-active');
      if ($("#material1, #material3").is(':checked')) {
        priceForm.addClass('type-one-active');
      } else {
        priceForm.removeClass('type-one-active');
      }
      if ($("#material3").is(':checked')) {
        return priceForm.addClass('type-three-active');
      } else {

      }
    });
  };

  $(window).load(function() {
    return initPrices();
  });

  $(function() {
    initCarousel();
    initFancyBox();
    initMenu();
    initVideoSHow();
    initAccordion();
    initSteps();
    initProgress();
    return initUI();
  });

}).call(this);

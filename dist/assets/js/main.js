(function() {
  var initAccordion, initFancyBox, initMenu, initSteps, initVideoSHow;

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
    return $(".video > a, .project-visual__item a, .gallery-item a").fancybox({
      arrows: true,
      infobar: false,
      toolbar: false,
      transitionEffect: "fade"
    });
  };

  initSteps = function() {
    return $('#steps-calc').steps({
      headerTag: '.hidden-title',
      bodyTag: '.step',
      transitionEffect: 'fade',
      enablePagination: true,
      enableFinishButton: false,
      enableCancelButton: false,
      labels: {
        next: 'Далее'
      },
      onStepChanging: function(event, currentIndex, newIndex) {
        $('.steps-numbers p span').text(newIndex + 1);
        if (newIndex === $('.wizard .step').length - 1) {
          $('.component-calculator__forms_controls, .steps.clearfix').hide();
        }
        return true;
      }
    });
  };

  $(function() {
    initFancyBox();
    initMenu();
    initVideoSHow();
    initAccordion();
    return initSteps();
  });

}).call(this);

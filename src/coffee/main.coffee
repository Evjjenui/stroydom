initCarousel = ->
  $('.component-advantages .content-wrapper').slick(
    responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToShow: 1
          slidesToScroll: 1
      }
    ]
  )

  $('.component-popular__projects .projects-block').slick(
     responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToShow: 1
          slidesToScroll: 1
      }
    ]
  )

  $('.objects-slides .objects-block').slick(
     responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToShow: 1
          slidesToScroll: 1
      }
    ]
  )

  $('.works-grid').slick(
     responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToScroll: 1
          rows: 2
          slidesPerRow: 1
      }
    ]
  )

  $('.component-steps__work .component-steps-content').slick(
     responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToScroll: 1
          slidesToShow: 1
          adaptiveHeight: true
      }
    ]
  )

  $('.our-advantages_slider').slick(
     responsive: [
      {
        breakpoint: 2560
        settings: "unslick"
      }
      {
        breakpoint: 767
        settings:
          dots: true
          arrows: false
          infinite: true
          speed: 600
          slidesToScroll: 1
          slidesToShow: 1
      }
    ]
  )

initMenu = ->  
  $('.menu-btn').on 'click', ->
    $('body').toggleClass('menu-opened')

  $(document).mouseup (e) ->
    menu = $('.header__navigation-block, .menu-btn')
    if !menu.is(e.target) and menu.has(e.target).length == 0
      $('body').removeClass 'menu-opened'
    return

initVideoSHow = ->
  $('.video_bg').on 'click', ->
    $(this).addClass('hide')

initAccordion = ->
  $('.accordion-item__content').slideUp()

  $('.open-start').find('.accordion-item__content').stop().slideDown()

  $('.accordion-item__title').on 'click', (e) ->

    $(this).closest('.accordion-item').toggleClass('active')

    if $('.accordion-item').hasClass('active')
      $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideToggle()
    else
      $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideUp()

cabinetAccordion = ->
  if window.innerWidth < 640
    console.log (window.innerwidth)
    $('.cabinet_description-info').slideUp()

    $('.cabinet_description-sub-info .image, .cabinet_description-sub-info_text_item').slideUp()
    $('.show-info').on 'click', (e) ->
      $(this).toggleClass('active')
      $('.cabinet_description-info').slideToggle()
      $('.cabinet_description-sub-info .image, .cabinet_description-sub-info_text_item').slideToggle()

initFancyBox = ->
  $(".video > a, .project-visual__item a, .gallery-item a, .build-gallery a").fancybox(
    arrows: true
    infobar: false
    toolbar: false
    transitionEffect: "fade"
    thumbs : {
      autoStart : true
      axis      : 'x'
    }
  )
  $(".call-me > a").fancybox(
    arrows: false,
    infobar: false,
    toolbar: false,
  )

initSteps = ->
  form = $("#steps-calc")
  form.validate
    errorPlacement: (error, element) ->
      element.before error
    rules: {
      required: true
    }

  stepBack = -> false
  stepBack = -> 
    setTimeout((-> stepBack()), 200) if $('#steps-calc').steps('previous')
    $('a[href="#previous"]').show()
    
  $('#steps-calc').steps(
    headerTag: '.hidden-title'
    bodyTag: '.step'
    transitionEffect: 'none'
    enablePagination: true
    enableFinishButton: true
    enableCancelButton: false
    enableAllSteps: true
    labels:
      next: 'Далее'
      previous: 'Назад'
      finish: 'Рассчитать заново'

    onInit: (e) ->
      $('a[href="#previous"]').addClass('previous')
      $('a[href="#finish"]').addClass('finish-button')

    onFinished: (e) ->
      stepBack()

    onStepChanging: (event, currentIndex, newIndex) ->
      form.validate().settings.ignore = ':disabled,:hidden'
      
      if form.valid()
        $('.steps-numbers p span').text(newIndex + 1)

      if newIndex == $('.wizard .step').length - 1
        $('.component-calculator__forms_controls, .steps.clearfix').css(
          position: 'absolute',
          visibility: 'hidden',
          opacity: '0'
        )
        $('.previous').hide()
      else 
        $('.component-calculator__forms_controls, .steps.clearfix').css(
          opacity: '1'
          visibility: 'visible',
        )

      if currentIndex < newIndex
        form.find('.body:eq(' + newIndex + ') label.error').remove();
        form.find('.body:eq(' + newIndex + ') .error').removeClass('error');

      return form.valid()
  )

initProgress = ->
  progressValue = $('.project-progress').attr('data-progress')
  
  $('.percentage').css("left", progressValue + "%")
  $('.percentage span').text(progressValue)
  $('.line__bg').css("width", progressValue + "%")

initUI = ->
  $('select').select2(
    minimumResultsForSearch: -1
  )

initPrices = ->
  $('#steps-calc').calculator()

initTabs = ->
  $('.tab-nav').on 'click', (e) ->
    e.preventDefault()

    tabId = $(this).attr('href')

    $('.tab-item').hide()
    $('.tab-nav').removeClass('active')
    
    $(this).addClass('active')
    $('.prices-form').find(tabId).show()


$ ->
  initCarousel()
  initFancyBox()
  initMenu()
  initVideoSHow()
  initAccordion()
  initPrices()
  initProgress()
  initUI()
  cabinetAccordion()
  initTabs()

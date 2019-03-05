initCarousel = ->
  $('.component-advantages .content-wrapper').slick(
    responsive: [
      {
        breakpoint: 1920
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
        breakpoint: 1920
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
        breakpoint: 1920
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
        breakpoint: 1920
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
  $(".accordion-item__content").slideUp()

  $('.accordion-item__title').on 'click', (e) ->

    $(this).closest('.accordion-item').toggleClass('active')

    if $('.accordion-item').hasClass('active')
      $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideToggle()
    else
      $(this).closest('.accordion-item__title').next('.accordion-item__content').stop().slideUp()

initFancyBox = ->
  $(".video > a, .project-visual__item a, .gallery-item a").fancybox(
    arrows: true
    infobar: false
    toolbar: false
    transitionEffect: "fade"
  )

initSteps = ->
  $('#steps-calc').steps(
    headerTag: '.hidden-title'
    bodyTag: '.step'
    transitionEffect: 'fade'
    enablePagination: true
    enableFinishButton: false
    enableCancelButton: false
    labels:
      next: 'Далее'

    onStepChanging: (event, currentIndex, newIndex) ->
      $('.steps-numbers p span').text(newIndex + 1)

      if newIndex == $('.wizard .step').length - 1
        $('.component-calculator__forms_controls, .steps.clearfix').hide()

      return true
  )

$ ->
  initCarousel()
  initFancyBox()
  initMenu()
  initVideoSHow()
  initAccordion()
  initSteps()

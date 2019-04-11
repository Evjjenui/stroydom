$ = jQuery

$.fn.calculator = (options = {}) ->
  @each ->
    self = $(this)
    data = self.data('calculator')

    unless data
      self.data('calculator', new Calculator(this, options))

    if typeof options is 'string'
      data[options]()

class Calculator
  constructor: (@dom, options = {}) ->
    defaults =
      step: ".step"
      next: ".next"
      prev: ".prev"
      retreat: ".retreat"
      progress: {
        controls: ".component-calculator__forms_controls",
        current: ".component-calculator__forms_controls .current"
        total: ".component-calculator__forms_controls .total"
      }
      dots: {
        container: '.steps-dots'
        item: 'span'
      }

    @options = $.extend defaults, options

    @_setup()

  _setup: ->
    @container = $(@dom)
    @initialStep = @container.find("#{@options.step}.active")
    @steps = @container.find(@options.step)
    @wizard = @initialStep.find(".step-form input:checked").attr("id")
    @current = 0
    @total = 0

    @nextButton = @container.find(@options.next)
    @prevButton = @container.find(@options.prev)
    @retreatButton = @container.find(@options.retreat)
    @controls = @container.find(@options.progress.controls)
    @dots = @container.find(@options.dots.container)

    @_initDefaults()
    @_initControls()

  _initDefaults: ->
    @steps.not(@initialStep).removeClass("active")
    @_activateInitialControls()

    return unless @wizard.length

    @_calculateTotal()

  _initControls: ->
    @initialStep
      .find(".step-form input")
      .on "change", (event) =>
        @wizard = event.target.id
        @_calculateTotal()
        @_activateInitialControls()

    @nextButton.on "click", (event) =>
      @_activateNext()

      event.preventDefault()

    @prevButton.on "click", (event) =>
      @_activatePrev()

      event.preventDefault()

    @retreatButton.on "click", (event) =>
      @_activateInitialStep()

      event.preventDefault()

  _calculateTotal: ->
    @total = @container.find(".#{@wizard}").length

    @_updateTotalIndicator()
    @_buildDots()

  _activateByIndex: (index) ->
    return @_activateInitialStep() if index == 0

    @current = index
    step = @container.find(".#{@wizard}").eq(@current - 1)
    @_activateStep(step)

  _activateNext: ->
    return false unless @wizard.length

    step = @container.find(".#{@wizard}").eq(@current)

    if step.length
      @current += 1
      @_activateStep(step)
      @_activateConrols()
      @_activateFinishControls() if @current == @total

  _activatePrev: ->
    return false unless @wizard.length

    @_activateConrols()

    if @current - 2 < 0
      @_activateInitialStep()

    else
      step = @container.find(".#{@wizard}").eq(@current - 2)

      @current -= 1
      @_activateStep(step)

  _activateStep: (step) ->
    @steps.removeClass('active')
    $(step).addClass('active')

    @_activateDot()
    @_updateCurrentIndicator()

  _activateInitialStep: ->
    @current = 0
    @_activateStep(@initialStep)
    @_activateInitialControls()

  _activateConrols: ->
    @controls.show()
    @nextButton.show()
    @prevButton.removeClass("disabled").show()
    @retreatButton.hide()

  _deactivateControls: ->
    @nextButton.hide()
    @prevButton.hide()
    @retreatButton.show()

  _activateInitialControls: ->
    @_activateConrols()
    @prevButton.addClass("disabled")

  _activateFinishControls: ->
    @_deactivateControls()
    @controls.hide()

  _updateCurrentIndicator: ->
    $(@options.progress.current).text(@current + 1)

  _updateTotalIndicator: ->
    $(@options.progress.total).text(@total)

  _buildDots: ->
    self = this

    @dots.empty()

    index = 0
    while index < @total
      @dots.append "<span class='#{if index == 0 then "active" else ""}'></span>"
      index++

    @dots.find(@options.dots.item).off("click").on "click", () ->
      self._activateByIndex($(this).index())

  _activateDot: ->
    dots = @dots.find(@options.dots.item)
    currentDot = dots.eq(@current)

    dots.removeClass('active')
    currentDot.addClass('active')


window.Calculator = Calculator

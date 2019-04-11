var $, Calculator;

$ = jQuery;

$.fn.calculator = function(options = {}) {
  return this.each(function() {
    var data, self;
    self = $(this);
    data = self.data('calculator');
    if (!data) {
      self.data('calculator', new Calculator(this, options));
    }
    if (typeof options === 'string') {
      return data[options]();
    }
  });
};

Calculator = class Calculator {
  constructor(dom, options = {}) {
    var defaults;
    this.dom = dom;
    defaults = {
      step: ".step",
      next: ".next",
      prev: ".prev",
      retreat: ".retreat",
      progress: {
        controls: ".component-calculator__forms_controls",
        current: ".component-calculator__forms_controls .current",
        total: ".component-calculator__forms_controls .total"
      },
      dots: {
        container: '.steps-dots',
        item: 'span'
      }
    };
    this.options = $.extend(defaults, options);
    this._setup();
  }

  _setup() {
    this.container = $(this.dom);
    this.initialStep = this.container.find(`${this.options.step}.active`);
    this.steps = this.container.find(this.options.step);
    this.wizard = this.initialStep.find(".step-form input:checked").attr("id");
    this.current = 0;
    this.total = 0;
    this.nextButton = this.container.find(this.options.next);
    this.prevButton = this.container.find(this.options.prev);
    this.retreatButton = this.container.find(this.options.retreat);
    this.controls = this.container.find(this.options.progress.controls);
    this.dots = this.container.find(this.options.dots.container);
    this._initDefaults();
    return this._initControls();
  }

  _initDefaults() {
    this.steps.not(this.initialStep).removeClass("active");
    this._activateInitialControls();
    if (!this.wizard.length) {
      return;
    }
    return this._calculateTotal();
  }

  _initControls() {
    this.initialStep.find(".step-form input").on("change", (event) => {
      this.wizard = event.target.id;
      this._calculateTotal();
      return this._activateInitialControls();
    });
    this.nextButton.on("click", (event) => {
      this._activateNext();
      return event.preventDefault();
    });
    this.prevButton.on("click", (event) => {
      this._activatePrev();
      return event.preventDefault();
    });
    return this.retreatButton.on("click", (event) => {
      this._activateInitialStep();
      return event.preventDefault();
    });
  }

  _calculateTotal() {
    this.total = this.container.find(`.${this.wizard}`).length;
    this._updateTotalIndicator();
    return this._buildDots();
  }

  _activateByIndex(index) {
    var step;
    if (index === 0) {
      return this._activateInitialStep();
    }
    this.current = index;
    step = this.container.find(`.${this.wizard}`).eq(this.current - 1);
    return this._activateStep(step);
  }

  _activateNext() {
    var step;
    if (!this.wizard.length) {
      return false;
    }
    step = this.container.find(`.${this.wizard}`).eq(this.current);
    if (step.length) {
      this.current += 1;
      this._activateStep(step);
      this._activateConrols();
      if (this.current === this.total) {
        return this._activateFinishControls();
      }
    }
  }

  _activatePrev() {
    var step;
    if (!this.wizard.length) {
      return false;
    }
    this._activateConrols();
    if (this.current - 2 < 0) {
      return this._activateInitialStep();
    } else {
      step = this.container.find(`.${this.wizard}`).eq(this.current - 2);
      this.current -= 1;
      return this._activateStep(step);
    }
  }

  _activateStep(step) {
    this.steps.removeClass('active');
    $(step).addClass('active');
    this._activateDot();
    return this._updateCurrentIndicator();
  }

  _activateInitialStep() {
    this.current = 0;
    this._activateStep(this.initialStep);
    return this._activateInitialControls();
  }

  _activateConrols() {
    this.controls.show();
    this.nextButton.show();
    this.prevButton.removeClass("disabled").show();
    return this.retreatButton.hide();
  }

  _deactivateControls() {
    this.nextButton.hide();
    this.prevButton.hide();
    return this.retreatButton.show();
  }

  _activateInitialControls() {
    this._activateConrols();
    return this.prevButton.addClass("disabled");
  }

  _activateFinishControls() {
    this._deactivateControls();
    return this.controls.hide();
  }

  _updateCurrentIndicator() {
    return $(this.options.progress.current).text(this.current + 1);
  }

  _updateTotalIndicator() {
    return $(this.options.progress.total).text(this.total);
  }

  _buildDots() {
    var index, self;
    self = this;
    this.dots.empty();
    index = 0;
    while (index < this.total) {
      this.dots.append(`<span class='${(index === 0 ? "active" : "")}'></span>`);
      index++;
    }
    return this.dots.find(this.options.dots.item).off("click").on("click", function() {
      return self._activateByIndex($(this).index());
    });
  }

  _activateDot() {
    var currentDot, dots;
    dots = this.dots.find(this.options.dots.item);
    currentDot = dots.eq(this.current);
    dots.removeClass('active');
    return currentDot.addClass('active');
  }

};

window.Calculator = Calculator;

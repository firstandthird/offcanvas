import { find, ready, on, addClass, removeClass, fire } from 'domassist';

const CLASSES = {
  OVERLAY: 'offcanvas-overlay',
  VISIBLE: 'visible',
  OPEN: 'open',
  LOCK_OVERFLOW: 'offcanvas-is-open',
  READY: 'offcanvas-ready'
};

const SELECTORS = {
  CANVAS: '[data-offcanvas]',
  FIXED: '[data-offcanvas-fixed]'
};

class OffCanvas {
  constructor(options) {
    this.name = options.name;
    this.el = options.el;
    this.options = options;
    this.visible = false;
    this.boundSetup = this.setup.bind(this);
    this.boundToggle = this.toggle.bind(this);
    this.boundHide = this.hide.bind(this);
    this.fixedEl = find(SELECTORS.FIXED);
    this.transitionTime = parseFloat(
      window.getComputedStyle(this.el).transitionDuration) * 1000;

    this.setup();
    this.setupEvents();
  }

  setupEvents() {
    on(window, 'resize', this.boundSetup);
    on(window, 'orientationchange', this.boundSetup);
  }

  destroy() {
    this.overlay.removeEventListener('click', this.boundHide);

    this.options.trigger.forEach(trigger => trigger.removeEventListener('click', this.boundToggle));
    this.overlay.parentNode.removeChild(this.overlay);
    this.overlay = null;
    this.initialized = false;
  }

  setup() {
    if (this.options.match && !window.matchMedia(this.options.match).matches) {
      if (this.initialized) {
        this.destroy();
      }

      return;
    }

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    // Setting some default id for ARIA to work
    if (!this.el.id) {
      this.el.id = `offcanvas-${this.name}`;
    }

    this.updateAria();

    // Creating overlay
    this.setupOverlay();

    // Setting up the rest
    this.setupTriggers(this.options.trigger);

    // Making it ready to fix browser issues
    setTimeout(() => {
      addClass(document.body, CLASSES.READY);
    }, this.transitionTime);
  }

  setupOverlay() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      addClass(this.overlay, CLASSES.OVERLAY);
      document.body.appendChild(this.overlay);
      this.overlay.addEventListener('click', this.boundHide);
    }
  }

  setupTriggers(els) {
    els.forEach(el => {
      el.addEventListener('click', this.boundToggle);
      el.setAttribute('aria-controls', this.el.id);
    });
  }

  updateAria() {
    this.options.trigger.forEach(trigger => {
      trigger.setAttribute('aria-expanded', `${this.visible}`);
    });
    this.el.setAttribute('aria-hidden', `${!this.visible}`);
  }

  show() {
    if (this.visible) {
      return;
    }

    this.visible = true;
    addClass(this.el, CLASSES.OPEN);
    addClass(this.overlay, CLASSES.VISIBLE);
    addClass(document.body, CLASSES.LOCK_OVERFLOW);
    fire(this.el, 'offcanvas:show');

    if (this.fixedEl) {
      this.fixedEl.forEach(el => {
        el.style.top = `${document.documentElement.scrollTop ||
        document.body.scrollTop}px`;
      });
    }

    this.updateAria();
  }

  hide() {
    if (!this.visible) {
      return;
    }

    this.visible = false;
    removeClass(this.el, CLASSES.OPEN);
    removeClass(this.overlay, CLASSES.VISIBLE);
    removeClass(document.body, CLASSES.LOCK_OVERFLOW);
    fire(this.el, 'offcanvas:hide');

    if (this.fixedEl) {
      setTimeout(() => {
        this.fixedEl.forEach(el => {
          el.style.top = '';
        });
      }, this.transitionTime);
    }

    this.updateAria();
  }

  toggle() {
    if (!this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
}

OffCanvas.autoLoad = true;

export default OffCanvas;

ready(() => {
  if (OffCanvas.autoLoad === false) {
    return;
  }

  find(SELECTORS.CANVAS).forEach((el) => {
    const name = el.getAttribute('data-offcanvas');

    new OffCanvas({
      name,
      el,
      trigger: find(`[data-offcanvas-trigger="${name}"]`),
      match: el.getAttribute('data-offcanvas-match')
    });
  });
});

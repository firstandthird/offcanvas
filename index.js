import { find, ready, toArray, on, styles, addClass, removeClass } from 'domassist';

class OffCanvas {
  constructor(options) {
    this.name = options.name;
    this.el = options.el;
    this.bodyEl = document.body;
    this.visible = false;
    this.position = options.position || 'left';
    this.transition = 'transform .2s ease-in-out';
    if (window.matchMedia && options.match && !window.matchMedia(options.match).matches) {
      return;
    }
    this.setupMenu();
    this.setupTriggers(options.trigger);
  }

  setupMenu() {
    this.elWidth = this.el.clientWidth;

    styles(this.el, {
      [this.position]: 0,
      transform: `translateX(${this.position === 'left' ? '-' : ''}${this.elWidth}px)`
    });

    if (this.position === 'right') {
      this.bodyEl.style['overflow-x'] = 'hidden';
    }

    this.hide();

    setTimeout(() => {
      styles(this.el, {
        visibility: 'visible',
        transition: this.transition
      });
      this.bodyEl.style.transition = this.transition;
    }, 200);
  }

  setupTriggers(els) {
    toArray(els).forEach((el) => on(el, 'click', this.toggle.bind(this)));
  }

  show() {
    this.createOverlay();
    styles(this.bodyEl, {
      'overflow-y': 'hidden',
      transform: `translateX(${this.position === 'right' ? '-' : ''}${this.elWidth}px)`
    });
    addClass(this.bodyEl, 'offcanvas-visible');
    this.visible = true;
  }

  hide() {
    styles(this.bodyEl, {
      transform: 'translateX(0px)',
      'overflow-y': 'auto'
    });
    removeClass(this.bodyEl, 'offcanvas-visible');
    this.visible = false;
    if (this.overlayEl) {
      this.bodyEl.removeChild(this.overlayEl);
    }
  }

  createOverlay() {
    const overlayEl = document.createElement('div');
    overlayEl.id = 'offcanvas-overlay';
    const overlayStyles = {
      position: 'fixed',
      'background-color': '#000',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0,
      transition: 'opacity .2s ease-in-out'
    };
    styles(overlayEl, overlayStyles);
    on(overlayEl, 'click', this.hide.bind(this));
    this.bodyEl.appendChild(overlayEl);
    setTimeout(() => {
      styles(overlayEl, { opacity: 0.3 });
    }, 1);
    this.overlayEl = overlayEl;
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

  toArray(find('[data-offcanvas]')).forEach((el) => {
    const name = el.getAttribute('data-offcanvas');
    new OffCanvas({
      name,
      el,
      trigger: find(`[data-offcanvas-trigger="${name}"]`),
      position: el.getAttribute('data-offcanvas-position'),
      match: el.getAttribute('data-offcanvas-match')
    });
  });
});

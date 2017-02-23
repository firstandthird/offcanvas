import { find, ready, on, styles, addClass, removeClass, hide, show } from 'domassist';

class OffCanvas {
  constructor(options) {
    this.name = options.name;
    this.el = options.el;
    this.options = options;
    this.bodyEl = document.body;
    this.visible = false;
    this.position = options.position || 'left';
    this.transition = 'transform .2s ease-in-out';
    this.setupEvents();
    this.setupMenu();
    this.setupTriggers(options.trigger);
  }

  setupEvents() {
    window.addEventListener('resize', this.setupMenu.bind(this));
    window.addEventListener('orientationchange', this.setupMenu.bind(this));
  }

  setupMenu() {
    if (window.matchMedia && this.options.match && !window.matchMedia(this.options.match).matches) {
      return;
    }
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
    els.forEach((el) => on(el, 'click', this.toggle.bind(this)));
  }

  show() {
    styles(this.bodyEl, {
      'overflow-y': 'hidden',
      transform: `translateX(${this.position === 'right' ? '-' : ''}${this.elWidth}px)`
    });
    addClass(this.bodyEl, 'offcanvas-visible');
    this.showOverlay();
    this.visible = true;
  }

  showOverlay() {
    if (this.overlayEl) {
      show(this.overlayEl);
      return;
    }
    this.overlayEl = document.createElement('div');
    styles(this.overlayEl, {
      backgroundColor: 'rgba(0,0,0,.3)',
      position: 'absolute',
      'z-index': '10',
      top: 0,
      width: '100%',
      height: '100%'
    });
    on(this.overlayEl, 'click', this.hide.bind(this));
    document.body.appendChild(this.overlayEl);
  }

  hide() {
    styles(this.bodyEl, {
      transform: 'translateX(0px)',
      'overflow-y': 'auto'
    });
    removeClass(this.bodyEl, 'offcanvas-visible');
    this.visible = false;
    hide(this.overlayEl);
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

  find('[data-offcanvas]').forEach((el) => {
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

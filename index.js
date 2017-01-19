import find from 'domassist/lib/find';
import findOne from 'domassist/lib/findOne';
import ready from 'domassist/lib/ready';
import toArray from 'domassist/lib/toArray';
import on from 'domassist/lib/on';

class OffCanvas {
  constructor(options) {
    this.name = options.name;
    this.el = options.el;
    this.bodyEl = options.body;
    this.visible = false;
    this.direction = 'left';
    this.setupMenu();
    this.setupTriggers(options.trigger);
  }

  setupMenu() {
    this.elWidth = this.el.clientWidth + 20;
    this.hide();

    this.el.style.visibility = 'visible';
    this.bodyEl.style.transition = 'transform .2s ease-in-out';
    this.el.style.transition = 'transform .2s ease-in-out';
  }

  setupTriggers(els) {
    if (!els) {
      return;
    }
    toArray(els).forEach((el) => {
      on(el, 'click', this.toggle.bind(this));
    });
  }

  show() {
    this.bodyEl.style.transform = `translateX(${this.elWidth}px)`;
    document.body.style.overflow = 'hidden';
    this.el.style.transform = 'translateX(0)';
    this.el.style.width = 'auto';
  }

  hide() {
    this.bodyEl.style.transform = 'translateX(0px)';
    this.el.style.transform = `translateX(-${this.elWidth}px)`;
    document.body.style.overflow = 'auto';
  }

  toggle() {
    if (!this.visible) {
      this.show();
    } else {
      this.hide();
    }
    this.visible = !this.visible;
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
      body: findOne('[data-offcanvas-body]'),
      trigger: find(`[data-offcanvas-trigger="${name}"]`)
    });
  });
});

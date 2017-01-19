import find from 'domassist/lib/find';
import findOne from 'domassist/lib/findOne';
import ready from 'domassist/lib/ready';
import toArray from 'domassist/lib/toArray';
import on from 'domassist/lib/on';
import once from 'domassist/lib/once';

class OffCanvas {
  constructor(options) {
    this.name = options.name;
    this.el = options.el;
    this.bodyEl = options.body;
    this.visible = false;
    this.direction = 'left';
    this.transition = 'transform .2s ease-in-out';
    this.setupMenu();
    this.setupTriggers(options.trigger);
  }

  setupMenu() {
    this.elWidth = this.el.clientWidth + 20;
    this.hide();

    setTimeout(() => {
      this.el.style.visibility = 'visible';
      this.bodyEl.style.transition = this.transition;
      this.el.style.transition = this.transition;
    }, 1000);
  }

  setupTriggers(els) {
    toArray(els).forEach((el) => on(el, 'click', this.toggle.bind(this)));
  }

  show() {
    document.body.style.overflow = 'hidden';
    this.bodyEl.style.transform = `translateX(${this.elWidth}px)`;
    this.el.style.transform = 'translateX(0)';
    this.visible = true;
    //click anywhere on body to close
    setTimeout(() => {
      once(this.bodyEl, 'click', this.hide.bind(this));
    }, 200);
  }

  hide() {
    this.bodyEl.style.transform = 'translateX(0px)';
    this.el.style.transform = `translateX(-${this.elWidth}px)`;
    document.body.style.overflow = 'auto';
    this.visible = false;
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
      body: findOne('[data-offcanvas-body]'),
      trigger: find(`[data-offcanvas-trigger="${name}"]`)
    });
  });
});

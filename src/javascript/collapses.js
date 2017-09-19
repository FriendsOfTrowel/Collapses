import { createNewEvent } from './utils/events'

export default class TrowelCollapses {
  constructor(collapses) {
    return collapses.map(collapse => new TrowelCollapse(collapse))
  }
}

class TrowelCollapse {
  constructor(collapse, nested = true) {
    this.collapse = collapse;
    this.nested = nested;

    this.isVisible ? this.show() : this.hide();

    this.listener();
    this.collapse.dispatchEvent(this.events.mounted);
    return;
  }

  show() {
    this.collapse.dispatchEvent(this.events.show);
    this.collapse.setAttribute('data-state', 'visible');
    this.triggers.map(trigger => trigger.addActiveclass());
    this.otherCollapsesFromGroup.forEach(collapse => collapse.hide());
    this.collapse.dispatchEvent(this.events.shown);
    return;
  }

  hide() {
    this.collapse.dispatchEvent(this.events.hide);
    this.collapse.setAttribute('data-state', 'hidden');
    this.triggers.map(trigger => trigger.removeActiveclass());
    this.collapse.dispatchEvent(this.events.hidden);
    return;
  }

  toggle() {
    this.collapse.dispatchEvent(this.events.toggle);

    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }

    this.collapse.dispatchEvent(this.events.toggled);
    return;
  }

  get isVisible () {
    return this.collapse.getAttribute('data-state') == 'visible';
  }

  get groupName () {
    return this.collapse.getAttribute('data-group');
  }

  get isEffectingOtherCollapsesFromGroup () {
    return this.groupName && this.nested;
  }

  get otherCollapsesFromGroup () {
    if (!this.isEffectingOtherCollapsesFromGroup) return [];
    const groupList = document.querySelectorAll(`[data-group="${this.groupName}"]`);

    return [].slice.call(groupList) // convert the nodelist as array
      .filter(collapse => collapse != this.collapse) // exclude `this` from the arr
      .map(collapse => new TrowelCollapse(collapse, false))
  }

  listener() {
    if (!this.nested) return false;

    this.toggleTriggers
      .map(trigger => trigger.domEl.addEventListener('click', this.toggle.bind(this)));

    this.showTriggers
      .map(trigger => trigger.domEl.addEventListener('click', this.show.bind(this)));

    this.hideTriggers
      .map(trigger => trigger.domEl.addEventListener('click', this.hide.bind(this)));
  }

  get triggers () {
    const triggerDomList = document.querySelectorAll(`[data-collapse][data-href="#${this.collapse.id}"]`);

    return Array.prototype.slice.call(triggerDomList) // convert the nodelist as array
      .map(trigger => new TrowelCollapseTrigger(trigger));
  }

  get toggleTriggers () {
    return this.triggers
      .filter(trigger => trigger.isToggleAction);
  }

  get showTriggers () {
    return this.triggers
      .filter(trigger => trigger.isShowAction);
  }

  get hideTriggers () {
    return this.triggers
      .filter(trigger => trigger.isHideAction);
  }

  get events() {
    const show = createNewEvent('trowel.collapse.show');
    const shown = createNewEvent('trowel.collapse.shown');
    const hide = createNewEvent('trowel.collapse.hide');
    const hidden = createNewEvent('trowel.collapse.hidden');
    const toggle = createNewEvent('trowel.collapse.toggle');
    const toggled = createNewEvent('trowel.collapse.toggled');
    const mounted = createNewEvent('trowel.collapse.mounted');

    return { show, shown, hide, hidden, toggle, toggled, mounted };
  }
}


class TrowelCollapseTrigger {
  constructor(domEl) {
    this.domEl = domEl;

    this.domEl.dispatchEvent(this.events.mounted);
    return;
  }

  get activeclass () {
    return this.domEl.getAttribute('data-activeclass');
  }

  get action () {
    return this.domEl.getAttribute('data-collapse');
  }

  get isToggleAction () {
    return this.action == 'toggle';
  }

  get isShowAction () {
    return this.action == 'show';
  }

  get isHideAction () {
    return this.action == 'hide';
  }

  addActiveclass() {
    this.domEl.dispatchEvent(this.events.activate);
    this.domEl.classList.add(this.activeclass);
    this.domEl.dispatchEvent(this.events.activated);
    return;
  }

  removeActiveclass() {
    this.domEl.dispatchEvent(this.events.desactivate);
    this.domEl.classList.remove(this.activeclass);
    this.domEl.dispatchEvent(this.events.desactivated);
    return;
  }

  toggleActiveclass() {
    this.domEl.dispatchEvent(this.events.toggle);
    this.domEl.classList.toggle(this.activeclass);
    this.domEl.dispatchEvent(this.events.toggled);
    return;
  }

  get events() {
    const activate = createNewEvent('trowel.collapse.trigger.activate');
    const activated = createNewEvent('trowel.collapse.trigger.activated');
    const desactivate = createNewEvent('trowel.collapse.desactivate.hide');
    const desactivated = createNewEvent('trowel.collapse.desactivated.hidden');
    const toggle = createNewEvent('trowel.collapse.trigger.toggle');
    const toggled = createNewEvent('trowel.collapse.trigger.toggled');
    const mounted = createNewEvent('trowel.collapse.trigger.mounted');

    return { activate, activated, desactivate, desactivated, toggle, toggled, mounted };
  }
}

export default class TrowelCollapses {
  constructor(elements) {
    elements.forEach(function(element, index) {
      let element_obj = new TrowelCollapse(element);
    })
  }
}

class TrowelCollapse {
  constructor(collapse, nested = true) {
    this.collapse = collapse;
    this.nested = nested;

    this.isVisible ? this.show() : this.hide();

    return this.listeners();
  }

  show() {
    this.collapse.setAttribute('data-state', 'visible');
    this.triggers.map(trigger => trigger.addActiveclass());
    this.otherCollapsesFromGroup.forEach(collapse => collapse.hide());
    return;
  }

  hide() {
    this.collapse.setAttribute('data-state', 'hidden');
    this.triggers.map(trigger => trigger.removeActiveclass());
    return;
  }

  toggle() {
    if (this.isVisible) return this.hide();
    return this.show();
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

  listeners() {
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
}


class TrowelCollapseTrigger {
  constructor(domEl) {
    this.domEl = domEl;
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
    return this.domEl.classList.add(this.activeclass);
  }

  removeActiveclass() {
    return this.domEl.classList.remove(this.activeclass);
  }

  toggleActiveclass() {
    return this.domEl.classList.toggle(this.activeclass);
  }
}

class TrowelCollapses {
    constructor(elements) {
        elements.forEach(function(element, index) {
            let element_obj = new TrowelCollapse(element);
        })
    }
}

class TrowelCollapse {
    constructor(collapse) {
        this._collapse = collapse;

        const { triggerers, togglers, showers, hidders } = this.getTriggerer();
        this._triggerers = triggerers;
        this._togglers = togglers;
        this._showers = showers;
        this._hidders = hidders;

        this._group = this.getGroup();

        if (this._collapse.getAttribute('data-state') == 'visible') {
            this.show();
        } else {
            this.hide();
        }

        return this._listeners();
    }

    show() {
        this._collapse.setAttribute('data-state', 'visible');
        this._triggerers.forEach(triggerer => this.triggererAddActiveClass(triggerer));
        if (!this._group) return;

        this._group.forEach(collapse => this.hide(collapse));
        return;
    }

    hide(collapse = this._collapse) {
        collapse.setAttribute('data-state', 'hidden');

        const { triggerers, togglers, showers, hidders } = this.getTriggerer(collapse);
        triggerers.forEach(triggerer => this.triggererRemoveActiveClass(triggerer));
        return;
    }

    toggle() {
        if (this._collapse.getAttribute('data-state') == 'visible') return this.hide();
        return this.show();
    }

    getTriggerer(collapse = this._collapse) {
        const triggerers = document.querySelectorAll(`[data-collapse][data-href="#${collapse.id}"]`);
        const togglers = document.querySelectorAll(`[data-collapse="toggle"][data-href="#${collapse.id}"]`);
        const showers = document.querySelectorAll(`[data-collapse="show"][data-href="#${collapse.id}"]`);
        const hidders = document.querySelectorAll(`[data-collapse="hide"][data-href="#${collapse.id}"]`);
        return { triggerers, togglers, showers, hidders }
    }

    getTriggererActiveClass(triggerer) {
        const activeClass = triggerer.dataset.activeclass;
        return activeClass ? activeClass : null;
    }

    triggererAddActiveClass(triggerer) {
        const activeClass = this.getTriggererActiveClass(triggerer);
        if (!activeClass) return;
        return triggerer.classList.add(activeClass);
    }

    triggererRemoveActiveClass(triggerer) {
        const activeClass = this.getTriggererActiveClass(triggerer);
        if (!activeClass) return;
        return triggerer.classList.remove(activeClass);
    }

    getGroup() {
        const groupName = this._collapse.dataset.group;
        if (!groupName) return null;

        const group = document.querySelectorAll(`[data-group="${groupName}"]`);

        // Convert the nodelist as array in order to make possible .filter()
        const groupArr = Array.prototype.slice.call(group);

        // Return group without this._collapse
        return groupArr.filter(collapse => collapse != this._collapse);
    }

    _listeners() {
        this._togglers.forEach(toggler => toggler.addEventListener('click', () => this.toggle()));
        this._showers.forEach(shower => shower.addEventListener('click', () => this.show()));
        this._hidders.forEach(hidder => hidder.addEventListener('click', () => this.hide()));
    }

}

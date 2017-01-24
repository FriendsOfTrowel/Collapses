'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelCollapses = function TrowelCollapses(elements) {
    _classCallCheck(this, TrowelCollapses);

    // If `elements` is a nodelist transform it into a array
    if (elements == '[object NodeList]') {
        elements = Array.prototype.slice.call(elements);
    }

    elements.forEach(function (element) {
        return new TrowelCollapse(element);
    });
};

var TrowelCollapse = function () {
    function TrowelCollapse(collapse) {
        var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, TrowelCollapse);

        this.collapse = collapse;
        this.nested = nested;

        if (this.isVisible) {
            this.show();
        } else {
            this.hide();
        }

        return this.listeners();
    }

    _createClass(TrowelCollapse, [{
        key: 'show',
        value: function show() {
            this.collapse.setAttribute('data-state', 'visible');

            this.triggers.forEach(function (trigger) {
                return trigger.addActiveclass();
            });

            this.otherCollapsesFromGroup.forEach(function (collapse) {
                return collapse.hide();
            });
            return;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.collapse.setAttribute('data-state', 'hidden');

            this.triggers.forEach(function (trigger) {
                return trigger.removeActiveclass();
            });
            return;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.isVisible) return this.hide();
            return this.show();
        }
    }, {
        key: 'listeners',
        value: function listeners() {
            var _this = this;

            if (!this.nested) return false;

            this.toggleTriggers.forEach(function (trigger) {
                return trigger.domEl.addEventListener('click', function () {
                    return _this.toggle();
                });
            });

            this.showTriggers.forEach(function (trigger) {
                return trigger.domEl.addEventListener('click', function () {
                    return _this.show();
                });
            });

            this.hideTriggers.forEach(function (trigger) {
                return trigger.domEl.addEventListener('click', function () {
                    return _this.hide();
                });
            });
        }
    }, {
        key: 'isVisible',
        get: function get() {
            return this.collapse.getAttribute('data-state') == 'visible';
        }
    }, {
        key: 'isHidden',
        get: function get() {
            return this.collapse.getAttribute('data-state') == 'hidden';
        }
    }, {
        key: 'groupName',
        get: function get() {
            return this.collapse.getAttribute('data-group');
        }
    }, {
        key: 'isEffectingOtherCollapsesFromGroup',
        get: function get() {
            return this.groupName && this.nested;
        }
    }, {
        key: 'otherCollapsesFromGroup',
        get: function get() {
            var _this2 = this;

            if (!this.isEffectingOtherCollapsesFromGroup) return [];
            var groupList = document.querySelectorAll('[data-group="' + this.groupName + '"]');

            return Array.prototype.slice.call(groupList) // convert the nodelist as array
            .filter(function (collapse) {
                return collapse != _this2.collapse;
            }) // exclude `this` from the arr
            .map(function (collapse) {
                return new TrowelCollapse(collapse, false);
            });
        }
    }, {
        key: 'triggers',
        get: function get() {
            var triggerDomList = document.querySelectorAll('[data-collapse][data-href="#' + this.collapse.id + '"]');
            return Array.prototype.slice.call(triggerDomList) // convert the nodelist as array
            .map(function (trigger) {
                return new TrowelCollapseTrigger(trigger);
            });
        }
    }, {
        key: 'toggleTriggers',
        get: function get() {
            return this.triggers.filter(function (trigger) {
                return trigger.isToggleAction;
            });
        }
    }, {
        key: 'showTriggers',
        get: function get() {
            return this.triggers.filter(function (trigger) {
                return trigger.isShowAction;
            });
        }
    }, {
        key: 'hideTriggers',
        get: function get() {
            return this.triggers.filter(function (trigger) {
                return trigger.isHideAction;
            });
        }
    }]);

    return TrowelCollapse;
}();

var TrowelCollapseTrigger = function () {
    function TrowelCollapseTrigger(domEl) {
        _classCallCheck(this, TrowelCollapseTrigger);

        this.domEl = domEl;
    }

    _createClass(TrowelCollapseTrigger, [{
        key: 'addActiveclass',
        value: function addActiveclass() {
            return this.domEl.classList.add(this.activeclass);
        }
    }, {
        key: 'removeActiveclass',
        value: function removeActiveclass() {
            return this.domEl.classList.remove(this.activeclass);
        }
    }, {
        key: 'toggleActiveclass',
        value: function toggleActiveclass() {
            return this.domEl.classList.toggle(this.activeclass);
        }
    }, {
        key: 'activeclass',
        get: function get() {
            return this.domEl.getAttribute('data-activeclass');
        }
    }, {
        key: 'action',
        get: function get() {
            return this.domEl.getAttribute('data-collapse');
        }
    }, {
        key: 'isToggleAction',
        get: function get() {
            return this.action == 'toggle';
        }
    }, {
        key: 'isShowAction',
        get: function get() {
            return this.action == 'show';
        }
    }, {
        key: 'isHideAction',
        get: function get() {
            return this.action == 'hide';
        }
    }]);

    return TrowelCollapseTrigger;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNlcy5qcyJdLCJuYW1lcyI6WyJUcm93ZWxDb2xsYXBzZXMiLCJlbGVtZW50cyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9yRWFjaCIsIlRyb3dlbENvbGxhcHNlIiwiZWxlbWVudCIsImNvbGxhcHNlIiwibmVzdGVkIiwiaXNWaXNpYmxlIiwic2hvdyIsImhpZGUiLCJsaXN0ZW5lcnMiLCJzZXRBdHRyaWJ1dGUiLCJ0cmlnZ2VycyIsInRyaWdnZXIiLCJhZGRBY3RpdmVjbGFzcyIsIm90aGVyQ29sbGFwc2VzRnJvbUdyb3VwIiwicmVtb3ZlQWN0aXZlY2xhc3MiLCJ0b2dnbGVUcmlnZ2VycyIsImRvbUVsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZSIsInNob3dUcmlnZ2VycyIsImhpZGVUcmlnZ2VycyIsImdldEF0dHJpYnV0ZSIsImdyb3VwTmFtZSIsImlzRWZmZWN0aW5nT3RoZXJDb2xsYXBzZXNGcm9tR3JvdXAiLCJncm91cExpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaWx0ZXIiLCJtYXAiLCJ0cmlnZ2VyRG9tTGlzdCIsImlkIiwiVHJvd2VsQ29sbGFwc2VUcmlnZ2VyIiwiaXNUb2dnbGVBY3Rpb24iLCJpc1Nob3dBY3Rpb24iLCJpc0hpZGVBY3Rpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJhY3RpdmVjbGFzcyIsInJlbW92ZSIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLGUsR0FDRix5QkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUNsQjtBQUNBLFFBQUlBLFlBQVksbUJBQWhCLEVBQXFDO0FBQ2pDQSxtQkFBV0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCSixRQUEzQixDQUFYO0FBQ0g7O0FBRURBLGFBQVNLLE9BQVQsQ0FBaUI7QUFBQSxlQUFXLElBQUlDLGNBQUosQ0FBbUJDLE9BQW5CLENBQVg7QUFBQSxLQUFqQjtBQUNILEM7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a0JBQXhCLENBQVA7QUFDSDs7OzRCQUVhO0FBQ1YsbUJBQU8sS0FBS0wsS0FBTCxDQUFXSyxZQUFYLENBQXdCLGVBQXhCLENBQVA7QUFDSDs7OzRCQUVxQjtBQUNsQixtQkFBTyxLQUFLa0IsTUFBTCxJQUFlLFFBQXRCO0FBQ0g7Ozs0QkFFbUI7QUFDaEIsbUJBQU8sS0FBS0EsTUFBTCxJQUFlLE1BQXRCO0FBQ0g7Ozs0QkFFbUI7QUFDaEIsbUJBQU8sS0FBS0EsTUFBTCxJQUFlLE1BQXRCO0FBQ0giLCJmaWxlIjoiY29sbGFwc2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVHJvd2VsQ29sbGFwc2VzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50cykge1xuICAgICAgICAvLyBJZiBgZWxlbWVudHNgIGlzIGEgbm9kZWxpc3QgdHJhbnNmb3JtIGl0IGludG8gYSBhcnJheVxuICAgICAgICBpZiAoZWxlbWVudHMgPT0gJ1tvYmplY3QgTm9kZUxpc3RdJykge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gbmV3IFRyb3dlbENvbGxhcHNlKGVsZW1lbnQpKTtcbiAgICB9XG59XG5cbmNsYXNzIFRyb3dlbENvbGxhcHNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2xsYXBzZSwgbmVzdGVkID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlID0gY29sbGFwc2U7XG4gICAgICAgIHRoaXMubmVzdGVkID0gbmVzdGVkO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAndmlzaWJsZScpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcnNcbiAgICAgICAgICAgIC5mb3JFYWNoKHRyaWdnZXIgPT4gdHJpZ2dlci5hZGRBY3RpdmVjbGFzcygpKTtcblxuICAgICAgICB0aGlzLm90aGVyQ29sbGFwc2VzRnJvbUdyb3VwXG4gICAgICAgICAgICAuZm9yRWFjaChjb2xsYXBzZSA9PiBjb2xsYXBzZS5oaWRlKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAnaGlkZGVuJyk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2Vyc1xuICAgICAgICAgICAgLmZvckVhY2godHJpZ2dlciA9PiB0cmlnZ2VyLnJlbW92ZUFjdGl2ZWNsYXNzKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHJldHVybiB0aGlzLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIGdldCBpc1Zpc2libGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnKSA9PSAndmlzaWJsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSGlkZGVuICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJykgPT0gJ2hpZGRlbic7XG4gICAgfVxuXG4gICAgZ2V0IGdyb3VwTmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlLmdldEF0dHJpYnV0ZSgnZGF0YS1ncm91cCcpO1xuICAgIH1cblxuICAgIGdldCBpc0VmZmVjdGluZ090aGVyQ29sbGFwc2VzRnJvbUdyb3VwICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBOYW1lICYmIHRoaXMubmVzdGVkO1xuICAgIH1cblxuICAgIGdldCBvdGhlckNvbGxhcHNlc0Zyb21Hcm91cCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VmZmVjdGluZ090aGVyQ29sbGFwc2VzRnJvbUdyb3VwKSByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IGdyb3VwTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWdyb3VwPVwiJHt0aGlzLmdyb3VwTmFtZX1cIl1gKTtcblxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZ3JvdXBMaXN0KSAvLyBjb252ZXJ0IHRoZSBub2RlbGlzdCBhcyBhcnJheVxuICAgICAgICAgICAgLmZpbHRlcihjb2xsYXBzZSA9PiBjb2xsYXBzZSAhPSB0aGlzLmNvbGxhcHNlKSAvLyBleGNsdWRlIGB0aGlzYCBmcm9tIHRoZSBhcnJcbiAgICAgICAgICAgIC5tYXAoY29sbGFwc2UgPT4gbmV3IFRyb3dlbENvbGxhcHNlKGNvbGxhcHNlLCBmYWxzZSkpXG4gICAgfVxuXG4gICAgbGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubmVzdGVkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50b2dnbGVUcmlnZ2Vyc1xuICAgICAgICAgICAgLmZvckVhY2godHJpZ2dlciA9PiB0cmlnZ2VyLmRvbUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGUoKSkpO1xuXG4gICAgICAgIHRoaXMuc2hvd1RyaWdnZXJzXG4gICAgICAgICAgICAuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuZG9tRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNob3coKSkpO1xuXG4gICAgICAgIHRoaXMuaGlkZVRyaWdnZXJzXG4gICAgICAgICAgICAuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuZG9tRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSkpO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VycyAoKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJEb21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29sbGFwc2VdW2RhdGEtaHJlZj1cIiMke3RoaXMuY29sbGFwc2UuaWR9XCJdYCk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0cmlnZ2VyRG9tTGlzdCkgLy8gY29udmVydCB0aGUgbm9kZWxpc3QgYXMgYXJyYXlcbiAgICAgICAgICAgIC5tYXAodHJpZ2dlciA9PiBuZXcgVHJvd2VsQ29sbGFwc2VUcmlnZ2VyKHRyaWdnZXIpKTtcbiAgICB9XG5cbiAgICBnZXQgdG9nZ2xlVHJpZ2dlcnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2Vyc1xuICAgICAgICAgICAgLmZpbHRlcih0cmlnZ2VyID0+IHRyaWdnZXIuaXNUb2dnbGVBY3Rpb24pO1xuICAgIH1cblxuICAgIGdldCBzaG93VHJpZ2dlcnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2Vyc1xuICAgICAgICAgICAgLmZpbHRlcih0cmlnZ2VyID0+IHRyaWdnZXIuaXNTaG93QWN0aW9uKTtcbiAgICB9XG5cbiAgICBnZXQgaGlkZVRyaWdnZXJzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcnNcbiAgICAgICAgICAgIC5maWx0ZXIodHJpZ2dlciA9PiB0cmlnZ2VyLmlzSGlkZUFjdGlvbik7XG4gICAgfVxufVxuXG5cbmNsYXNzIFRyb3dlbENvbGxhcHNlVHJpZ2dlciB7XG4gICAgY29uc3RydWN0b3IoZG9tRWwpIHtcbiAgICAgICAgdGhpcy5kb21FbCA9IGRvbUVsO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVjbGFzcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmVjbGFzcycpO1xuICAgIH1cblxuICAgIGdldCBhY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb21FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sbGFwc2UnKTtcbiAgICB9XG5cbiAgICBnZXQgaXNUb2dnbGVBY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24gPT0gJ3RvZ2dsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2hvd0FjdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbiA9PSAnc2hvdyc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSGlkZUFjdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbiA9PSAnaGlkZSc7XG4gICAgfVxuXG4gICAgYWRkQWN0aXZlY2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVjbGFzcyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQWN0aXZlY2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hY3RpdmVjbGFzcyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQWN0aXZlY2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmNsYXNzTGlzdC50b2dnbGUodGhpcy5hY3RpdmVjbGFzcyk7XG4gICAgfVxufVxuIl19

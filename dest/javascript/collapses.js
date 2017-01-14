'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelCollapses = function TrowelCollapses(elements) {
    _classCallCheck(this, TrowelCollapses);

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
            return this.collapse.dataset.group;
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
            return this.domEl.dataset.activeclass;
        }
    }, {
        key: 'action',
        get: function get() {
            return this.domEl.dataset.collapse;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNlcy5qcyJdLCJuYW1lcyI6WyJUcm93ZWxDb2xsYXBzZXMiLCJlbGVtZW50cyIsImZvckVhY2giLCJUcm93ZWxDb2xsYXBzZSIsImVsZW1lbnQiLCJjb2xsYXBzZSIsIm5lc3RlZCIsImlzVmlzaWJsZSIsInNob3ciLCJoaWRlIiwibGlzdGVuZXJzIiwic2V0QXR0cmlidXRlIiwidHJpZ2dlcnMiLCJ0cmlnZ2VyIiwiYWRkQWN0aXZlY2xhc3MiLCJvdGhlckNvbGxhcHNlc0Zyb21Hcm91cCIsInJlbW92ZUFjdGl2ZWNsYXNzIiwidG9nZ2xlVHJpZ2dlcnMiLCJkb21FbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGUiLCJzaG93VHJpZ2dlcnMiLCJoaWRlVHJpZ2dlcnMiLCJnZXRBdHRyaWJ1dGUiLCJkYXRhc2V0IiwiZ3JvdXAiLCJncm91cE5hbWUiLCJpc0VmZmVjdGluZ090aGVyQ29sbGFwc2VzRnJvbUdyb3VwIiwiZ3JvdXBMaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJmaWx0ZXIiLCJtYXAiLCJ0cmlnZ2VyRG9tTGlzdCIsImlkIiwiVHJvd2VsQ29sbGFwc2VUcmlnZ2VyIiwiaXNUb2dnbGVBY3Rpb24iLCJpc1Nob3dBY3Rpb24iLCJpc0hpZGVBY3Rpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJhY3RpdmVjbGFzcyIsInJlbW92ZSIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLGUsR0FDRix5QkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUNsQkEsYUFBU0MsT0FBVCxDQUFpQjtBQUFBLGVBQVcsSUFBSUMsY0FBSixDQUFtQkMsT0FBbkIsQ0FBWDtBQUFBLEtBQWpCO0FBQ0gsQzs7SUFHQ0QsYztBQUNGLDRCQUFZRSxRQUFaLEVBQXFDO0FBQUEsWUFBZkMsTUFBZSx1RUFBTixJQUFNOztBQUFBOztBQUNqQyxhQUFLRCxRQUFMLEdBQWdCQSxR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SzBDLE1BQUwsSUFBZSxRQUF0QjtBQUNIOzs7NEJBRW1CO0FBQ2hCLG1CQUFPLEtBQUtBLE1BQUwsSUFBZSxNQUF0QjtBQUNIOzs7NEJBRW1CO0FBQ2hCLG1CQUFPLEtBQUtBLE1BQUwsSUFBZSxNQUF0QjtBQUNIIiwiZmlsZSI6ImNvbGxhcHNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRyb3dlbENvbGxhcHNlcyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudHMpIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IG5ldyBUcm93ZWxDb2xsYXBzZShlbGVtZW50KSk7XG4gICAgfVxufVxuXG5jbGFzcyBUcm93ZWxDb2xsYXBzZSB7XG4gICAgY29uc3RydWN0b3IoY29sbGFwc2UsIG5lc3RlZCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZSA9IGNvbGxhcHNlO1xuICAgICAgICB0aGlzLm5lc3RlZCA9IG5lc3RlZDtcblxuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2Uuc2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJywgJ3Zpc2libGUnKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJzXG4gICAgICAgICAgICAuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuYWRkQWN0aXZlY2xhc3MoKSk7XG5cbiAgICAgICAgdGhpcy5vdGhlckNvbGxhcHNlc0Zyb21Hcm91cFxuICAgICAgICAgICAgLmZvckVhY2goY29sbGFwc2UgPT4gY29sbGFwc2UuaGlkZSgpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2Uuc2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJywgJ2hpZGRlbicpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcnNcbiAgICAgICAgICAgIC5mb3JFYWNoKHRyaWdnZXIgPT4gdHJpZ2dlci5yZW1vdmVBY3RpdmVjbGFzcygpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICBnZXQgaXNWaXNpYmxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJykgPT0gJ3Zpc2libGUnO1xuICAgIH1cblxuICAgIGdldCBpc0hpZGRlbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGF0ZScpID09ICdoaWRkZW4nO1xuICAgIH1cblxuICAgIGdldCBncm91cE5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZS5kYXRhc2V0Lmdyb3VwO1xuICAgIH1cblxuICAgIGdldCBpc0VmZmVjdGluZ090aGVyQ29sbGFwc2VzRnJvbUdyb3VwICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBOYW1lICYmIHRoaXMubmVzdGVkO1xuICAgIH1cblxuICAgIGdldCBvdGhlckNvbGxhcHNlc0Zyb21Hcm91cCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VmZmVjdGluZ090aGVyQ29sbGFwc2VzRnJvbUdyb3VwKSByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IGdyb3VwTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWdyb3VwPVwiJHt0aGlzLmdyb3VwTmFtZX1cIl1gKTtcblxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZ3JvdXBMaXN0KSAvLyBjb252ZXJ0IHRoZSBub2RlbGlzdCBhcyBhcnJheVxuICAgICAgICAgICAgLmZpbHRlcihjb2xsYXBzZSA9PiBjb2xsYXBzZSAhPSB0aGlzLmNvbGxhcHNlKSAvLyBleGNsdWRlIGB0aGlzYCBmcm9tIHRoZSBhcnJcbiAgICAgICAgICAgIC5tYXAoY29sbGFwc2UgPT4gbmV3IFRyb3dlbENvbGxhcHNlKGNvbGxhcHNlLCBmYWxzZSkpXG4gICAgfVxuXG4gICAgbGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubmVzdGVkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50b2dnbGVUcmlnZ2Vyc1xuICAgICAgICAgICAgLmZvckVhY2godHJpZ2dlciA9PiB0cmlnZ2VyLmRvbUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGUoKSkpO1xuXG4gICAgICAgIHRoaXMuc2hvd1RyaWdnZXJzXG4gICAgICAgICAgICAuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuZG9tRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNob3coKSkpO1xuXG4gICAgICAgIHRoaXMuaGlkZVRyaWdnZXJzXG4gICAgICAgICAgICAuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuZG9tRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSkpO1xuICAgIH1cblxuICAgIGdldCB0cmlnZ2VycyAoKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJEb21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY29sbGFwc2VdW2RhdGEtaHJlZj1cIiMke3RoaXMuY29sbGFwc2UuaWR9XCJdYCk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0cmlnZ2VyRG9tTGlzdCkgLy8gY29udmVydCB0aGUgbm9kZWxpc3QgYXMgYXJyYXlcbiAgICAgICAgICAgIC5tYXAodHJpZ2dlciA9PiBuZXcgVHJvd2VsQ29sbGFwc2VUcmlnZ2VyKHRyaWdnZXIpKTtcbiAgICB9XG5cbiAgICBnZXQgdG9nZ2xlVHJpZ2dlcnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2Vyc1xuICAgICAgICAgICAgLmZpbHRlcih0cmlnZ2VyID0+IHRyaWdnZXIuaXNUb2dnbGVBY3Rpb24pO1xuICAgIH1cblxuICAgIGdldCBzaG93VHJpZ2dlcnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2Vyc1xuICAgICAgICAgICAgLmZpbHRlcih0cmlnZ2VyID0+IHRyaWdnZXIuaXNTaG93QWN0aW9uKTtcbiAgICB9XG5cbiAgICBnZXQgaGlkZVRyaWdnZXJzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcnNcbiAgICAgICAgICAgIC5maWx0ZXIodHJpZ2dlciA9PiB0cmlnZ2VyLmlzSGlkZUFjdGlvbik7XG4gICAgfVxufVxuXG5cbmNsYXNzIFRyb3dlbENvbGxhcHNlVHJpZ2dlciB7XG4gICAgY29uc3RydWN0b3IoZG9tRWwpIHtcbiAgICAgICAgdGhpcy5kb21FbCA9IGRvbUVsO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVjbGFzcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmRhdGFzZXQuYWN0aXZlY2xhc3M7XG4gICAgfVxuXG4gICAgZ2V0IGFjdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUVsLmRhdGFzZXQuY29sbGFwc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzVG9nZ2xlQWN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uID09ICd0b2dnbGUnO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dBY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24gPT0gJ3Nob3cnO1xuICAgIH1cblxuICAgIGdldCBpc0hpZGVBY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24gPT0gJ2hpZGUnO1xuICAgIH1cblxuICAgIGFkZEFjdGl2ZWNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb21FbC5jbGFzc0xpc3QuYWRkKHRoaXMuYWN0aXZlY2xhc3MpO1xuICAgIH1cblxuICAgIHJlbW92ZUFjdGl2ZWNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb21FbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYWN0aXZlY2xhc3MpO1xuICAgIH1cblxuICAgIHRvZ2dsZUFjdGl2ZWNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb21FbC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuYWN0aXZlY2xhc3MpO1xuICAgIH1cbn1cbiJdfQ==

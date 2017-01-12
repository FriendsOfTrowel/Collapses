'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelCollapses = function TrowelCollapses(elements) {
    _classCallCheck(this, TrowelCollapses);

    elements.forEach(function (element, index) {
        var element_obj = new TrowelCollapse(element);
    });
};

var TrowelCollapse = function () {
    function TrowelCollapse(collapse) {
        _classCallCheck(this, TrowelCollapse);

        this._collapse = collapse;

        var _getTriggerer = this.getTriggerer(),
            triggerers = _getTriggerer.triggerers,
            togglers = _getTriggerer.togglers,
            showers = _getTriggerer.showers,
            hidders = _getTriggerer.hidders;

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

    _createClass(TrowelCollapse, [{
        key: 'show',
        value: function show() {
            var _this = this;

            this._collapse.setAttribute('data-state', 'visible');
            this._triggerers.forEach(function (triggerer) {
                return _this.triggererAddActiveClass(triggerer);
            });
            if (!this._group) return;

            this._group.forEach(function (collapse) {
                return _this.hide(collapse);
            });
            return;
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this2 = this;

            var collapse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._collapse;

            collapse.setAttribute('data-state', 'hidden');

            var _getTriggerer2 = this.getTriggerer(collapse),
                triggerers = _getTriggerer2.triggerers,
                togglers = _getTriggerer2.togglers,
                showers = _getTriggerer2.showers,
                hidders = _getTriggerer2.hidders;

            triggerers.forEach(function (triggerer) {
                return _this2.triggererRemoveActiveClass(triggerer);
            });
            return;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this._collapse.getAttribute('data-state') == 'visible') return this.hide();
            return this.show();
        }
    }, {
        key: 'getTriggerer',
        value: function getTriggerer() {
            var collapse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._collapse;

            var triggerers = document.querySelectorAll('[data-collapse][data-href="#' + collapse.id + '"]');
            var togglers = document.querySelectorAll('[data-collapse="toggle"][data-href="#' + collapse.id + '"]');
            var showers = document.querySelectorAll('[data-collapse="show"][data-href="#' + collapse.id + '"]');
            var hidders = document.querySelectorAll('[data-collapse="hide"][data-href="#' + collapse.id + '"]');
            return { triggerers: triggerers, togglers: togglers, showers: showers, hidders: hidders };
        }
    }, {
        key: 'getTriggererActiveClass',
        value: function getTriggererActiveClass(triggerer) {
            var activeClass = triggerer.dataset.activeclass;
            return activeClass ? activeClass : null;
        }
    }, {
        key: 'triggererAddActiveClass',
        value: function triggererAddActiveClass(triggerer) {
            var activeClass = this.getTriggererActiveClass(triggerer);
            if (!activeClass) return;
            return triggerer.classList.add(activeClass);
        }
    }, {
        key: 'triggererRemoveActiveClass',
        value: function triggererRemoveActiveClass(triggerer) {
            var activeClass = this.getTriggererActiveClass(triggerer);
            if (!activeClass) return;
            return triggerer.classList.remove(activeClass);
        }
    }, {
        key: 'getGroup',
        value: function getGroup() {
            var _this3 = this;

            var groupName = this._collapse.dataset.group;
            if (!groupName) return null;

            var group = document.querySelectorAll('[data-group="' + groupName + '"]');

            // Convert the nodelist as array in order to make possible .filter()
            var groupArr = Array.prototype.slice.call(group);

            // Return group without this._collapse
            return groupArr.filter(function (collapse) {
                return collapse != _this3._collapse;
            });
        }
    }, {
        key: '_listeners',
        value: function _listeners() {
            var _this4 = this;

            this._togglers.forEach(function (toggler) {
                return toggler.addEventListener('click', function () {
                    return _this4.toggle();
                });
            });
            this._showers.forEach(function (shower) {
                return shower.addEventListener('click', function () {
                    return _this4.show();
                });
            });
            this._hidders.forEach(function (hidder) {
                return hidder.addEventListener('click', function () {
                    return _this4.hide();
                });
            });
        }
    }]);

    return TrowelCollapse;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNlcy5qcyJdLCJuYW1lcyI6WyJUcm93ZWxDb2xsYXBzZXMiLCJlbGVtZW50cyIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJlbGVtZW50X29iaiIsIlRyb3dlbENvbGxhcHNlIiwiY29sbGFwc2UiLCJfY29sbGFwc2UiLCJnZXRUcmlnZ2VyZXIiLCJ0cmlnZ2VyZXJzIiwidG9nZ2xlcnMiLCJzaG93ZXJzIiwiaGlkZGVycyIsIl90cmlnZ2VyZXJzIiwiX3RvZ2dsZXJzIiwiX3Nob3dlcnMiLCJfaGlkZGVycyIsIl9ncm91cCIsImdldEdyb3VwIiwiZ2V0QXR0cmlidXRlIiwic2hvdyIsImhpZGUiLCJfbGlzdGVuZXJzIiwic2V0QXR0cmlidXRlIiwidHJpZ2dlcmVyQWRkQWN0aXZlQ2xhc3MiLCJ0cmlnZ2VyZXIiLCJ0cmlnZ2VyZXJSZW1vdmVBY3RpdmVDbGFzcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwiYWN0aXZlQ2xhc3MiLCJkYXRhc2V0IiwiYWN0aXZlY2xhc3MiLCJnZXRUcmlnZ2VyZXJBY3RpdmVDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImdyb3VwTmFtZSIsImdyb3VwIiwiZ3JvdXBBcnIiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImZpbHRlciIsInRvZ2dsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwic2hvd2VyIiwiaGlkZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUEsZSxHQUNGLHlCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQ2xCQSxhQUFTQyxPQUFULENBQWlCLFVBQVNDLE9BQVQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3RDLFlBQUlDLGNBQWMsSUFBSUMsY0FBSixDQUFtQkgsT0FBbkIsQ0FBbEI7QUFDSCxLQUZEO0FBR0gsQzs7SUFHQ0csYztBQUNGLDRCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQ2xCLGFBQUtDLFNBQUwsR0FB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TjtBQUFBLGlCQUFqQyxDQUFWO0FBQUEsYUFBdEI7QUFDSCIsImZpbGUiOiJjb2xsYXBzZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUcm93ZWxDb2xsYXBzZXMge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50X29iaiA9IG5ldyBUcm93ZWxDb2xsYXBzZShlbGVtZW50KTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmNsYXNzIFRyb3dlbENvbGxhcHNlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2xsYXBzZSkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZSA9IGNvbGxhcHNlO1xuXG4gICAgICAgIGNvbnN0IHsgdHJpZ2dlcmVycywgdG9nZ2xlcnMsIHNob3dlcnMsIGhpZGRlcnMgfSA9IHRoaXMuZ2V0VHJpZ2dlcmVyKCk7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJlcnMgPSB0cmlnZ2VyZXJzO1xuICAgICAgICB0aGlzLl90b2dnbGVycyA9IHRvZ2dsZXJzO1xuICAgICAgICB0aGlzLl9zaG93ZXJzID0gc2hvd2VycztcbiAgICAgICAgdGhpcy5faGlkZGVycyA9IGhpZGRlcnM7XG5cbiAgICAgICAgdGhpcy5fZ3JvdXAgPSB0aGlzLmdldEdyb3VwKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGF0ZScpID09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCAndmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyZXJzLmZvckVhY2godHJpZ2dlcmVyID0+IHRoaXMudHJpZ2dlcmVyQWRkQWN0aXZlQ2xhc3ModHJpZ2dlcmVyKSk7XG4gICAgICAgIGlmICghdGhpcy5fZ3JvdXApIHJldHVybjtcblxuICAgICAgICB0aGlzLl9ncm91cC5mb3JFYWNoKGNvbGxhcHNlID0+IHRoaXMuaGlkZShjb2xsYXBzZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaGlkZShjb2xsYXBzZSA9IHRoaXMuX2NvbGxhcHNlKSB7XG4gICAgICAgIGNvbGxhcHNlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdGF0ZScsICdoaWRkZW4nKTtcblxuICAgICAgICBjb25zdCB7IHRyaWdnZXJlcnMsIHRvZ2dsZXJzLCBzaG93ZXJzLCBoaWRkZXJzIH0gPSB0aGlzLmdldFRyaWdnZXJlcihjb2xsYXBzZSk7XG4gICAgICAgIHRyaWdnZXJlcnMuZm9yRWFjaCh0cmlnZ2VyZXIgPT4gdGhpcy50cmlnZ2VyZXJSZW1vdmVBY3RpdmVDbGFzcyh0cmlnZ2VyZXIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGF0ZScpID09ICd2aXNpYmxlJykgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgZ2V0VHJpZ2dlcmVyKGNvbGxhcHNlID0gdGhpcy5fY29sbGFwc2UpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvbGxhcHNlXVtkYXRhLWhyZWY9XCIjJHtjb2xsYXBzZS5pZH1cIl1gKTtcbiAgICAgICAgY29uc3QgdG9nZ2xlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb2xsYXBzZT1cInRvZ2dsZVwiXVtkYXRhLWhyZWY9XCIjJHtjb2xsYXBzZS5pZH1cIl1gKTtcbiAgICAgICAgY29uc3Qgc2hvd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvbGxhcHNlPVwic2hvd1wiXVtkYXRhLWhyZWY9XCIjJHtjb2xsYXBzZS5pZH1cIl1gKTtcbiAgICAgICAgY29uc3QgaGlkZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvbGxhcHNlPVwiaGlkZVwiXVtkYXRhLWhyZWY9XCIjJHtjb2xsYXBzZS5pZH1cIl1gKTtcbiAgICAgICAgcmV0dXJuIHsgdHJpZ2dlcmVycywgdG9nZ2xlcnMsIHNob3dlcnMsIGhpZGRlcnMgfVxuICAgIH1cblxuICAgIGdldFRyaWdnZXJlckFjdGl2ZUNsYXNzKHRyaWdnZXJlcikge1xuICAgICAgICBjb25zdCBhY3RpdmVDbGFzcyA9IHRyaWdnZXJlci5kYXRhc2V0LmFjdGl2ZWNsYXNzO1xuICAgICAgICByZXR1cm4gYWN0aXZlQ2xhc3MgPyBhY3RpdmVDbGFzcyA6IG51bGw7XG4gICAgfVxuXG4gICAgdHJpZ2dlcmVyQWRkQWN0aXZlQ2xhc3ModHJpZ2dlcmVyKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gdGhpcy5nZXRUcmlnZ2VyZXJBY3RpdmVDbGFzcyh0cmlnZ2VyZXIpO1xuICAgICAgICBpZiAoIWFjdGl2ZUNsYXNzKSByZXR1cm47XG4gICAgICAgIHJldHVybiB0cmlnZ2VyZXIuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgdHJpZ2dlcmVyUmVtb3ZlQWN0aXZlQ2xhc3ModHJpZ2dlcmVyKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gdGhpcy5nZXRUcmlnZ2VyZXJBY3RpdmVDbGFzcyh0cmlnZ2VyZXIpO1xuICAgICAgICBpZiAoIWFjdGl2ZUNsYXNzKSByZXR1cm47XG4gICAgICAgIHJldHVybiB0cmlnZ2VyZXIuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXAoKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuX2NvbGxhcHNlLmRhdGFzZXQuZ3JvdXA7XG4gICAgICAgIGlmICghZ3JvdXBOYW1lKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCBncm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWdyb3VwPVwiJHtncm91cE5hbWV9XCJdYCk7XG5cbiAgICAgICAgLy8gQ29udmVydCB0aGUgbm9kZWxpc3QgYXMgYXJyYXkgaW4gb3JkZXIgdG8gbWFrZSBwb3NzaWJsZSAuZmlsdGVyKClcbiAgICAgICAgY29uc3QgZ3JvdXBBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChncm91cCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGdyb3VwIHdpdGhvdXQgdGhpcy5fY29sbGFwc2VcbiAgICAgICAgcmV0dXJuIGdyb3VwQXJyLmZpbHRlcihjb2xsYXBzZSA9PiBjb2xsYXBzZSAhPSB0aGlzLl9jb2xsYXBzZSk7XG4gICAgfVxuXG4gICAgX2xpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlcnMuZm9yRWFjaCh0b2dnbGVyID0+IHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZSgpKSk7XG4gICAgICAgIHRoaXMuX3Nob3dlcnMuZm9yRWFjaChzaG93ZXIgPT4gc2hvd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zaG93KCkpKTtcbiAgICAgICAgdGhpcy5faGlkZGVycy5mb3JFYWNoKGhpZGRlciA9PiBoaWRkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhpZGUoKSkpO1xuICAgIH1cblxufVxuIl19

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TrowelCollapses", [], factory);
	else if(typeof exports === 'object')
		exports["TrowelCollapses"] = factory();
	else
		root["TrowelCollapses"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelCollapses = function TrowelCollapses(elements) {
  _classCallCheck(this, TrowelCollapses);

  elements.forEach(function (element, index) {
    var element_obj = new TrowelCollapse(element);
  });
};

exports.default = TrowelCollapses;

var TrowelCollapse = function () {
  function TrowelCollapse(collapse) {
    var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, TrowelCollapse);

    this.collapse = collapse;
    this.nested = nested;

    this.isVisible ? this.show() : this.hide();

    return this.listeners();
  }

  _createClass(TrowelCollapse, [{
    key: 'show',
    value: function show() {
      this.collapse.setAttribute('data-state', 'visible');
      this.triggers.map(function (trigger) {
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
      this.triggers.map(function (trigger) {
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

      this.toggleTriggers.map(function (trigger) {
        return trigger.domEl.addEventListener('click', _this.toggle.bind(_this));
      });

      this.showTriggers.map(function (trigger) {
        return trigger.domEl.addEventListener('click', _this.show.bind(_this));
      });

      this.hideTriggers.map(function (trigger) {
        return trigger.domEl.addEventListener('click', _this.hide.bind(_this));
      });
    }
  }, {
    key: 'isVisible',
    get: function get() {
      return this.collapse.getAttribute('data-state') == 'visible';
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

      return [].slice.call(groupList) // convert the nodelist as array
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

module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=collapses.js.map
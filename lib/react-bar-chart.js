(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "d3"], factory);
	else if(typeof exports === 'object')
		exports["BarChart"] = factory(require("react"), require("d3"));
	else
		root["BarChart"] = factory(root["React"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _d3 = __webpack_require__(2);

	var _d32 = _interopRequireDefault(_d3);

	__webpack_require__(3);

	var merge = function merge(one, two) {
	  return Object.assign({}, one, two);
	};

	var BarChart = (function (_React$Component) {
	  function BarChart() {
	    _classCallCheck(this, BarChart);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(BarChart, _React$Component);

	  _createClass(BarChart, [{
	    key: '_handleBarClick',
	    value: function _handleBarClick(element, id) {
	      if (this.props.onBarClick) {
	        this.props.onBarClick(element, id);
	      }
	    }
	  }, {
	    key: '_renderGraph',
	    value: function _renderGraph(props) {
	      var margin = props.margin;
	      var width = props.width;
	      var height = props.height;

	      var DOMNode = _react2['default'].findDOMNode(this);
	      var svg = _d32['default'].select(DOMNode).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

	      svg = svg.select('.graph').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	      this._reusableGraph(props);
	    }
	  }, {
	    key: '_reusableGraph',
	    value: function _reusableGraph(props) {
	      var _this = this;

	      var margin = props.margin;
	      var width = props.width;
	      var height = props.height;

	      var DOMNode = _react2['default'].findDOMNode(this);
	      var svg = _d32['default'].select(DOMNode).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

	      svg = svg.select('.graph').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	      svg.selectAll('rect').remove();

	      svg.select('.x.axis').remove();
	      svg.select('.y.axis').remove();

	      svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + height + ')').call(this.xAxis);

	      svg.append('g').attr('class', 'y axis').call(this.yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text(props.ylabel);

	      _d32['default'].select('.graph').selectAll('.bar').data(props.data).enter().append('rect').on('click', this._handleBarClick.bind(this)).attr('class', 'bar').attr('x', function (d) {
	        return _this.x(d.text);
	      }).attr('width', this.x.rangeBand()).attr('y', function (d) {
	        return _this.y(d.value);
	      }).attr('height', function (d) {
	        return height - _this.y(d.value);
	      });
	    }
	  }, {
	    key: '_defineAxis',
	    value: function _defineAxis(props) {
	      props.width = props.width - props.margin.left - props.margin.right;
	      props.height = props.height - props.margin.top - props.margin.bottom;

	      this.x = _d32['default'].scale.ordinal().rangeRoundBands([0, props.width], 0.1);
	      this.y = _d32['default'].scale.linear().range([props.height, 0]);

	      this.x.domain(props.data.map(function (d) {
	        return d.text;
	      }));
	      this.y.domain([0, _d32['default'].max(props.data, function (d) {
	        return d.value;
	      })]);

	      this.xAxis = _d32['default'].svg.axis().scale(this.x).orient('bottom');
	      this.yAxis = _d32['default'].svg.axis().scale(this.y).orient('left');
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var props = merge(this.props);
	      this._defineAxis(props);
	      this._renderGraph(props);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      var props = merge(nextProps);
	      this._defineAxis(props);
	      this._reusableGraph(props);
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'svg',
	        null,
	        _react2['default'].createElement('g', { className: 'graph' })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      data: _react2['default'].PropTypes.array.isRequired,
	      width: _react2['default'].PropTypes.number.isRequired,
	      height: _react2['default'].PropTypes.number.isRequired,
	      margin: _react2['default'].PropTypes.object,
	      ylabel: _react2['default'].PropTypes.string
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
	    enumerable: true
	  }]);

	  return BarChart;
	})(_react2['default'].Component);

	exports['default'] = BarChart;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	if (!Object.assign) {
	  Object.defineProperty(Object, "assign", {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function value(target, firstSource) {
	      "use strict";
	      if (target === undefined || target === null) throw new TypeError("Cannot convert first argument to object");

	      var to = Object(target);

	      var hasPendingException = false;
	      var pendingException;

	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null) continue;

	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          try {
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
	          } catch (e) {
	            if (!hasPendingException) {
	              hasPendingException = true;
	              pendingException = e;
	            }
	          }
	        }

	        if (hasPendingException) throw pendingException;
	      }
	      return to;
	    }
	  });
	}

/***/ }
/******/ ])
});
;
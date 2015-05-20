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

	var React = __webpack_require__(1);
	var d3 = __webpack_require__(2);

	__webpack_require__(3);

	var merge = function merge(one, two) {
	  return Object.assign({}, one, two);
	};

	var BarChart = React.createClass({
	  displayName: 'BarChart',

	  propTypes: {
	    data: React.PropTypes.array.isRequired },

	  _renderGraph: function _renderGraph(props) {
	    var margin = props.margin;
	    var width = props.width;
	    var height = props.height;

	    var svg = d3.select(this.getDOMNode()).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

	    svg = svg.select('.graph').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	    this._reusableGraph(props);
	  },

	  _reusableGraph: function _reusableGraph(props) {
	    var margin = props.margin;
	    var width = props.width;
	    var height = props.height;

	    var _this = this;
	    var svg = d3.select(this.getDOMNode()).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

	    svg = svg.select('.graph').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	    svg.selectAll('rect').remove();

	    svg.select('.x.axis').remove();
	    svg.select('.y.axis').remove();

	    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(this.xAxis);

	    svg.append('g').attr('class', 'y axis').call(this.yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text(props.ylabel);

	    d3.select('.graph').selectAll('.bar').data(props.data).enter().append('rect').attr('class', 'bar').attr('x', function (d) {
	      return _this.x(d.text);
	    }).attr('width', this.x.rangeBand()).attr('y', function (d) {
	      return _this.y(d.value);
	    }).attr('height', function (d) {
	      return height - _this.y(d.value);
	    });
	  },

	  componentDidMount: function componentDidMount() {
	    var props = merge(this.props);

	    props.width = props.width - props.margin.left - props.margin.right;
	    props.height = props.height - props.margin.top - props.margin.bottom;

	    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1);
	    this.y = d3.scale.linear().range([props.height, 0]);

	    this.x.domain(props.data.map(function (d) {
	      return d.text;
	    }));
	    this.y.domain([0, d3.max(props.data, function (d) {
	      return d.value;
	    })]);
	    this.xAxis = d3.svg.axis().scale(this.x).orient('bottom');
	    this.yAxis = d3.svg.axis().scale(this.y).orient('left');

	    this._renderGraph(props);
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    var props = merge(nextProps);

	    props.width = props.width - props.margin.left - props.margin.right;
	    props.height = props.height - props.margin.top - props.margin.bottom;

	    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1);
	    this.y = d3.scale.linear().range([props.height, 0]);

	    this.x.domain(props.data.map(function (d) {
	      return d.text;
	    }));
	    this.y.domain([0, d3.max(props.data, function (d) {
	      return d.value;
	    })]);

	    this.xAxis = d3.svg.axis().scale(this.x).orient('bottom');
	    this.yAxis = d3.svg.axis().scale(this.y).orient('left');

	    this._reusableGraph(props);
	    return false;
	  },

	  render: function render() {
	    return React.createElement(
	      'svg',
	      null,
	      React.createElement('g', { className: 'graph' })
	    );
	  }

	});

	module.exports = BarChart;

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
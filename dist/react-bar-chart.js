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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** ./src/BarChart.jsx ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM */
	__webpack_require__(/*! ./BarChart.css */ 4);
	
	var React = __webpack_require__(/*! react */ 1);
	var d3 = __webpack_require__(/*! d3 */ 2);
	
	__webpack_require__(/*! ./utils/assign */ 3);
	
	var merge = function(one, two) {
	  return Object.assign({}, one, two);
	};
	
	
	var Pie = React.createClass({displayName: 'Pie',
	  propTypes: {
	    data : React.PropTypes.array.isRequired,
	  },
	
	  _renderGraph:function (props) {
	    var margin = props.margin;
	    var width = props.width;
	    var height = props.height;
	
	    var svg = d3.select(this.getDOMNode())
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom);
	
	    svg = svg.select(".graph")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	    this._reusableGraph(props);
	  },
	
	  _reusableGraph: function(props) { 
	    var margin = props.margin;
	    var width = props.width;
	    var height = props.height;
	
	    var _this = this;
	    var svg = d3.select(this.getDOMNode())
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom);
	
	    svg = svg.select(".graph")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	    svg.selectAll("rect").remove();
	      
	    svg.select('.x.axis').remove();
	    svg.select('.y.axis').remove();
	    
	    svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(this.xAxis);
	
	    svg.append("g")
	      .attr("class", "y axis")
	      .call(this.yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(props.ylabel);
	
	    d3.select('.graph').selectAll(".bar")
	      .data(props.data)
	      .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return _this.x(d.text); })
	      .attr("width", this.x.rangeBand())
	      .attr("y", function(d) { return _this.y(d.value); })
	        .attr("height", function(d) { return height - _this.y(d.value); });
	  },
	
	  componentDidMount:function () {
	    var props = merge(this.props);
	
	    props.width = props.width - margin.left - margin.right;
	    props.height = props.height - margin.top - margin.bottom;
	    
	    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1); 
	    this.y = d3.scale.linear().range([props.height, 0]);
	
	    this.x.domain(props.data.map(function(d) { return d.text; }));
	    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);
	    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
	    this.yAxis = d3.svg.axis().scale(this.y).orient("left");
	
	    this._renderGraph(props);
	  },
	
	  shouldComponentUpdate:function (nextProps) {
	    var props = merge(nextProps);
	
	    props.width = props.width - margin.left - margin.right;
	    props.height = props.height - margin.top - margin.bottom;
	    
	    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1); 
	    this.y = d3.scale.linear().range([props.height, 0]);
	
	    this.x.domain(props.data.map(function(d) { return d.text; }));
	    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);
	
	    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
	    this.yAxis = d3.svg.axis().scale(this.y).orient("left");
	
	    this._reusableGraph(props);
	    return false;
	  },
	
	  render:function() {
	    return (
	      React.DOM.svg(null, React.DOM.g({className: "graph"}))
	    );
	  }
	
	});
	
	module.exports = Pie;


/***/ },
/* 1 */
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs":"react","commonjs2":"react","amd":"react"} ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/*!**************************************************************************!*\
  !*** external {"root":"d3","commonjs":"d3","commonjs2":"d3","amd":"d3"} ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/*!*****************************!*\
  !*** ./src/utils/assign.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	if (!Object.assign) {
	  Object.defineProperty(Object, "assign", {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function(target, firstSource) {
	      "use strict";
	      if (target === undefined || target === null)
	        throw new TypeError("Cannot convert first argument to object");
	
	      var to = Object(target);
	
	      var hasPendingException = false;
	      var pendingException;
	
	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null)
	          continue;
	
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          try {
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable)
	              to[nextKey] = nextSource[nextKey];
	          } catch (e) {
	            if (!hasPendingException) {
	              hasPendingException = true;
	              pendingException = e;
	            }
	          }
	        }
	
	        if (hasPendingException)
	          throw pendingException;
	      }
	      return to;
	    }
	  });
	}


/***/ },
/* 4 */
/*!**************************!*\
  !*** ./src/BarChart.css ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./src/BarChart.css */ 5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 6)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mateus/dev/react-components/react-line-chart/node_modules/css-loader/index.js!/home/mateus/dev/react-components/react-line-chart/src/BarChart.css", function() {
			var newContent = require("!!/home/mateus/dev/react-components/react-line-chart/node_modules/css-loader/index.js!/home/mateus/dev/react-components/react-line-chart/src/BarChart.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/*!*****************************************!*\
  !*** ./~/css-loader!./src/BarChart.css ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 7)();
	exports.push([module.id, ".bar {\n  fill: steelblue;\n}\n\n.bar:hover {\n  fill: brown;\n}\n\n.axis {\n  font: 10px sans-serif;\n}\n\n.axis path,\n.axis line {\n  fill: none;\n  stroke: #000;\n  shape-rendering: crispEdges;\n}\n\n.x.axis path {\n  display: none;\n}\n\n", ""]);

/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 7 */
/*!*************************************!*\
  !*** ./~/css-loader/cssToString.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
});

//# sourceMappingURL=react-bar-chart.js.map
if(process.env.NODE_ENV !== 'production'){
  require('./BarChart.css');
}

var React = require('react');
var d3 = require('d3');

require('./utils/assign');

var merge = function(one, two) {
  return Object.assign({}, one, two);
};

var BarChart = React.createClass({
  propTypes: {
    data : React.PropTypes.array.isRequired,
  },

  _renderGraph (props) {
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

  componentDidMount () {
    var props = merge(this.props);

    props.width = props.width - props.margin.left - props.margin.right;
    props.height = props.height - props.margin.top - props.margin.bottom;
    
    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1); 
    this.y = d3.scale.linear().range([props.height, 0]);

    this.x.domain(props.data.map(function(d) { return d.text; }));
    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);
    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    this.yAxis = d3.svg.axis().scale(this.y).orient("left");

    this._renderGraph(props);
  },

  shouldComponentUpdate (nextProps) {
    var props = merge(nextProps);

    props.width = props.width - props.margin.left - props.margin.right;
    props.height = props.height - props.margin.top - props.margin.bottom;
    
    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1); 
    this.y = d3.scale.linear().range([props.height, 0]);

    this.x.domain(props.data.map(function(d) { return d.text; }));
    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);

    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    this.yAxis = d3.svg.axis().scale(this.y).orient("left");

    this._reusableGraph(props);
    return false;
  },

  render() {
    return (
      <svg><g className="graph"></g></svg>
    );
  }

});

module.exports = BarChart;

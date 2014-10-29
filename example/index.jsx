/**
 * @jsx React.DOM
 */

var data = [
  {text: "Man", value: 500}, 
  {text: "Woman", value: 300} 
];

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var Index = React.createClass({
  getInitialState: function() {
    return {
      width: 500 
    };
  },

  componentDidMount: function () {
    var _this = this;
    var domNode = this.getDOMNode();

    window.onresize = function(){
     _this.setState({width: domNode.offsetWidth}); 
    };
  },

  render: function() {
    return (
      <div style={{width: "50%"}}> 
        <BarChart ylabel="Quantity" width={this.state.width} height={500} margin={margin}
          data={data} />
      </div>
    );
  }
});

React.renderComponent(
  <Index />,
  document.getElementById("container")
);

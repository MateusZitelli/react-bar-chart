# react-bar-chart
> A resizible bar chart component made with React.js and D3.js

<img src="https://i.imgur.com/3CgROLp.png"/>

## Usage

First install the component:
```sh
npm install --save react-bar-chart
```

And them use the component like this to generate the image on top:
```jsx
import React from 'react';
import BarChart from 'react-bar-chart';

const data = [
  {text: 'Man', value: 500}, 
  {text: 'Woman', value: 300} 
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};

const Example = React.createClass({
  getInitialState() {
    return { width: 500 };
  },

  componentDidMount: () => {
    window.onresize = () => {
     this.setState({width: this.refs.root.offsetWidth}); 
    };
  },

  handleBarClick(element, id){ 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  },

  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}> 
                <BarChart ylabel='Quantity'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={data}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
});

React.render(
  <Example/>,
  document.getElementById('react-container')
);
```

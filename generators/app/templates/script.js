var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');

var Component = React.createClass({
  render: function() {
    return <Select/>;
  }
});

ReactDOM.render(
  <Component/>,
  document.getElementById('container')
);

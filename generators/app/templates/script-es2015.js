import React from 'react';
import {render} from 'react-dom';
import Select from 'react-select';

class Component extends React.Component {
  render() {
    return <Select/>;
  }
}

render(
  <Component/>,
  document.getElementById('container')
);

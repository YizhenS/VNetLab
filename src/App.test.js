import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addHub} from './components/home'

console.log(addHub("name","t","2","3"))
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

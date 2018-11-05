import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Draggable, {DraggableCore} from 'react-draggable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          
          <Switch>
            <Route path="/" component={Home} exact />

            
  
          </Switch>
        </div>
      </BrowserRouter>

    );

  }
}

export default App;

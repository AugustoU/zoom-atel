import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Zoom from './Zoom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/zoom/:room" component={Zoom}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

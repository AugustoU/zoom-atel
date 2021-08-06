import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <Router createBrowserHistory>
    <Switch>
      <Route component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();

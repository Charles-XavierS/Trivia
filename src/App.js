import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    );
  }
}

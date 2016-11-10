import React, { Component } from 'react';
import Home from './Home';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/usernames/:username' component={Home} />
      </Router>
    )
  }

}

export default App;

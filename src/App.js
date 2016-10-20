import React, { Component } from 'react';
import Header from './containers/Header.js';
import List from './containers/List.js';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [1,2,3]
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <List tweets={this.state.tweets}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Header from './containers/Header';
import Twitter from './containers/Twitter';
import './App.css';
import firebase, { provider } from './firebase';
import _ from 'lodash';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "benthehuman",
      tweets: [],
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => { this.setState({ user });
    });
    this.pullTweets(this.state.username, 1000);
  }

  twitterLogin() {
    firebase.auth().signInWithPopup(provider).then((result)=> {
    });
  }

  pullTweets(screenName, count) {
    let _this = this;
    //how do we use this in a non-janky fashion
    axios.get(`/api/tweets-for-user/${screenName}?count=${count}`)
      .then(function (response) {
        _this.setState({ tweets: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Twitter />
      </div>
    );
  }
}

export default App;

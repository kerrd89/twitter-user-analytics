import React, { Component } from 'react';
import Header from './containers/Header';
import Twitter from './containers/Twitter';
// import './App.css';
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
    this.pullTweets(this.state.username, 2000);
  }

  twitterLogin() {
    firebase.auth().signInWithPopup(provider).then((result)=> {
    });
  }

  pullTweets(screenName, count) {
    axios.get(`/api/tweets-for-user/${screenName}?count=${count}`)
      .then((response)=>this.setState({ tweets: response.data }))
      .catch(function (error) {
        console.log(error);
      });
  }

  changeUsername(data) {
    this.setState({ username: data });
    this.pullTweets(data, 200);
  }

  render() {
    return (
      <div className="App">
        <Header changeUsername={this.changeUsername.bind(this)}/>
        <Twitter tweets={this.state.tweets}/>
      </div>
    );
  }
}

export default App;

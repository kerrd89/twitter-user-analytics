import React, { Component } from 'react';
import Header from './containers/Header.js';
import List from './containers/List.js';
import './App.css';
import firebase, { provider } from './firebase';
import $ from 'jquery';




class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [1,2,3]
    };
  }

  searchTwitter() {
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then((result)=>{
      // console.log(twitter.getUserTimeline({ 'screen_name': 'dkerrious', 'count': '10'}, error, success));
      $.getJSON("https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames",
      function(data){console.log(data);});
    }).catch((error) => {
      console.log(error);
      // var errorCode = error.code;
      // var email = error.email;
      // var credential = error.credential;
    });
  }

  render() {
    return (
      <div className="App">
        <button className="buttonSignIn" onClick={() => this.searchTwitter()}>
        Sign In
        </button>
        <Header />
        <List tweets={this.state.tweets}/>
      </div>
    );
  }
}

export default App;

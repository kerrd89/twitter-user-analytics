import React, { Component } from 'react';
import Header from './containers/Header.js';
import List from './containers/List.js';
import './App.css';
import firebase, { provider } from './firebase';
import $ from 'jquery';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    };
  }

  twitterLogin() {
    firebase.auth().signInWithPopup(provider).then((result)=>{
      console.log(result);
    });
  }

  pullTweet() {
    $.ajax({
      context: this,
      url: "https://api.twitter.com/v1/statuses/user_timeline.json?user_name=dkerrioustwitterapi&count=2",
      json: "callback",
      // dataType: "jsonp",
      success: function(response) {
        let tweet = _.pick(response, ['author_name','html']);
        this.setState({ 'tweets' : this.state.tweets.concat(tweet) });
        console.log(this.state.tweets);
        console.log("response: ", response);
      },
      error: function(errorThrown){
        console.log(errorThrown);
      }
  });
  }

  render() {
    return (
      <div className="App">
        <button className="buttonSignIn" onClick={() => this.pullTweet()}>
        Pull Tweet
        </button>
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

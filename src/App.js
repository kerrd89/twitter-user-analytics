import React, { Component } from 'react';
import Header from './containers/Header';
import List from './containers/List';
import './App.css';
import firebase, { provider } from './firebase';
import _ from 'lodash';
import instaData from './data/instagram-user-timeline';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      insta: instaData,
      user: null,
      userInfo: {
        twitter: {
          username: "benthehuman",
          count: 10
        }
      }
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => { this.setState({ user });
    });
    console.log(this.state.user);
    //how do we use this in a non-janky fashion
    this.pullTweets(this.state.userInfo.twitter.username, this.state.userInfo.twitter.count);
  }

  twitterLogin() {
    firebase.auth().signInWithPopup(provider).then((result)=> {
    });
  }

  pullTweets(screenName, count) {
    let _this = this;
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
        <button className="buttonSignIn" onClick={() => this.twitterLogin()}>
        Sign In
        </button>
        <List tweets={this.state.tweets} insta={this.state.insta}/>
      </div>
    );
  }
}

export default App;






// $.ajax({
//   url: "http://localhost:3001/api/tweets-for-user/stevekinney",
//   json: "callback",
//   dataType: "jsonp",
//   success: function(response) {
//     console.log(response);
//     // let tweets = _.pick(response, ['entities']);
//     this.setState({ 'tweets' : response.data });
//     return console.log(this.state.tweets, "did this hit");
//   },
//   error: function(errorThrown){
//     console.log(errorThrown, "youfailed");
//   }
// });

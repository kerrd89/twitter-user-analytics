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
      $.get("https://api.twitter.com/1.1/statuses/oembed.json?id=507185938620219395",
      function(data){console.log(data);});
    }).catch((error) => {
      console.log(error);
    });
  }
  //
  // componentDidMount() {
  //   var xhr = new xmlHttpRequest();
  //   xhr.onreadystatechange = () => {
  //     if(xhr.readyState === 4 && xhr.status === 200) {
  //       console.log('poop');
  //       console.log(JSON.parse(xhr.responseText));
  //     }
  //   };
  // }

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

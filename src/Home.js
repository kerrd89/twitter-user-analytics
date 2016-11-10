import React, { Component } from 'react';
import Header from './containers/Header';
import Twitter from './containers/Twitter';
import firebase, { provider } from './firebase';
import _ from 'lodash';
import axios from 'axios';
import LoadingSvg from './components/LoadingSvg';


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
    if(!!this.props.params.username) {
      this.setState({ username: this.props.params.username});
      this.pullTweets(this.props.params.username, 200);
    } else {
      this.pullTweets(this.state.username,200);
    }
  }

  pullTweets(screenName, count) {
    axios.get(`/api/tweets-for-user/${screenName}?count=${count}?exclude_replies=true`)
      .then((response)=>{
        this.setState({ tweets: response.data });
        // this.sendUserDataToFirebase(response.data);
      })
      .catch((error) => console.log(error));
  }

  changeUsername(data) {
    this.setState({ username: data });
    this.state.tweets = [];
    this.pullTweets(data, 200);
  }

  render() {
    if(this.state.tweets.length !== 0) {
      return (
        <div className="App">
          <Header user={this.state.tweets[0]} changeUsername={this.changeUsername.bind(this)}/>
          <Twitter tweets={this.state.tweets}/>
        </div>
      )
    }

    if(this.state.tweets.length === 0) {
      return (
        <div className="App">
          <LoadingSvg width="200px" height="200px" color="rgb(128, 194, 175)"/>
        </div>
      )
    }
  }
}

export default App;

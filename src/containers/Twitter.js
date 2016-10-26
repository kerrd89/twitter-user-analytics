import React, { Component } from 'react';
import _ from 'lodash';

class List extends Component {

  render() {
    let tweets;
    if (this.props.tweets) {
      console.log(_.slice(this.props.tweets, 0, 10));
      tweets = this.props.tweets.map((tweet)=>{
        return (
          <li className="twitter-card" key={tweet.id_str}>
          <p className="twitter-card-header">
          {tweet.user.name}<span>@{tweet.user.screen_name}</span>
          </p>
          <p className="twitter-card-body">{tweet.text}</p>
          <p className="twitter-card-footer">{tweet.retweet_count}<span>{tweet.created_at}</span></p>
          </li>
        );
      });
    }
    return (
        <ul>
          {tweets}
        </ul>
    );
  }
}

export default List

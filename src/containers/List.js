import React, { Component } from 'react';

class List extends Component {

  render() {
    if (!this.props.tweets) {return;}
    let tweets = this.props.tweets.map((tweet)=>{
      return <li>{tweet.author_name}</li>;
    });
    return (
        <ul>
          {tweets}
        </ul>
    );
  }
}

export default List

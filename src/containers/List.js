import React, { Component } from 'react';

class List extends Component {
  render() {
    let tweets = this.props.tweets.map((tweet)=>{
      return <p key={tweet}>{tweet}</p>
    });
    return (
        <div>
          {tweets}
        </div>
    );
  }
}

export default List

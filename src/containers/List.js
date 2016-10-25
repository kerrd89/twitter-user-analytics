import React, { Component } from 'react';

class List extends Component {

  render() {
    let tweets;
    let instagramPosts;
    if (this.props.tweets) {
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
    if (this.props.insta) {
      instagramPosts = this.props.insta.map((post) => {
        if(post.videos) return;
        return (
          <li className="instagram-card" key={post.id}>
            <p className="instagram-card-header">
              <img src="https://source.unsplash.com/random/300x300" alt={post.caption.text}/>
              {post.caption.text}
            </p>
          </li>
        )
      })
    }
    return (
        <ul>
          {instagramPosts}
          {tweets}
        </ul>
    );
  }
}

export default List

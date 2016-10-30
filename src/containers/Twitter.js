import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class List extends Component {



  render() {
    let tweets;
    let userMentions;

    if (this.props.tweets) {
      userMentions = this.props.tweets.map((tweet) => {
        if(tweet.entities.user_mentions.length !== 0) {
          let mentions = tweet.entities.user_mentions.map((userMention) => {
            return userMention.screen_name;
          });
          return (mentions);
        }
      });
      userMentions = _.countBy(_.compact(_.flatten(userMentions)));
      console.log(userMentions)
      let potato = _.reduce(userMentions, function(result, value, key) {
        let obj = {username: "", count: null};
        obj.username = key;
        obj.count = value;
        if(!result.length) return result.concat(obj);
        for(let i = 0; i < result.length; i ++) {
          if(obj.count>result[i].count) {
            result.splice(i,0,obj);
            return result;
          }
        }
        return result.concat(obj);
      }, []);
      console.log(potato, 'potato');
    }





    if (this.props.tweets) {
      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return (
          <li className="twitter-card" key={tweet.id_str}>
            <p className="twitter-card-header">
              {tweet.user.name}<span>@{tweet.user.screen_name}</span>
            </p>
            <p className="twitter-card-body">{tweet.text}</p>
            <p className="twitter-card-footer">{tweet.retweet_count}
              <span>{tweet.favorited_count}</span>
              <span>{moment(tweet.created_at).format('LLL')}</span>
            </p>
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

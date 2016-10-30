import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class List extends Component {

  userMentionsTemplate(userMention) {
    return (
      <li>{userMention.username}: {userMention.count}</li>
    );
  }

  hashtagTemplate(hashtag) {
    return (
      <li>{hashtag.hashtag}: {hashtag.count}</li>
    );
  }

  tweetTemplate(tweet) {
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
    )
  }

  render() {
    let tweets;
    let userMentions;
    let hashtags;

    if (this.props.tweets) {

      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return this.tweetTemplate(tweet);
      });

      userMentions = this.props.tweets.map((tweet) => {
        if(tweet.entities.user_mentions.length !== 0) {
          let mentions = tweet.entities.user_mentions.map((userMention) => {
            return userMention.screen_name;
          });
          return mentions;
        }
      });
      userMentions = _.countBy(_.compact(_.flatten(userMentions)));
      let userMentionsFiltered = _.reduce(userMentions, function(result, value, key) {
        let obj = {};
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
      userMentions = _.slice(userMentionsFiltered, 0, 10).map((user)=>{
        return this.userMentionsTemplate(user);
      });


      hashtags = this.props.tweets.map((tweet) => {
        if(tweet.entities.hashtags.length !== 0) {
          let tags = tweet.entities.hashtags.map((hashtag) => {
            return hashtag.text;
          });
          return tags;
        }
      });
      hashtags = _.countBy(_.compact(_.flatten(hashtags)))
      let hashtagsFiltered = _.reduce(hashtags, function(result, value, key) {
        let obj = {};
        obj.hashtag = key;
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
      hashtags = _.slice(hashtagsFiltered, 0, 10).map((hashtag) => {
        return this.hashtagTemplate(hashtag);
      });
    }


    return (
      <div>
        <ul>
          {tweets}
        </ul>
        <ul>
          {userMentions}
        </ul>
        <ul>
          {hashtags}
        </ul>
      </div>
    );
  }
}

export default List

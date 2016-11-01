import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import LineChartTemplate from '../components/LineChart';


class List extends Component {

  userMentionsTemplate(userMention) {
    return (
      <li key={userMention.username}>{userMention.username}: {userMention.count}</li>
    );
  }

  hashtagTemplate(hashtag) {
    return (
      <li key={hashtag.hashtag}>{hashtag.hashtag}: {hashtag.count}</li>
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

  getActivityByWeekday(tweets) {
    if (!tweets.length) return;
    let activityByWeekday = tweets.map((tweet) => {
      return moment(tweet.created_at).format('dddd');
    })
    activityByWeekday = _.countBy(_.compact(_.flatten(activityByWeekday)));

    let activityByWeek = tweets.map((tweet) => {
      return moment(tweet.created_at).format('wwww');
    })
    let data = [];
    data.push(activityByWeekday['Monday'])
    data.push(activityByWeekday['Tuesday'])
    data.push(activityByWeekday['Wednesday'])
    data.push(activityByWeekday['Thursday'])
    data.push(activityByWeekday['Friday'])
    data.push(activityByWeekday['Saturday'])
    data.push(activityByWeekday['Sunday'])
    let labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return (
      <LineChartTemplate data={data} labels={labels} width="600" height="250"/>
    )
  }

  getActivityByWeek(tweets){
    let label1 = moment(tweets[1].created_at).format('LL')
    let label2 = moment(tweets[30].created_at).format('LL')
    let label3 = moment(tweets[60].created_at).format('LL')
    let label4 = moment(tweets[90].created_at).format('LL')
    let label5 = moment(tweets[120].created_at).format('LL')
    let label6 = moment(tweets[150].created_at).format('LL')
    let label7 = moment(tweets[180].created_at).format('LL')
    let labels = [label1,label2,label3,label4,label5,label6,label7];

    let activityByWeek = tweets.map((tweet) => {
      return moment(tweet.created_at).format('ww');
    })

    activityByWeek = _.countBy(_.compact(_.flatten(activityByWeek)));

    let data = [];
    _.map(activityByWeek, ((week)=>{
      data.push(week)
    }))


    return (
      <LineChartTemplate data={data} labels={labels.reverse()} width="600" height="250"/>
    )
  }

  getUserMentions(tweets) {
    let userReferences = tweets.map((tweet) => {
      if(tweet.entities.user_mentions.length !== 0) {
        let mentions = tweet.entities.user_mentions.map((userMention) => {
          return userMention.screen_name;
        });
        return mentions;
      }
    });
    userReferences = _.countBy(_.compact(_.flatten(userReferences)));
    let userReferencesFiltered = _.reduce(userReferences, function(result, value, key) {
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
    userReferences = _.slice(userReferencesFiltered, 0, 10).map((user)=>{
      return this.userMentionsTemplate(user);
    });
    return userReferences;
  }

  getHashtags(tweets) {
    let allHashtags = tweets.map((tweet) => {
      if(tweet.entities.hashtags.length !== 0) {
        let tags = tweet.entities.hashtags.map((hashtag) => {
          return hashtag.text;
        });
        return tags;
      }
    });
    allHashtags = _.countBy(_.compact(_.flatten(allHashtags)))
    let allHashtagsFiltered = _.reduce(allHashtags, function(result, value, key) {
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
    allHashtags = _.slice(allHashtagsFiltered, 0, 10).map((hashtag) => {
      return this.hashtagTemplate(hashtag);
    });
    return allHashtags;
  }

  render() {
    let tweets;
    let userMentions;
    let hashtags;
    let activityByWeekday;
    let activityByWeek;

    if (this.props.tweets.length) {
      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return this.tweetTemplate(tweet);
      });
      userMentions = this.getUserMentions(this.props.tweets)
      hashtags = this.getHashtags(this.props.tweets)
      activityByWeekday = this.getActivityByWeekday(this.props.tweets)
      activityByWeek = this.getActivityByWeek(this.props.tweets)
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
          {activityByWeekday}
          {activityByWeek}
      </div>
    );
  }
}

export default List

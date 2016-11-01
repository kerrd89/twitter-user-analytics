import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import LineChartTemplate from '../components/LineChart';
// import * as twitterHelpers from '../utils/twitter-helpers.js';


// twitterHelpers.getActivityByWeekday(tweets);

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
    let labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    data.push(activityByWeekday['Monday'])
    data.push(activityByWeekday['Tuesday'])
    data.push(activityByWeekday['Wednesday'])
    data.push(activityByWeekday['Thursday'])
    data.push(activityByWeekday['Friday'])
    data.push(activityByWeekday['Saturday'])
    data.push(activityByWeekday['Sunday'])
    return (
      <LineChartTemplate data={data} labels={labels} width="600" height="250"/>
    )
  }

  getActivityByWeek(tweets){

    let activityByWeek = tweets.map((tweet) => {
      return moment(tweet.created_at).format('ww');
    })

    activityByWeek = _.countBy(_.compact(_.flatten(activityByWeek)));
    let data = [];
    _.map(activityByWeek, ((week)=>{
      data.push(week)
    }))
    let labels = [];
    let labelHelper = Math.floor(tweets.length/data.length)

    for(let i = 0; i < data.length; i++) {
      let indexForLabel = (labelHelper*i)
      let label = moment(tweets[indexForLabel].created_at).format('LL')
      labels.push(label)
    }

    return (
      <LineChartTemplate data={data} labels={labels.reverse()} width="600" height="250"/>
    )
  }

  getActivityByHour(tweets){
    let labels = ['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM',
    '9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM',
    '9PM','10PM','11PM'];

    let activityByHour = tweets.map((tweet) => {
      return moment(tweet.created_at).format('HH');
    })

    activityByHour = _.countBy(_.compact(_.flatten(activityByHour)));

    let data = [];

    for(let i = 1; i < 25; i++) {
      let index = i.toString()
      if(activityByHour[index]!==undefined) {
        data.push((activityByHour[index]))
      } else {
        data.push(0)
      }
    }

    return (
      <LineChartTemplate data={data} labels={labels} width="600" height="250"/>
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
    let activityByHour;

    if (this.props.tweets.length) {
      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return this.tweetTemplate(tweet);
      });
      userMentions = this.getUserMentions(this.props.tweets)
      hashtags = this.getHashtags(this.props.tweets)
      activityByWeekday = this.getActivityByWeekday(this.props.tweets)
      activityByWeek = this.getActivityByWeek(this.props.tweets)
      activityByHour = this.getActivityByHour(this.props.tweets)
    }

    return (
      <div className="twitter-container">
        <ul className="side-bar">
          {tweets}
        </ul>
        <div className="user-lists">
          <p>Users mentioned</p>
          <ul className="user-mentions">
            {userMentions}
          </ul>
          <p>Hashtags used</p>
          <ul className="user-hashtags">
            {hashtags}
          </ul >
        </div>
        <div className="activity-charts">
          {activityByWeekday}
          {activityByWeek}
          {activityByHour}
        </div>
      </div>
    );
  }
}

export default List

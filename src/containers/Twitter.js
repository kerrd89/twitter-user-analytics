import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
const LineChart = require('react-chartjs').Line;

class List extends Component {
  constructor(props) {
    super();
    this.state = {
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: "user-activity by day",
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false,
        }
      ]
      },
    };
  }

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

  getActivityByDate(tweets) {
    if (!tweets.length) return;
    let activityByDate = tweets.map((tweet) => {
      return moment(tweet.created_at).format('dddd');
    })

    activityByDate = _.countBy(_.compact(_.flatten(activityByDate)));
    let data = [];
    data.push(activityByDate['Monday'])
    data.push(activityByDate['Tuesday'])
    data.push(activityByDate['Wednesday'])
    data.push(activityByDate['Thursday'])
    data.push(activityByDate['Friday'])
    data.push(activityByDate['Saturday'])
    data.push(activityByDate['Sunday'])
    let chartData = this.state.data
    chartData.datasets[0].data = data
    return (
      <LineChart data={chartData} width="600" height="250"/>
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
    let twitterActivityChart;

    if (this.props.tweets.length) {
      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return this.tweetTemplate(tweet);
      });
      userMentions = this.getUserMentions(this.props.tweets)
      hashtags = this.getHashtags(this.props.tweets)
      twitterActivityChart = this.getActivityByDate(this.props.tweets)
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
          {twitterActivityChart}
      </div>
    );
  }
}

export default List

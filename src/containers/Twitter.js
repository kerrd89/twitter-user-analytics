import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ChartistGraph from 'react-chartist';

class List extends Component {
  constructor(props) {
    super();
    this.state = {
      simpleLineChartData: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [[30,30,40,40,50,60,50]]
      },
      lineChartOptions: {
        low: 0,
        showArea: true
      }
    };
  }

  componentWillReceiveProps() {
    this.getActivityByDate(this.props.tweets);
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
    d
    activityByDate = _.countBy(_.compact(_.flatten(activityByDate)));
    let data = [];
    data.push(activityByDate['Monday'])
    data.push(activityByDate['Tuesday'])
    data.push(activityByDate['Wednesday'])
    data.push(activityByDate['Thursday'])
    data.push(activityByDate['Friday'])
    data.push(activityByDate['Saturday'])
    data.push(activityByDate['Sunday'])
    this.state.simpleLineChartData.series[0]=data;
    debugger;
    this.forceUpdate();
    // return this.setState({simpleLineChartData:this.state.simpleLineChartData.series=[data]})
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

    if (this.props.tweets.length) {
      tweets = _.slice(this.props.tweets, 0, 10).map((tweet)=>{
        return this.tweetTemplate(tweet);
      });
      userMentions = this.getUserMentions(this.props.tweets)
      hashtags = this.getHashtags(this.props.tweets)
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
        <ChartistGraph data={this.state.simpleLineChartData} type='Line'/>
      </div>
    );
  }
}

export default List

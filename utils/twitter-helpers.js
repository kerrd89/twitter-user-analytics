'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import LineChartTemplate from '../src/components/LineChart';

let commonWords = [
  "i","rt","the","is","a","of","us","for","this","in","to","and","you","by","like",
  "my","but","we","have","that",' ',"1","2","be","me","at","|","on","it's","don't",
  "it","from","you're","with","are","just","do","has","was","i'm","an","am","","if",
  "can","7"
];

const twitterHelpers = {
  tweetTemplate: (tweet) => {
    return (
      <li className="twitter-card" key={tweet.id_str}>
      <p className="twitter-card-header">
      {tweet.user.name}<span>@{tweet.user.screen_name}</span>
      </p>
      <p className="twitter-card-body">{tweet.text}</p>
      <div className="twitter-card-footer">
        <span>Retweets:{tweet.retweet_count} </span>
        <span className="twitter-favorited">Favorited:{tweet.favorite_count} </span>
        <span className="twitter-date">{moment(tweet.created_at).format('LLL')}</span>
      </div>
      </li>
    )
  },

  hashtagTemplate: (hashtag) => {
    return (<li key={hashtag.hashtag}>{hashtag.hashtag}: {hashtag.count}</li>);
  },

  tweetTemplate: (tweet) => {
    return (
      <li className="twitter-card" key={tweet.id_str}>
      <p className="twitter-card-header">
      {tweet.user.name}<span>@{tweet.user.screen_name}</span>
      </p>
      <p className="twitter-card-body">{tweet.text}</p>
      <div className="twitter-card-footer">
        <span>Retweets:{tweet.retweet_count} </span>
        <span className="twitter-favorited">Favorited:{tweet.favorite_count} </span>
        <span className="twitter-date">{moment(tweet.created_at).format('LLL')}</span>
      </div>
      </li>
    )
  },

  getActivityByWeekday: (tweets) => {
    if (!tweets.length) return;
    let activityByWeekday = tweets.map((tweet) => {
      return moment(tweet.created_at).format('dddd');
    });
    activityByWeekday = _.countBy(_.compact(_.flatten(activityByWeekday)));

    let activityByWeek = tweets.map((tweet) => {
      return moment(tweet.created_at).format('wwww');
    });
    let data = [];
    data.push(activityByWeekday.Monday);
    data.push(activityByWeekday.Tuesday);
    data.push(activityByWeekday.Wednesday);
    data.push(activityByWeekday.Thursday);
    data.push(activityByWeekday.Friday);
    data.push(activityByWeekday.Saturday);
    data.push(activityByWeekday.Sunday);
    let labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (<LineChartTemplate data={data} labels={labels} title="Activity by Day" width="600" height=" 250"/>)
  },

  getActivityByWeek: (tweets) => {
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
    return (<LineChartTemplate data={data} labels={labels.reverse()} title="Recent Activity by Week" width="600" height="250"/>)
  },

  getActivityByHour: (tweets) => {
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
      <LineChartTemplate data={data} labels={labels} title="Average Activity by Hour" width="600" height="250"/>
    )
  },

  getActivityByLocation: (tweets) => {
    let activityByLocation = tweets.map((tweet) => {
      if(!tweet.place) return;
      return tweet.place.full_name;
    })
    if(!activityByLocation) return;
    activityByLocation = _.countBy(_.compact(_.flatten(activityByLocation)));
    let tweetLocationsFiltered = _.reduce(activityByLocation, function(result, value, key) {
      let obj = {};
      obj.location = key;
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

    activityByLocation = _.slice(tweetLocationsFiltered,0,10).map((location)=> {
      return (<li key={location.location}>{location.location}: {location.count}</li>)
    })
    return(
      activityByLocation
    )
  },

  getUserMentions: (tweets) => {
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
      return <li key={user.username}>{user.username}: {user.count}</li>;
    });
    return userReferences;
  },

  getHashtags: (tweets) => {
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
      return <li key={hashtag.hashtag}>{hashtag.hashtag}: {hashtag.count}</li>;
    });
    return allHashtags;
  },

  getRepeatedWords: (tweets) => {
    let allWords = tweets.map((tweet) => {
      return tweet.text.split(' ')
    });
    allWords = _.countBy(_.flatten(allWords))
    let allWordsFiltered = _.reduce(allWords, function(result, value, key) {
      if(commonWords.includes(key.toLowerCase())) return result
      if(key.includes('@')||key.includes('#')) return result;
      let obj = {};
      obj.word = key;
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
    allWords = _.slice(allWordsFiltered, 0, 20).map((word) => {
      return (<li key={word.word}>{word.word}: {word.count}</li>)
    });
    return allWords
  }
}

export default twitterHelpers;

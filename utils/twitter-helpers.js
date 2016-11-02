import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import LineChartTemplate from '../components/LineChart';
import LeafletMap from '../components/LeafletMap';

export default twitterHelpers = {
  getActivityByWeekday: getActivityByWeekday(tweets) {
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
}

function getActivityByWeekday(tweets) {
  // fn stuff
}

export default {
  getActivityByWeekday,
  getTweets,
}

'use strict';
var Twitter = require('node-twitter-api');
const express = require('express');
var app = express();
const _ = require('lodash');

var twitter = new Twitter(require ('./config'));

app.set('port', process.env.PORT || 3001);
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});

const getTweetsForUser = (username, numberOfTweets, callback) => {
  twitter.getTimeline("user_timeline",
    {"screen_name": username ,"count": numberOfTweets},
    twitter.accessToken,
    twitter.accessTokenSecret,
    callback
  );
};

app.get('/api/tweets-for-user/:username', function(req, res) {
  const numberOfTweets = req.query.count || 3;
  const maxID = req.query.maxID || 0;
  getTweetsForUser(req.params.username, numberOfTweets, (error, data) => {
    _.compact();
    res.send(data);
  });
});

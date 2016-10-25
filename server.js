'use strict';
var Twitter = require('node-twitter-api');
const express = require('express');
var app = express();

var twitter = new Twitter(require ('./config'));

app.set('port', process.env.PORT || 3001);

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
  getTweetsForUser(req.params.username, numberOfTweets, (error, data) => {
    res.send(data);
  });
});






/*"engines" : {"node":"6.3.1"}*/

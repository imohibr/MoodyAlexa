var Twit = require('twit')
var AWS = require('aws-sdk');

// Twitter API
var T = new Twit({
  consumer_key: 'hQqzNWz4SJQV6u0zFckjecbHq',
  consumer_secret: 'JlT4QZXdNW5J0O7xnS6Ciefdyjm5OfnM2NDZljJaZezBAKxxw6',
  access_token: '873642945924272130-UEadBqzopW3uVwYrVy8e2lM8GI9SS9h',
  access_token_secret: 'j3WmkMvN7VGXYv7XBlCQF8pOetQlHSOg4WFDmvszNoDT3',
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})


AWS.config.update({
  apiVersion: '2017-11-27',
  accessKeyId: 'AKIAI5QO2WWKVLL37NUQ',
  // secretAccessKey: '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',
  secretAccessKey: 'MmING8fTUJ0jQAiUoOacVfkg7uMGh3AbPz8vtif3',
  region: 'us-east-1',
});

// AWS Comprehend
var comprehend = new AWS.Comprehend({});

var count = 3;



module.exports.textAnalyze = function (req, res, next) {
  var day = req.params.myDay;
  var positive = 0;
  var negative = 0;
  var neutral = 0;
  var mixed = 0;

  comprehend.detectSentiment({
    LanguageCode: 'en',
    Text: day
  }, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var sentiment = data['SentimentScore'];

      positive += sentiment['Positive'];
      negative += sentiment['Negative'];
      neutral += sentiment['Neutral'];
      mixed += sentiment['Mixed'];

      // console.log(data); // successful response
      //
      // console.log('______________________________________________');
      // console.log('positive = ' + positive);
      // console.log('negative = ' + negative);
      // console.log('neutral = ' + neutral);
      // console.log('mixed = ' + mixed);

      res.status(200).json({
        err: null,
        msg: 'Analyze Day',
        data: sentiment
      });
    }
  });


  }

// Load tweets from account
module.exports.tweetAnalyze = function (req, res, next) {
  var twiter_acc = req.params.handle;

  T.get('statuses/user_timeline', {
  screen_name: twiter_acc,
  count: count
}, function(err, data, response) {
  var positive = 0;
  var negative = 0;
  var neutral = 0;
  var mixed = 0;
  var combined_tweet = '';
  if(err)
  {
    console.log(err);
  }
  else
  {

  for (i = 0; i < count; i++) {
    // console.log(data[i]);
    var tweet_text = data[i]['text'];
    combined_tweet += tweet_text + ".";
    // console.log(tweet_text);
  }

  comprehend.detectSentiment({
    LanguageCode: 'en',
    Text: combined_tweet
  }, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var sentiment = data['SentimentScore'];

      positive += sentiment['Positive'];
      negative += sentiment['Negative'];
      neutral += sentiment['Neutral'];
      mixed += sentiment['Mixed'];

      // console.log(data); // successful response
      //
      // console.log('______________________________________________');
      // console.log('positive = ' + positive);
      // console.log('negative = ' + negative);
      // console.log('neutral = ' + neutral);
      // console.log('mixed = ' + mixed);

      res.status(200).json({
        err: null,
        msg: 'Tweets Retrivied.',
        data: sentiment
      });
    }
  });

}
});
}

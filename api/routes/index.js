var express = require('express'),
  Rekognition = require('../controllers/Rekognition.js'),
  twit = require('../controllers/twit.js'),
  cors = require('cors'),
  router = express.Router();

// app = express();
router.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);

router.post('/face/', Rekognition.faceAnalyze);

router.get('/tweet/:handle', twit.tweetAnalyze);

router.get('/text/:myDay', twit.textAnalyze);


module.exports = router;

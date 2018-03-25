var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAIGF37SV5PBKPFPTQ',
  secretAccessKey: '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',
  region: 'us-east-1'
});


var rekognition = new AWS.Rekognition();













var params = {
  Image: {
    /* required */
    S3Object: {
      Bucket: 'mmsmhh-emotionrecognition',
      Name: 'test.jpg' // TODO: get upload photo
    }
  },
  Attributes: [
    "ALL", "DEFAULT"
  ]
};


module.exports.faceAnalyze = function(req, res, next) {

  var webcam = req.body.imageAsDataUrl;
console.log(webcam);

  const base64Data = new Buffer(webcam.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = webcam.split(';')[0].split('/')[1];




const params = {
  Bucket: 'mmsmhh-emotionrecognition',
  Key: `test.`+type,
  Body: base64Data,
  ACL: 'public-read',
  ContentEncoding: 'base64', // required
  ContentType: `image/${type}`
}

const s3 = new AWS.S3();


s3.upload(params, (err, data) => {
  if (err) { return console.log(err) }

  // Continue if no error
  // Save data.Location in your database
  console.log('Image successfully uploaded.');
});




//   var img = webcam['imageAsDataUrl']
//
//   // var s3Bucket = new AWS.S3({
//   //   params: {
//   //     Bucket: 'mmsmhh-emotionrecognition'
//   //   }
//   // });
//
//   var config = {
//   "aws" : {
//         "bucket": "mmsmhh-emotionrecognition",
//         // "domain" : "",
//         // "prefix" : "",
//         // "path": "my/test/",
//         "credentials" : {
//             "accessKeyId": "AKIAIGF37SV5PBKPFPTQ",
//             "secretAccessKey": "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"
//         }
//     }
// };
//
// var getUniqueFilename = function(config) {
//     var timestamp = (new Date()).getTime();
//     var randomInteger = Math.floor((Math.random() * 1000000) + 1);
//
//     return config.aws.path + timestamp + '_' + randomInteger + '.jpeg';
// };
//
//  console.log('NEW IMAGE ' + webcam['imageAsDataUrl']);
//     var buf = new Buffer(webcam, 'base64');
//     AWS.config = config.aws.credentials;
//     var key = getUniqueFilename(config);
//     var s3 = new AWS.S3();
//     s3.putObject({
//         Bucket: config.aws.bucket,
//         Key: key,
//         Body: buf,
//         ACL: 'public-read',
//
//         ContentType: "image/jpeg",
//         ContentEncoding: "base64"
//     }, function(error, data) {
//         // callback(data, error, key);
//     });
//
    // buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    //   var data = {
    //     Key: "test.jpeg",
    //     Body: buf,
    //     ContentEncoding: 'base64data',
    //     ContentType: 'image/jpeg'
    //   };
    //   s3Bucket.putObject(data, function(err, data) {
    //     if (err) {
    //       console.log(err);
    //       console.log('Error uploading data: ', data);
    //     } else {
    //       console.log('succesfully uploaded the image!');
    //     }
    //   });
    // // console.log('NEW IMAGE' + webcam);
    // var buf = new Buffer(webcam, 'base64');
    //     // AWS.config = config.aws.credentials;
    //     // var key = getUniqueFilename(config);
    //     s3Bucket.putObject({
    //         Bucket: config.aws.bucket,
    //         Key: "test.png",
    //         Body: buf,
    //         ACL: 'public-read',
    //
    //         ContentType: "image/png",
    //         ContentEncoding: "base64"
    //     }, function(error, data) {
    //         callback(data, error, key);
    //     });
//
//
//
//
//
//
//   rekognition.detectFaces(params, function(err, data) {
//     if (err) return next(err);
//
//     else {
//       var x = data.FaceDetails[0].Emotions;
//
//       var maxname = "";
//       var maxvalue = 0;
//
//
//       x.filter(function(value) {
//         //
//         // console.log(value.Confidence)
//         // console.log(value.Type)
//
//         if (value.Confidence > maxvalue) {
//           maxvalue = value.Confidence;
//           maxname = value.Type;
//         }
//
//       });
//
//       res.status(200).json({
//         err: null,
//         msg: 'Users retrieved successfully.',
//         data: maxname
//       });
//       // console.log("And the r is")
//       //
//       // console.log(maxname)
//     }
//
//   })
};

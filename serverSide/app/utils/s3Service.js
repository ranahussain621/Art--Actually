const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK with your access keys
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.RIGION, 
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
function uploadToS3(file, destinationFolder) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);
    const fileName = Date.now() + path.extname(file.originalname);
    const params = {
      Bucket: process.env.BUCKET, 
      Key: `${destinationFolder}/${fileName}`,
      Body: fileStream,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); 
      }
    });
  });
}

module.exports = {
  uploadToS3,
};

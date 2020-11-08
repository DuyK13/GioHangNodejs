const AWS = require("aws-sdk");
const multer = require("multer");
require('dotenv').config(); // sử dụng file .env

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_PRIVATE
});

const s3 = new AWS.S3();

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '')
    }
})

let upload = multer({ storage });

let uploadSingleImage = async (params) => {
    try {
        let uploadImage = await s3.upload(params, (err, data) => {
            if (err) {
                console.error(JSON.stringify(err));
            } else {
                console.log(data);
            }
        }).promise();
        return uploadImage;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

module.exports = {
    upload: upload,
    uploadSingleImage: uploadSingleImage
};
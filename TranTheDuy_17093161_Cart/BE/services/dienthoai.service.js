const AWS = require('aws-sdk'); // import AWS
require('dotenv').config(); // sử dụng file .env

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_PRIVATE
});

let docClient = new AWS.DynamoDB.DocumentClient;

// get list dien thoai
let getListDT = async (params) => {
    try {
        let onScan = (err, data) => {
            if (err) {
                console.error(JSON.stringify(err));
            } else {
                if (typeof data.LastEvaluatedKey != "undefined") {
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
            }
        }

        let listDT = await docClient.scan(params, onScan).promise();

        return listDT.Items;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

module.exports = {
    getListDT: getListDT
}
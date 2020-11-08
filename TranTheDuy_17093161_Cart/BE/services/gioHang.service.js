const AWS = require('aws-sdk'); // import AWS
require('dotenv').config(); // sử dụng file .env

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_PRIVATE
});

let docClient = new AWS.DynamoDB.DocumentClient;

// Find Item
let getItemCart = async (params) => {
    try {
        return await docClient.query(params).promise();
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

// Add to cart
let addItemCart = async (params) => {
    try {
        return await docClient.put(params).promise();
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

// Update to cart
let updateItemCart = async (params) => {
    try {
        return await docClient.update(params).promise();
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

// Remove item
let removeItemCart = async (params) => {
    try {
        return await docClient.delete(params).promise();
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

// Remove cart
let removeCart = async (params) => {
    try {
        return await docClient.delete(params).promise();
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

// Get cart
let getCart = async (params) => {
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
        return (await docClient.scan(params, onScan).promise()).Items;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}



module.exports = {
    addItemCart: addItemCart,
    removeItemCart: removeItemCart,
    removeCart: removeCart,
    getCart: getCart,
    updateItemCart: updateItemCart,
    getItemCart: getItemCart
}
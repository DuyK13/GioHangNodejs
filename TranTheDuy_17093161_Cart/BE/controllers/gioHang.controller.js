const GioHangService = require('../services/gioHang.service');
const TABLENAME = "GioHang";

// Find item
let getItemCart = async (req, res) => {
    let params = {
        TableName: TABLENAME,
        KeyConditionExpression: "#userID = :userID and #itemID = :itemID",
        ExpressionAttributeNames: {
            "#itemID": "itemID",
            "#userID": "userID"
        },
        ExpressionAttributeValues: {
            ":userID": req.params.userID,
            ":itemID": req.params.itemID
        }
    }
    try {
        let getItem = await GioHangService.getItemCart(params);
        return res.status(200).json({ status: 200, data: getItem.Items, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

// Add to cart
let addItemCart = async (req, res) => {
    let params = {
        TableName: TABLENAME,
        Item: {
            "userID": req.body.userID,
            "itemID": req.body.itemID,
            "itemName": req.body.itemName,
            "quantity": req.body.quantity,
            "price": req.body.price
        }
    }
    try {
        let addItem = await GioHangService.addItemCart(params);
        return res.status(200).json({ status: 200, data: addItem, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

// Remove item 
let removeItemCart = async (req, res) => {
    let params = {
        TableName: TABLENAME,
        Key: {
            "userID": req.params.userID,
            "itemID": req.params.itemID
        }
    }
    try {
        let removeItem = await GioHangService.removeItemCart(params);
        return res.status(200).json({ status: 200, data: removeItem, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

// Remove cart
let removeCart = async (req, res) => {
    let params = {
        TableName: TABLENAME
    }
    try {
        let cart = await GioHangService.getCart(params);
        for (var item of cart) {
            let removeParams = {
                TableName: TABLENAME,
                Key: {
                    "userID": item.userID,
                    "itemID": item.itemID
                }
            }
            try {
                await GioHangService.removeItemCart(removeParams);
            } catch (ex) {
                return res.status(400).json({ status: 400, message: ex.message });
            }
        }
        return res.status(200).json({ status: 200, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

// Get cart
let getCart = async (req, res) => {
    let params = {
        TableName: TABLENAME
    }
    try {
        let cart = await GioHangService.getCart(params);
        return res.status(200).json({ status: 200, data: cart, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

// update item cart
let updateItemCart = async (req, res) => {
    let params = {
        TableName: TABLENAME,
        Key: {
            "userID": req.params.userID,
            "itemID": req.params.itemID
        },
        UpdateExpression: "set quantity = :q",
        ExpressionAttributeValues: {
            ":q": req.body.quantity
        },
        ReturnValues: "UPDATED_NEW"
    }

    try {
        let updateItem = await GioHangService.updateItemCart(params);
        return res.status(200).json({ status: 200, data: updateItem.Attributes, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
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
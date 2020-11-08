const express = require('express'); //import express
const router = express.Router(); // import Router
const GioHangController = require('../controllers/gioHang.controller');

// Add to cart
router.post('/add', GioHangController.addItemCart);

// Update item
router.put('/:userID/:itemID', GioHangController.updateItemCart);

// Remove item
router.delete('/remove/:userID/:itemID', GioHangController.removeItemCart);

// Remove cart
router.delete('/remove/:userID', GioHangController.removeCart);

// Get cart
router.get('/', GioHangController.getCart);

// Find item
router.get('/:userID/:itemID', GioHangController.getItemCart);

module.exports = router;
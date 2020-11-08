const express = require('express'); //import express
const router = express.Router(); // import Router
const DienThoaiController = require('../controllers/dienthoai.controller');

// get list dien thoai
router.get('/', DienThoaiController.getListDT);

module.exports = router;
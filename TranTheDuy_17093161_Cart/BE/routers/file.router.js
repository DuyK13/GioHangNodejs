const express = require('express');
const router = express.Router();
const FileController = require('../controllers/file.controller');

router.post('/image', FileController.singleImage, FileController.uploadSingleImage);

module.exports = router;
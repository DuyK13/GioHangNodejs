
const FileService = require('../services/file.service');
const upload = FileService.upload;

let singleImage = upload.single('image');

let uploadSingleImage = async (req, res) => {
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
    }
    try {
        let uploadFile = await FileService.uploadSingleImage(params);
        return res.status(200).json({ status: 200, data: uploadFile, message: "success" })
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};



module.exports = {
    uploadSingleImage: uploadSingleImage,
    singleImage: singleImage
}
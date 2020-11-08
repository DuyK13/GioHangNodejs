const DienThoaiService = require('../services/dienthoai.service');

// get list dien thoai
let getListDT = async (req, res) => {
    let params = {
        TableName: "DienThoai"
    }
    try {
        let listDT = await DienThoaiService.getListDT(params);
        return res.status(200).json({ status: 200, data: listDT, message: "success" });
    } catch (ex) {
        return res.status(400).json({ status: 400, message: ex.message });
    }
}

module.exports = {
    getListDT: getListDT
}
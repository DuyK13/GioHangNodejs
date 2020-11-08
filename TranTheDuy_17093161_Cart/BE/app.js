const express = require('express'); // expressjs
const path = require('path'); // path
const app = express(); // Tạo expressjs
require('dotenv').config(); // Gọi file .env
const PORT = process.env.PORT || 5000; // PORT
const IP = process.env.IP || "localhost"; // IP
const dtRoute = require('./routers/dienthoai.router'); // import Route
const fileRoute = require('./routers/file.router');
const gioHangRoute = require('./routers/gioHang.router');
const cors = require('cors');

app.use(cors());
/**
 * Middleware để parse application/json
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Sử dụng Route
 */
app.use('/dienthoai', dtRoute);
app.use('/file', fileRoute);
app.use('/giohang', gioHangRoute);

/**
 * Kết nối tới PORT và IP
 */
app.listen(PORT, IP, () => {
    console.log(`Server is running on port ${IP}:${PORT}`);
})
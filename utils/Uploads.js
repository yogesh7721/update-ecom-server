const multer = require("multer")
const path = require("path")
// const fs = require("fs")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
exports.upload = multer({ storage }).single("hero")
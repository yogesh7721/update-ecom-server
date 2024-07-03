// publicGetAllProduct
// publicGetProductDetails

const asyncHandler = require("express-async-handler")
const Product = require("../model/Product")
exports.publicGetAllProduct = asyncHandler(async (req, res) => {
    const result = await Product.find({ active: true })
    res.json({ message: "Public GetAllProduct Sucess", result })
})
exports.publicGetProductDetails = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)
    res.json({ message: "Public GetProductDetails Sucess", result })
})
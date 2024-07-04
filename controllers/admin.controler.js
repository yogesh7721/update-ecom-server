const asyncHandler = require("express-async-handler")
const Product = require("../model/Product");
const { upload } = require("../utils/Uploads");
const { findById } = require("../model/Order");
const Order = require("../model/Order");
const User = require("../model/User");
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//  Products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Prodcut fetch Success", result })
})
exports.addProducts = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload Error" })
        }
        // console.log(req.file.path)
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        const result = await Product.create({ ...req.body, images: secure_url })
        res.json({ message: "Prodcut Add Success", result })
    })
})
exports.updateProducts = asyncHandler(async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "Prodcut Update Success" })
})
exports.deleteProducts = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)

    const str = result.images.split("/")
    const img = str[str.length - 1].split(".0")[0]
    await cloudinary.uploader.destroy(img)
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Prodcut Delete Success" })
})
exports.deactivateProducts = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, { active: false })
    res.json({ message: "Prodcut Deactivate Success" })
})
exports.activateProducts = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, { active: true })
    res.json({ message: "Prodcut Activate Success" })
})
exports.getProductDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Prodcut Details Fetch Success" })
})

//////////////////////////////////////////////////////////////////////
// Order
exports.getAllOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find()
        .populate("user", { password: 0, active: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .populate("products.product", {
            _id: 1, name: 1, desc: 1, price: 1, mrp: 1, images: 1
        })
        .sort({ createdAt: -1 })
    res.json({ message: "Order Fetch Success", result })
})
exports.getAllOrderDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Order Details Fetch Success" })
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    res.json({ message: "Order cancel Success" })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    await Order.findByIdAndUpdate(id, { status })
    res.json({ message: "Order status update Success" })
})

///////////////////////////////////////////////////////////////////////
// Users
exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User fetch Success", result })
})
exports.getUserdetails = asyncHandler(async (req, res) => {
    res.json({ message: "User detail fetch Success" })
})
exports.blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id, { active: false })
    res.json({ message: "User block Success" })
})
exports.unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id, { active: true })
    res.json({ message: "User un-Block Success" })
})
exports.getUserOrders = asyncHandler(async (req, res) => {
    res.json({ message: "User order Fetch Success" })
})

////////////////////////////////////////////////////////////////////////
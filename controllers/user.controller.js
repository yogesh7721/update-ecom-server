const asyncHandler = require("express-async-handler")
const Order = require("../model/Order")

exports.userGetAllOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ user: req.params.id })
        .sort({ createdAt: -1 })
        .populate("products.product")
    res.json({ message: "Users Fetch Sucess", result })
})
exports.userGetOrderDetails = asyncHandler(async (req, res) => {
    const result = await Order.findbyId(req.params.id)
    res.json({ message: "User GetOrderDetails Sucess", result })
})
exports.userUpdatePassword = asyncHandler(async (req, res) => {
    res.json({ message: "User UpdatePassword Sucess" })
})
exports.userPlacedOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "User PlacedOrder Sucess" })
})
exports.userCancelOrder = asyncHandler(async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, { status: "cancel" })
    res.json({ message: "User CancelOrder Sucess" })
})

// userGetAllOrders
// userGetOrderDetails
// userUpdatePassword
// userPlacedOrder
// userCancelOrder
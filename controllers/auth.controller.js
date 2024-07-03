const asyncHandler = require("express-async-handler")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const Admin = require("../model/Admin")
const jwt = require("jsonwebtoken")

// Admin Auth 
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const isFound = await Admin.findOne({ email })
    if (isFound) {
        return res.status(401).json({ message: "Email Already Exist" })
    }
    const hashPass = await bcrypt.hash(password, 10)
    await Admin.create({ ...req.body, password: hashPass })
    res.json({ message: `${req.body.name} Register Success` })
})
exports.LoginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }
    const Token = jwt.sign({ userID: result._id }, process.env.JWT_KEY)
    res.cookie("admin", Token, { httpOnly: true })
    res.json({
        message: "Admin login Successs", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})

// User Auth
exports.registerUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const isFound = await User.findOne({ email })
    if (isFound) {
        return res.status(401).json({ message: "Email Already Exist" })
    }
    const hashPass = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPass })
    res.json({ message: `${req.body.name} User Register Success` })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }
    const Token = jwt.sign({ userID: result._id }, process.env.JWT_KEY)
    res.cookie("user", Token, { httpOnly: true })
    res.json({
        message: "User login Successs", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
})


const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())  // req.body madhe data takayche kam

app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/user", require("./routes/user.routes"))
app.use("/api/public", require("./routes//public.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resours Not found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
app.listen(process.env.PORT, console.log("Server Running"))
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
})
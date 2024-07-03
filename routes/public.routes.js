const router = require("express").Router()
const publicController = require("./../controllers/public.controller")

router
    .get("/get-Product", publicController.publicGetAllProduct)
    .get("/get-Product-details/:id", publicController.publicGetProductDetails)


module.exports = router
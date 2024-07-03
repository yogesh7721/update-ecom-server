const router = require("express").Router()
const userController = require("./../controllers/user.controller")

router
    .get("/get-orders/:id", userController.userGetAllOrders)
    .get("/get-orders-details/:id", userController.userGetOrderDetails)
    .put("/update-password/:id", userController.userUpdatePassword)
    .post("/order-placed", userController.userPlacedOrder)
    .put("/order-cancel/:id", userController.userCancelOrder)

module.exports = router
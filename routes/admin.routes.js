const router = require("express").Router()
const adminController = require("./../controllers/admin.controler")

router
    // Product
    .get("/products", adminController.getAllProducts)
    .get("/product-details/:id", adminController.getProductDetails)
    .post("/add-product", adminController.addProducts)
    .put("/update-product/:id", adminController.updateProducts)
    .delete("/delete-product/:id", adminController.deleteProducts)
    .put("/deactivate-product/:id", adminController.deactivateProducts)
    .put("/activate-product/:id", adminController.activateProducts)

    // Order
    .get("/orders", adminController.getAllOrders)
    .get("/order-details/:id", adminController.getAllOrderDetails)
    .put("/cancel-order/:id", adminController.cancelOrder)
    .put("/update-order-status/:id", adminController.updateOrderStatus)

    // Users
    .get("/users", adminController.getAllUsers)
    .get("/user-details/:id", adminController.getUserdetails)
    .get("/user-order/:id", adminController.getUserOrders)
    .put("/block-user/:id", adminController.blockUser)
    .put("/unblock-user/:id", adminController.unblockUser)

module.exports = router
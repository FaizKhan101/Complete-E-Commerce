const express = require("express")

const router = express.Router()

router.get("/products", (req, res, next) => {
    res.render("customer/products/all-products")
})

module.exports = router
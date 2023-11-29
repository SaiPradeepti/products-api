const express = require("express");
const router = express.Router(); // this router is a middleware

const controller = require("./controller.js");

router.route("/").get(controller.getAllProducts).post(controller.createProduct);
router
  .route("/:id")
  .get(controller.getProduct)
  .patch(controller.updateProduct)
  .delete(controller.deleteProduct);

module.exports = router;

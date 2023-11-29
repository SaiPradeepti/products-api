const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const router = require("./routes");

// app.get("/api/v1/products", getAllProducts);
// app.get("/api/v1/products/:id", getProduct);
// app.post("/api/v1/products", createProduct);
// app.patch("/api/v1/products/:id", updateProduct);
// app.delete("/api/v1/products/:id", deleteProduct);

// refactoring the above routes
// app.route("/api/v1/products").get(getAllProducts).post(createProduct);
// app
//   .route("/api/v1/products/:id")
//   .get(getProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

// creating router and mounting on the above routes
app.use("/api/v1/products", router); // subapplication for the routes
// const router = express.Router(); // this router is a middleware

// router.route("/").get(getAllProducts).post(createProduct);
// router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });

module.exports = app;

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const products = JSON.parse(fs.readFileSync("./data.json"));

const getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      products: products,
    },
  });
};

const getProduct = (req, res) => {
  const id = parseInt(req.params.id);

  if (id > products.length) {
    res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const product = products.find((item) => item.id === id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

const createProduct = (req, res) => {
  const newProduct = {
    id: products[products.length - 1].id + 1,
    ...req.body,
  };
  products.push(newProduct);
  fs.writeFile("./data.json", JSON.stringify(products), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  });
};

const updateProduct = (req, res) => {
  if (parseInt(req.params.id) > products.length) {
    res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  products.map((product) => {
    if (parseInt(req.params.id) === product.id) {
      const updatedProduct = Object.assign(product, req.body);
      return updatedProduct;
    }
  });
  fs.writeFile(`./data.json`, JSON.stringify(products), (err) => {
    if (err) console.log(err);
    res.status(200).json({
      status: "success",
      data: products,
    });
  });
};

const deleteProduct = (req, res) => {
  if (parseInt(req.params.id) > products.length) {
    res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const newProducts = products.filter(
    (product) => product.id !== parseInt(req.params.id),
  );
  fs.writeFile(`./data.json`, JSON.stringify(newProducts), (err) => {
    if (err) console.log(err);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

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
const router = express.Router(); // this router is a middleware

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

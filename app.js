const express = require("express");
const fs = require("fs");

const app = express();

const products = JSON.parse(fs.readFileSync("./data.json"));

app.get("/api/v1/products", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      products: products,
    },
  });
});

app.get("/api/v1/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id > products.length) {
    res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const product = products.products.find((item) => item.id === id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const port = 3000;
app.listen(3000, () => {
  console.log(`App is running on port ${port}`);
});

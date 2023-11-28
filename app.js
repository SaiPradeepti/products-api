const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

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

  const product = products.find((item) => item.id === id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

app.post("/api/v1/products", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

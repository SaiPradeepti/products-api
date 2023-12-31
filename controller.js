const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./data.json"));

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      products: products,
    },
  });
};

exports.getProduct = (req, res) => {
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

exports.createProduct = (req, res) => {
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

exports.updateProduct = (req, res) => {
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

exports.deleteProduct = (req, res) => {
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

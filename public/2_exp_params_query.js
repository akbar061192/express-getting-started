const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to home page </h1> <a href="/api/products" >products</a> '
  );
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return {
      id,
      name,
      image,
    };
  });
  return res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  const singleProduct = products.find((product) => {
    return product.id === +productId;
  });

  if (!singleProduct) {
    return res.status(404).json({ error: "Product does not exist" });
  }

  return res.status(200).json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let transProducts = [...products];

  if (search) {
    transProducts = transProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    transProducts = transProducts.slice(0, Number(limit));
  }

  return res.status(200).json({ success: true, data: transProducts });
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});

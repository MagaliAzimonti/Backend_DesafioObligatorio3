const ProductManager = require("./ProductManager");
const fs = require("fs");
const express = require("express");
const PORT = 8080;
let app = express();
const path = new ProductManager("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  let limit = req.query.limit;
  let stock = await path.getProducts();
  try {
    if (!limit) {
      stock.length > 0
        ? res.json(stock)
        : res.send({ error: "product not found" });
    } else {
      let stockLimit = [];
      for (let i = 0; i < limit && i < stock.length; i++) {
        stockLimit.push(stock[i]);
      }
      res.send(stockLimit);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  let product = await path.getProductById(req.params.id);
  if (product) {
    res.send({ product });
  } else {
    res.send({ error: "product not found" });
  }
});

let connected_server = app.listen(PORT, () =>
  console.log(`Server on http://localhost:${PORT}`)
);
connected_server.on("error", (error) => console.log(error));

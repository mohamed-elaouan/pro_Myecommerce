const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});
app.get("/products", (req, res) => {
  res.send(products);
});
app.get("/products/:id", (req, res) => {
  const SeulProduct = products.find((item) => {
    return item.id === Number(req.params.id);
  });
  console.log(req.params.id);
  res.send(SeulProduct);
});
const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));

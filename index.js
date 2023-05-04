const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const orders = require("./routes/orders");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");

const products = require("./products");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 8080;

mongoose.connect(uri).then(() => {
  app.listen(port, () => {
    console.log(`App is Running ${port}`);
  })
}).catch((err) => {
  console.log(err);
});

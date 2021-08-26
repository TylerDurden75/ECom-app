import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import UserRouter from "./routers/UserRouter.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/ecom", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.use("/api/users", UserRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

//middleware for error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server start at http://localhost:${port}`);
});

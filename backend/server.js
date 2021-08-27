import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductRouter from "./routers/ProductRouter.js";
import UserRouter from "./routers/UserRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/ecom", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
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

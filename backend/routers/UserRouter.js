import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "./../models/userModel.js";

const UserRouter = express.Router();

UserRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //remove all users
    //await User.remove({})
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default UserRouter;

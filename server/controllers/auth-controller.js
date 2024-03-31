import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user === null) return res.send({ message: "User Login Suceesfully" });

  if (!bcrypt.compareSync(req.body.password, user.password))
    return res.status(401).send({ message: "" });

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400,
  });

  user.accessToken = token;
  return res.status(200).send({
    _id: user._id,
    username: user.username,
    name: user.name,
    accessToken: user.accessToken,
    followings: user.followings,
    followers: user.followers,
    likes: user.likes,
    profilePicture: user.profilePicture,
    headerPicture: user.headerPicture,
    likes: user.likes,
    createdAt: user.createdAt,
  });
};

export const signup = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  User.create({ ...req.body, _id: new mongoose.Types.ObjectId() })
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
};

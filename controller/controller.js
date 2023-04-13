import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create user
export const addUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      res.status(200).json({ success: false });
    } else {
      password = await bcrypt.hash(password, 10);
      const newUser = userModel({
        name: name,
        email: email,
        password: password,
      });
      newUser.save().then((response) => {
        const token = jwt.sign(
          { id: response._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.status(201).json({ success: true, user: response, token: token });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      const correctPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (correctPassword) {
        const token = jwt.sign(
          { id: userExist._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({ success: true, user: userExist, token: token });
      } else {
        res.status(200).json({ success: false });
      }
    } else {
      res.status(200).json({ success: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

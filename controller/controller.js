import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

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
        res.status(201).json({ success: true, user: response });
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
        res.status(200).json({ success: true ,user:userExist});
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

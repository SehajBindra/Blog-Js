import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find({});
      res.status(200).json({ sucess: true, data: users });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      const newUser = await User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
      });
      const user = await newUser.save();
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

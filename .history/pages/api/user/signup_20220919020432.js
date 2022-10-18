import dbConnect from "../../../lib/mongo";

import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  //   if (method === "GET") {
  //     try {
  //       const products = await User.find({});
  //       res.status(200).json({ sucess: true, data: products });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }

  if (method === "POST") {
    try {
      const newUser = await User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const user = await newUser.save();
      res.status(200).json({ sucess: true, data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

import dbConnect from "../../../lib/mongo";

import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "POST") {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        res.status(200).json({ success: true, data: user._doc });
      } else {
        const newUser = await new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        res.status(200).json({ success: true, data: savedUser._doc });
      }

      // res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

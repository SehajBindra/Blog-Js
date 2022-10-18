import dbConnect from "../../../lib/mongo";
import bcrypt from "bcrypt";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "PUT") {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({ success: true, data: updatedUser });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can only update your account");
    }
  }
}

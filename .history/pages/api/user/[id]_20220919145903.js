import dbConnect from "../../../lib/mongo";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import Product from "../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "PUT") {
    if (req.body.userId === id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ success: true, data: updatedUser });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can only update your account");
    }
  }

  if (method === "DELETE") {
    if (req.body.userId === id) {
      try {
        const user = await User.findById(id);

        try {
          await Product.deleteMany({ username: user.username });
          await User.findByIdAndDelete(id);
          res.status(200).json("User has been deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can only update your account");
    }
  }
}

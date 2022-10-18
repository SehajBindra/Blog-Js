import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "POST") {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(400).json("unknown user");

      // checking the encrypted password from mongodb and password entered by user
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("wrong password");

      //   not sending the password back!!

      const { password, ...others } = user._doc;

      res.status(200).json({ success: true, data: others });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

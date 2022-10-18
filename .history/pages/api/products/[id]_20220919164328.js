import { ObjectId } from "mongodb";
import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

// this one is for single Product or Post

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  // if (method === "GET") {
  //   try {
  //     const product = await Product.findById(id);
  //     res.status(200).json({ data: product });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  // if (method === "POST") {
  //   try {
  //     const product = await Product.create(req.body);
  //     res.status(201).json({ success: true, data: product });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

  if (method === "PUT") {
    try {
      const post = await Product.findById(id);

      if (post.username === req.body.username) {
        try {
          const updatedPost = await Product.findByIdAndUpdate(
            id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json({ success: true, data: updatedPost });
        } catch (error) {
          res.status(500).json(err);
        }
      } else {
        res.status(404).json("you can only update your Post");
      }
    } catch (error) {
      res.status(500).json("error");
    }
  }

  // if (method === "DELETE") {
  //   try {
  //     const product = await Product.create(req.body);
  //     res.status(201).json({ success: true, data: product });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
}

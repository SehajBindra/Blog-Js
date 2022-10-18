import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const post = await Product.find({});
      res.status(200).json({ sucess: true, data: post });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    const newPost = await new Product(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(201).json({ success: true, data: savedPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const post = Product.findById(id);

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
      res.status(500).json(err);
    }
  }
}

import Product from "../../../models/Product";

import dbConnect from "../../../util/mongodb";
// this one is for update, delete, get a single Product or Post by id

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json({ data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

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
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      const post = await Product.findById(id);
      if (post.username === req.body.username) {
        try {
          await Product.findByIdAndDelete(id);
          res.status(200).json("your post is deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

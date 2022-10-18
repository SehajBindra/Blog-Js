import Product from "../../../models/Product";

import dbConnect from "../../../util/mongodb";
// this one is for update, delete, get a single Product or Post by id

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "POST") {
    try {
      const saved = await Product.findById(id);
      res.status(201).json({ success: true, data: saved });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //   if (method === "GET") {
  //     try {
  //       const product = await Product.findById(id);
  //       res.status(200).json({ data: product });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }

  //   if (method === "PUT") {
  //     try {
  //       const post = await Product.findById(id);
  //       if (post.username === req.body.username) {
  //         try {
  //           const updatedPost = await Product.findByIdAndUpdate(
  //             id,
  //             {
  //               $set: req.body,
  //             },
  //             { new: true }
  //           );
  //           res.status(200).json(updatedPost);
  //         } catch (err) {
  //           res.status(500).json(err);
  //         }
  //       } else {
  //         res.status(401).json("You can update only your post!");
  //       }
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }

  if (method === "DELETE") {
    try {
      const removed = await Product.findById(id);

      try {
        await Product.findByIdAndDelete(id);
        res.status(200).json("REMOVED FROM SAVE");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

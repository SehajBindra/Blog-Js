import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

// this one is for creating a single post and getting all posts

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();
  // get all posts
  if (method === "GET") {
    try {
      const post = await Product.find({});
      res.status(200).json({ sucess: true, data: post });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // creating a single

  // if (method === "POST") {
  //   try {
  //     const product = await Product.create(req.body);
  //     res.status(201).json({ success: true, data: product });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
  if (method === "POST") {
    const newPost = new Product(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json({ success: true, data: savedPost });
    } catch (err) {
      res.status(500).json("error");
    }
  }

  // if (method === "PUT") {
  //   try {
  //     const post = await Product.findById(id);

  //     if (post.username === req.body.username) {
  //       try {
  //         const updatedPost = await Product.findByIdAndUpdate(
  //           id,
  //           {
  //             $set: req.body,
  //           },
  //           { new: true }
  //         );
  //         res.status(200).json({ success: true, data: updatedPost });
  //       } catch (error) {
  //         res.status(500).json(err);
  //       }
  //     } else {
  //       res.status(404).json("you can only update your Post");
  //     }
  //   } catch (error) {
  //     res.status(500).json(err);
  //   }
  // }
}

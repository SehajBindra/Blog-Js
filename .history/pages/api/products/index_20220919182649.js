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

  // creating a single post
  if (method === "POST") {
    const newPost = await new Product(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(201).json({ success: true, data: savedPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

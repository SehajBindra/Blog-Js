import dbConnect from "../../../util/mongodb";
import Product from "../../../models/Product";

// this one is for creating a single post and getting all posts

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();
  // get all posts
  if (method === "GET") {
    try {
      const post = await Product.find({}).sort({ createdAt: -1 }).limit(20);
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
      res.status(201).json({ success: true, data: savedPost });
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

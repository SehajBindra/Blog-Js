import dbConnect from "../../../util/mongodb";
import Product from "../../../models/Product";
import { connectToDatabase } from "../../../util/mongodb2";
import { Timestamp } from "mongodb";
import { count } from "console";

// this one is for creating a single post and getting all posts

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();
  dbConnect();
  // get all posts
  if (method === "GET") {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    try {
      const post = await db
        .collection("products")
        .find({})
        .skip(skip)
        .sort({ createdAt: -1 })
        .toArray();
      const count = await post.countDocuments();
      res.status(200).json({ success: true, data: post });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // getting single post

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
      const savedPost = await db
        .collection("products")
        .insertOne({ ...req.body, createdAt: new Date() });
      res.status(201).json({ success: true, data: savedPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // if (method === "POST") {
  //   const newPost = new Product(req.body);
  //   try {
  //     const savedPost = await newPost.save();
  //     res.status(201).json({ success: true, data: savedPost });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }

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

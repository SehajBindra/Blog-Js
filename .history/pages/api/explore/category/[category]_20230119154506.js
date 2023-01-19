import dbConnect from "../../../../util/mongodb";
// import NextCors from "nextjs-cors";

import { connectToDatabase } from "../../../../util/mongodb2";

// this one is for creating a single post and getting all posts

export default async function handler(req, res) {
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });
  const {
    method,
    query: { name },
  } = req;

  const { db } = await connectToDatabase();
  dbConnect();
  // get all posts
  if (method === "GET") {
    try {
      const post = await db
        .collection("products")
        .find({
          category: {
            name: { name },
          },
        })
        .sort({ createdAt: -1 })
        .toArray();

      const count = await db.collection("products").count();
      res.status(200).json({ success: true, data: post, count: count });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  dbConnect();

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
  //   if (method === "POST") {
  //     const newPost = new Product(req.body);

  //     try {
  //       const savedPost = await db
  //         .collection("products")
  //         .insertOne({ ...req.body, createdAt: new Date() });
  //       res.status(201).json({ success: true, data: savedPost });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }

  // if (method === "POST") {
  //   const newPost = new Product(req.body);
  //   try {
  //     const savedPost = await newPost.save();
  //     res.status(201).json({ success: true, data: savedPost });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
}

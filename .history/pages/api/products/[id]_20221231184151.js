import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb2";
import dbConnect from "../../../util/mongodb";
// this one is for update, delete, get a single Product or Post by id

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();
  const { db } = await connectToDatabase();
  if (method === "GET") {
    try {
      const product = await db
        .collection("products")
        .findOne({ slug: req.slug });
      // .findOne({ _id: new ObjectId(id) });
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const post = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      if (post.username === req.body.username) {
        try {
          const updatedPost = await db.collection("products").findOneAndUpdate(
            { _id: new ObjectId(id) },
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
      const post = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      if (post.username === req.body.username) {
        try {
          await db
            .collection("products")
            .findOneAndDelete({ _id: new ObjectId(id) });
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

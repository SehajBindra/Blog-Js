import { ObjectId } from "mongodb";
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
      const product = await Product.findById(new ObjectId(query));
      res.status(200).json({ sucess: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ sucess: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ sucess: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ sucess: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

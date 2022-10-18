import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
  }

  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ sucess: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

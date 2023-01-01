import { connectToDatabase } from "../../../util/mongodb2";

export default async function handler(req, res) {
  const {
    method,
    query: { slug },
  } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const product = await db.collection("products").findOne({ slug: slug });
      // .findOne({ _id: new ObjectId(id) });
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

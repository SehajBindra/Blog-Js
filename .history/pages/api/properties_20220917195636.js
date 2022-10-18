import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("movies").find({}).limit(20).toArray();

  res.json({ data });
  console.log(data);
}

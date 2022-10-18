import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const query = req.query.movie_id;

  console.log(query);
  const data = await db.collection("movies").findOne({ _id: query });

  res.json({ data });
  console.log(data);
}

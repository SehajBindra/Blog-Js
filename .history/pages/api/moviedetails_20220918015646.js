import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const query = req.query.movie_id;

  console.log(query);
  const data = await db.collection("movies").findOne(
    { _id: new ObjectId(query) },
    {
      title: 1,
      poster: 1,
      fullplot: 1,
      directors: 1,
    }
  );

  res.json({ data });
  console.log(data);
}

import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const query = req.query.movie_id;

  console.log(query);
  const data = await db
    .collection("movies")
    .find({ year: 2014, "imdb.rating": { $gt: 7.5 }, languages: "English" })
    .limit(40)
    .toArray();
  res.json({ data });
  console.log(data);
}

// import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  //   const { db } = await connectToDatabase();

  //   const movies = await db
  //     .collection("movies")
  //     .find({})
  //     .sort({ metacritic: -1 })
  //     .limit(20)
  //     .toArray();

  res.json({ hello: `world` });
}

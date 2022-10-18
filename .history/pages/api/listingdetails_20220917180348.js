import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const params = params.id;

  const data = await db.collection("listingsAndReviews").findOne(
    {
      _id: params,
    },
    {
      projection: {
        name: 1,
        images: 1,
        description: 1,
      },
    }
  );

  res.json({ data });
  console.log(data);
}

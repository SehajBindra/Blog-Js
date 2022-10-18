import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { db } = await dbConnect();

  const data = await db
    .collection("listingsAndReviews")
    .find({})
    .limit(20)
    .toArray();

  res.json({ data });
}

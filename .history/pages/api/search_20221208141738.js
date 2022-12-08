import Product from "../../models/Product";
import { connectToDatabase } from "../../util/mongodb2";

// this one is for implementing Searching!

export default async function handler(req, res) {
  const {
    method,
    query: { query },
  } = req;

  const errorMessage = "Error has occuredd there is typo error";

  // implementing aggregation pipeline

  try {
    if (method !== "GET") return res.status(400).json({ errorMessage });

    const { db } = await connectToDatabase();

    const agg = [
      {
        $search: {
          query,
          path: "title",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 1,
            maxExpansions: 256,
          },
        },
      },

      {
        $limit: 8,
      },

      {
        $project: {
          _id: 1,
          title: 1,
        },
      },
    ];
    const search = await db.collection("products").aggregate(agg);
    return res.send(search);
  } catch (err) {
    res.status(500).json(errorMessage);
  }
}

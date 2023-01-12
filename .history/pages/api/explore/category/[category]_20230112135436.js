import { connectToDatabase } from "../../../../util/mongodb2";
import NextCors from "nextjs-cors";
export default async function handler(req, res) {
  //   await NextCors(req, res, {
  //     // Options
  //     methods: ["GET"],
  //     origin: "*",
  //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //   });
  const {
    method,
    query: {},
  } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const category = await db.collection("products").find({
        category: {
          $in: [
            { name: "Technology" },
            { name: "Programing" },
            { name: "React js" },
          ],
        },
      });
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

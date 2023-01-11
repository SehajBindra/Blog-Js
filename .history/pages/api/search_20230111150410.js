import Product from "../../models/Product";
import { connectToDatabase } from "../../util/mongodb2";
import NextCors from "nextjs-cors";
// this one is for implementing Searching!

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const {
    method,
    query: { query },
  } = req;

  const errorMessage = "Error has occured";

  try {
    if (method !== "GET") return res.status(400).json({ errorMessage });

    await connectToDatabase();

    const agg = [
      {
        $search: {
          autocomplete: {
            query,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 1,
              maxExpansions: 256,
            },
          },
        },
      },
      {
        $limit: 8,
      },
      {
        $project: {
          desc: 0,
          createdAt: 0,
          updatedAt: 0,

          img: 0,
        },
      },
    ];

    const blogs = await Product.aggregate(agg);

    return res.send(blogs);
  } catch (_) {
    return res.status(400).send({ errorMessage });
  }
};

export default handler;

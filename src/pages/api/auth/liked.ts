import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    const db = client.db("users-auth");
    const { id } = req.query;

    const { quotes, likes } = req.body;
    console.log(quotes);
    const idString = id?.toString().trim();

    const post = await db.collection("users").updateOne(
      { _id: new ObjectId(idString) },
      {
        $set: {
          likes: [...likes, quotes],
        },
      }
    );
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something broke :(",
    });
  }
}

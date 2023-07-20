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

    const { quotes, myquotes } = req.body;

    const idString = id?.toString().trim();
    if (quotes !== null) {
      const post = await db.collection("users").updateOne(
        { _id: new ObjectId(idString) },
        {
          $set: {
            myquotes: [...myquotes, quotes],
          },
        }
      );
      res.status(200).json({
        message: "success",
      });
      return;
    } else {
      const post = await db.collection("users").updateOne(
        { _id: new ObjectId(idString) },
        {
          $set: {
            myquotes: [...myquotes],
          },
        }
      );
      res.status(200).json({
        message: "success",
      });
      return;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "something broke :(",
    });
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};
